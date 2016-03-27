import { Component } from 'react'

export default class EmptyRoomMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        This is the message you see in an empty room
      </div>
    )
  }
}
