import { Component } from 'react'

export default class EmptyRoomMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="welcome-message">
        <h2>You're in a private <span className="ghost">Ghost</span> channel</h2>
        <p>This room, and everything you say in it, is ephemeral.</p>
        <p>
          That means that when you start sending messages, only people who
          are currently in this room will see your messages.
        </p>
        <p>
          Someone who joins later will only see messages you send after they join.
        </p>
        <p>
          Nothing is ever saved to a database, and when you leave this room—or even
          refresh your browser—you won't be able to see any previous messages.
        </p>
      </div>
    )
  }
}
