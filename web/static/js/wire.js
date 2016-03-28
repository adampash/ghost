import { Socket } from 'phoenix'
import DataChannel from './datachannel'

let Wire = {
  connect: function(room_id, user_id) {
    this.room_id = room_id
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
        DataChannel.init(room_id, user_id, this.channel)
      })
      .receive("error", resp => { console.log("Unable to join", resp) })

    // this.channel.on("post_update", this.handlePayload.bind(this))
    // this.channel.on("pong", this.handlePayload.bind(this))
  },

  signal: function() {
    this.channel.push('signal', {
      type: 'user_here',
      room: this.room_id
    })

  },

  disconnect: function() {
    this.channel.leave()
    this.socket.disconnect()
  }
}

export default Wire
