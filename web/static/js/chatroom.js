import { Component } from 'react'
import { connect } from 'react-redux'
import { sendMessage, broadcastTyping } from './actions/messages'

// import '../../../deps/phoenix_html/priv/static/phoenix_html'
import Wire from './wire'

import Input from './chatroom/input'
import MessageList from './chatroom/message_list'
import EmptyRoomMessage from './chatroom/empty_room_message'
import TypingUsers from './chatroom/typing_users'

class Chatroom extends Component {
  componentDidMount() {
    let { room_id, user } = this.props
    Wire.connect(room_id, user.id)
  }

  componentDidUpdate() {
    this.room.scrollTop = this.room.scrollHeight
  }

  componentWillUnmount() {
    Wire.disconnect()
  }

  handleSendMessage(message) {
    let { dispatch, user } = this.props
    message.user = user
    message.timestamp = Date.now()
    dispatch(sendMessage(message))
  }

  render() {
    let { user, room_id, messages, dispatch, typing_users } = this.props
    return (
      <div>
        <div className="chatroom" ref={ (el) => this.room = el }>
          <EmptyRoomMessage />
          <MessageList messages={ messages } />
        </div>
        <Input onSend={ this.handleSendMessage.bind(this) }
          onTyping={ (time) => dispatch(broadcastTyping(time, user)) }
        />
        <TypingUsers users={ typing_users } />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let { messages, typing_users } = state
  return {
    messages,
    typing_users,
  }
}

export default connect(mapStateToProps)(Chatroom)
