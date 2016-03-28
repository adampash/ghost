import { Socket } from 'phoenix'
// import DataChannel from './datachannel'
import ReduxStore from './reduxStore'
import { newMessage } from './actions/messages'

let Wire = {
  connect(room_id, user_id) {
    this.room_id = room_id
    this.user_id = user_id
    this.socket = new Socket("/socket",
    {
      // logger: (kind, msg, data) => {
      //   console.log(`${kind}: ${msg}`, data)
      // }
    })
    this.socket.connect()
    this.channel = this.socket.channel(`rooms:${room_id}`, {})
    this.channel.join()
      .receive("ok", resp => {
        console.log("Joined successfully", resp)
        // Peers.init(room_id, this.channel)
        // DataChannel.init(room_id, user_id, this.channel)
      })
      .receive("error", resp => { console.log("Unable to join", resp) })

    this.channel.on("new_message", this.handleNewMessage.bind(this))
  },

  handleNewMessage(payload) {
    let { message } = payload
    if (message.user.id === this.user_id) return
    ReduxStore.dispatch(newMessage(message))
  },

  send(message) {
    this.channel.push('message', {
      type: "new_message",
      message
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
