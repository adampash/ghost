import { Component } from 'react'

export default class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let { message } = this.props
    return (
      <div>
        { message.user.username }: { message.text }
      </div>
    )
  }
}
