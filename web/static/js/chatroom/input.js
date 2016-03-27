import { Component } from 'react'
// import { ContentState, convertToRaw, convertFromRaw } from 'draft-js'

export default class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleSubmit(e) {
    e.preventDefault()
    let { onSend } = this.props
    let { value } = this.input
    this.input.value = ""
    onSend({
      id: Math.random() * 10000000,
      text: value
    })
  }

  render() {
    return (
      <form action="#" onSubmit={ this.handleSubmit.bind(this) }>
        <input type="text" ref={ (el) => this.input = el } />
      </form>
    )
  }
}
