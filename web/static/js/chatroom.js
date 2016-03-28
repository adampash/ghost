import { Component } from 'react'
import { connect } from 'react-redux'
import { sendMessage } from './actions/messages'

// import '../../../deps/phoenix_html/priv/static/phoenix_html'
import Wire from './wire'

import Input from './chatroom/input'
import MessageList from './chatroom/message_list'
import EmptyRoomMessage from './chatroom/empty_room_message'

class Chatroom extends Component {
  componentDidMount() {
    let { room_id, id } = this.props
    Wire.connect(room_id, id)
  }

  componentWillUnmount() {
    Wire.disconnect()
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
