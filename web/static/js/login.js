import { Component } from 'react'

export default class Login extends Component {
  componentDidMount() {
    this.name.focus()
  }

  render() {
    let { saveName } = this.props
    return (
      <div>
        <h1>What's your name?</h1>
          <form onSubmit={ (e) => {
            e.preventDefault()
            saveName(this.name.value)
          }} >
          <input type="text" ref={ (e) => this.name = e } />
        </form>
      </div>
    )
  }
}
