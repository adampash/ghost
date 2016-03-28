import { Component } from 'react'

import Chatroom from './chatroom'
import '../../../deps/phoenix_html/priv/static/phoenix_html'
import { Socket } from 'phoenix'

export default class App extends Component {
  constructor(props) {
    super()

  }

  render() {
    let { username, id, room_id } = this.props
    if (room_id) {
      return (
        <div>
          <Chatroom username={ username } room_id={ room_id } id={ id } />
        </div>
      )
    } else {
      return (
        <div>You need to create a chatroom</div>
      )
    }
  }
}
