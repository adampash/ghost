import { Component } from 'react'
// import Editor from 'draft-js-plugins-editor'
// import createLinkifyPlugin from 'draft-js-linkify-plugin'

import { Editor, EditorState, getDefaultKeyBinding } from 'draft-js'

// const linkifyPlugin = createLinkifyPlugin()
// const plugins = [
//   linkifyPlugin,
// ]

export default class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty()
    }
  }

  componentDidMount() {
    this.focusInput()
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    })
  }

  handleChange(e) {
    if (e.key === "Enter") {
      this.handleSubmit(e)
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    let { onSend } = this.props
    let { value } = this.input
    if (value === "") return
    this.input.value = ""
    onSend({
      id: Math.random() * 10000000,
      text: value
    })
  }

  focusInput() {
    this.input.focus()
  }

  render() {
    return (
      <div className="input-container">
        <form action="#"
          onClick={ this.focusInput.bind(this) }
          onSubmit={ this.handleSubmit.bind(this) }
        >
        <textarea type="text" ref={ (el) => this.input = el }
          className="input"
          onKeyDown={ this.handleChange.bind(this) }
        />
        </form>
      </div>
    )
  }
}
