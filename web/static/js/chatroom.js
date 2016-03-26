import { Component } from 'react'

import '../../../deps/phoenix_html/priv/static/phoenix_html'
import { Socket } from 'phoenix'

export default class Chatroom extends Component {
  constructor(props) {
    super()
    let { room_id } = props
    this.socket = new Socket("/socket",
    {
      logger: (kind, msg, data) => {
        console.log(`${kind}: ${msg}`, data)
      }
    })
    this.socket.connect()
    this.channel = this.socket.channel(`rooms:${room_id}`, {})
    this.channel.join()
    .receive("ok", resp => { console.log("Joined successfully", resp) })
    .receive("error", resp => { console.log("Unable to join", resp) })

    this.channel.on("post_update", this.handlePayload.bind(this))
  }

  handlePayload(payload) {
    console.log(payload)
  }

  render() {
    let { username, id, room_id } = this.props
    console.log(username, id, room_id)
    return (
      <div className="chatroom">
        this is a chatroom
      </div>
    )
  }
}
