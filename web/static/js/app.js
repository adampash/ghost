import { Component } from 'react'

import Chatroom from './chatroom'
import '../../../deps/phoenix_html/priv/static/phoenix_html'
import { Socket } from 'phoenix'

export default class App extends Component {
  constructor(props) {
    super()

  }

  render() {
    let { user, room_id, forget } = this.props
    if (room_id) {
      return (
        <Chatroom user={ user } room_id={ room_id } forget={ forget } />
      )
    } else {
      return (
        <div>You need to create a chatroom</div>
      )
    }
  }
}
