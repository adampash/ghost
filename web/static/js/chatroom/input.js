import { Component } from 'react'
// import Editor from 'draft-js-plugins-editor'
// import createLinkifyPlugin from 'draft-js-linkify-plugin'

// import { Editor, EditorState, getDefaultKeyBinding } from 'draft-js'

// const linkifyPlugin = createLinkifyPlugin()
// const plugins = [
//   linkifyPlugin,
// ]

export default class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startedTyping: false,
      lastTyped: null,
      // editorState: EditorState.createEmpty()
    }
  }

  componentDidMount() {
    this.focusInput()
    this.typingCheck = setInterval(this.checkTyping.bind(this), 500)
  }

  checkTyping() {
    let { onTyping } = this.props
    let { startedTyping, lastTyped } = this.state
    let now = Date.now()
    if (startedTyping && now - lastTyped < 2000) {
      onTyping(now)
    }
  }

  // onChange = (editorState) => {
  //   this.setState({
  //     editorState,
  //   })
  // }

  handleChange(e) {
    if (e.key === "Enter") {
      this.setState({ startedTyping: false })
      this.handleSubmit(e)
      return
    }

    let { metaKey, keyCode } = e
    if (metaKey || keyCode < 18) return

    let { startedTyping, lastTyped } = this.state
    if (startedTyping) {
      this.setState({
        lastTyped: Date.now(),
      })
    } else {
      this.setState({
        startedTyping: true,
        lastTyped: Date.now(),
      })
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
