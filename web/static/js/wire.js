import { Socket, Presence } from 'phoenix'
// import DataChannel from './datachannel'
import ReduxStore from './reduxStore'
import { newMessage, userTyping, refresh } from './actions/messages'
import { presenceState, presenceDiff } from './actions/users'

let Wire = {
  connect(room_id, user) {
    this.room_id = room_id
    this.user_id = user.id
    this.socket = new Socket("/socket",
    {
      params: { user }
      // logger: (kind, msg, data) => {
      //   console.log(`${kind}: ${msg}`, data)
      // }
    })
    this.socket.connect()
    this.channel = this.socket.channel(`rooms:${room_id}`, {})

    this.channel.on("new_message", this.handleNewMessage.bind(this))
    this.channel.on("user_typing", this.handleUserTyping.bind(this))
    this.channel.on("presence_state", this.handlePresenceState.bind(this))
    this.channel.on("presence_diff", this.handlePresenceDiff.bind(this))
    this.channel.onError(e => console.log("something went wrong", e))
    this.channel.onClose(e => console.log("channel closed", e))


    this.channel.join()
      .receive("ok", resp => {
        console.log("Joined successfully", resp)
      })
      .receive("error", resp => { console.log("Unable to join", resp) })
  },

  handlePresenceState(state) {
    ReduxStore.dispatch(presenceState(state))
  },

  handlePresenceDiff(state) {
    ReduxStore.dispatch(presenceDiff(state))
  },

  handleNewMessage(payload) {
    let { message } = payload
    if (message.user.id === this.user_id) return
    ReduxStore.dispatch(newMessage(message))
  },

  handleUserTyping(payload) {
    let { user } = payload
    if (user.id === this.user_id) return
    ReduxStore.dispatch(userTyping(user))
  },

  send(message) {
    this.channel.push('message', {
      type: "new_message",
      message
    })
  },

  typing(user) {
    this.channel.push('typing', {
      type: "typing",
      user,
    })
  },

  signal() {
    this.channel.push('signal', {
      type: 'user_here',
      room: this.room_id
    })

  },

  disconnect() {
    this.channel.leave()
    this.socket.disconnect()
  }
}

export default Wire
