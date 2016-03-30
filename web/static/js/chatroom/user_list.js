import { Component } from 'react'

export default class UserList extends Component {
  render() {
    let { users } = this.props
    return (
      <div className="user-list">
        <h4>Online</h4>
        { users.map( user => <div className="user">{ user.username }</div>)}
      </div>
    )
  }
}
