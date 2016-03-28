import { Component } from 'react'
import moment from 'moment'

export default class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  render() {
    let { message } = this.props
    let { user, timestamp } = message
    console.log(timestamp)
    let formattedTime = moment(new Date(timestamp)).format("h:mm a")
    console.log(user.color)
    return (
      <div className="message">
        <div style={{ backgroundColor: user.color }} className="avatar"></div>
        <div className="name-and-text">
          <div className="user">
            { user.username }
            <span className="timestamp">{ formattedTime }</span>
          </div>
          <div className="text">
            { message.text }
          </div>
        </div>
      </div>
    )
  }
}
