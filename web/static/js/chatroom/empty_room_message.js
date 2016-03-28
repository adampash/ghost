import { Component } from 'react'

export default class EmptyRoomMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="welcome-message">
        <h2>Welcome to <span className="ghost">Ghost</span></h2>
        <p>This room, and everything you say in it, is ephemeral.</p>
        <p>
          That means that when you start sending messages, only people who
          are currently in this room will see your messages. Someone who joins
          later will only see this message, followed by any subsequent messages
          you send.
        </p>
        <p>
          Nothing is ever saved to a database, and when you leave, the messages
          leave with you.
        </p>
      </div>
    )
  }
}
