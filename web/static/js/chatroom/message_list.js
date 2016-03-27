import { Component } from 'react'

export default class MessageList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let { messages } = this.props
    return (
      <div>
        Messages go here
      </div>
    )
  }
}
