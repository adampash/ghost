import { Component } from 'react'
import { connect } from 'react-redux'
import { sendMessage } from './actions/messages'

import '../../../deps/phoenix_html/priv/static/phoenix_html'
import { Socket } from 'phoenix'

import Input from './chatroom/input'
import MessageList from './chatroom/message_list'
import EmptyRoomMessage from './chatroom/empty_room_message'

class Chatroom extends Component {
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
    this.channel.on("pong", this.handlePayload.bind(this))
  }

  componentDidMount() {
    this.ping = setInterval(() => {
      this.channel.push("ping", { message: "HI" })
    }, 10000)
  }

  componentWillUnmount() {
    clearInterval(this.ping)
    this.channel.leave()
    this.socket.disconnect()
  }

  handlePayload(payload) {
    console.log(payload)
  }

  handleSendMessage(message) {
    let { dispatch, username, id } = this.props
    message.user = { username, id }
    dispatch(sendMessage(message))
  }

  render() {
    let { username, id, room_id, messages } = this.props
    console.log(username, id, room_id)
    return (
      <div className="chatroom">
        <EmptyRoomMessage />
        <MessageList messages={ messages } />
        <Input onSend={ this.handleSendMessage.bind(this) }/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let { messages } = state
  return {
    messages
  }
}

export default connect(mapStateToProps)(Chatroom)
