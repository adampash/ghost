import { Component } from 'react'
import moment from 'moment'
import Notification  from 'react-web-notification'

export default class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  render() {
    let { message, prevMessage, focused } = this.props
    let { user, timestamp } = message
    let formattedTime = moment(new Date(timestamp)).format("h:mm")
    let hideUser = false
    if (prevMessage && prevMessage.user.id == user.id) {
      hideUser = true
    }
    if (prevMessage && timestamp - prevMessage.timestamp > 300000) {
      hideUser = false
    }
    return (
      <div className={ "message" + (hideUser ? " hide-user" : "") }>
        <div style={{ backgroundColor: (hideUser ? "none" : user.color) }} className="avatar">
          <span className="timestamp">{ formattedTime }</span>
        </div>
        <div className="name-and-text">
          <div className="user">
            <span className="username">{ user.username }</span>
            <span className="timestamp">{ formattedTime }</span>
          </div>
          <div className="text">
            { message.text }
          </div>
        </div>
        <Notification
          ignore={ focused }
          title={ `${user.username}:` }
          timeout={ 3000 }
          onClick={ (e) => window.focus() }
          options={{
            icon: "/images/ghost.png",
            body: message.text,
            tag: "message_notification"
          }}
        />

      </div>
    )
  }
}
