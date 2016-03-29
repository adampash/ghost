import { Component } from 'react'

export default class TypingUsers extends Component {
  render() {
    let { users } = this.props
    return (
      <div className="typing-users">
      { !!users.length &&
        users.map((user) => {
          return user.username
        }).join(" and ") +
          (users.length > 1 ? " are " : " is ") + "typing"
      }
      </div>
    )
  }
}
