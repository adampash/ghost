import { Component } from 'react'

export default class TypingUsers extends Component {
  render() {
    let { users } = this.props
    let message
    if (users.length > 2) {
      message = "Several people are typing"
    } else if (users.length) {
      message = users.map((user) => {
                  return user.username
                }).join(" and ") +
                  (users.length > 1 ? " are " : " is ") + "typing"
    }
    return (
      <div className="typing-users">
        { message }
      </div>
    )
  }
}
