import { Component } from 'react'
import Message from './message'

export default class MessageList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let { messages, focused } = this.props
    return (
      <div>
      { messages.map( (message, i) => {
        return (
          <Message key={ message.id }
            message={ message }
            prevMessage={ messages[i - 1] }
            focused={ focused }
          />
        )
      })}
      </div>
    )
  }
}
