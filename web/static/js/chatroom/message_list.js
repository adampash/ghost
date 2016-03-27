import { Component } from 'react'
import Message from './message'

export default class MessageList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let { messages } = this.props
    return (
      <div>
      { messages.map( (message) => {
        return <Message key={ message.id } message={ message } />
      })}
      </div>
    )
  }
}
