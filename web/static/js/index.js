// Phoenix' dependencies
import '../css/app.scss'

import React, { Component } from 'react'
import store from 'store'
// import { ContentState, convertToRaw, convertFromRaw } from 'draft-js'
import { render } from 'react-dom'
import App from './app'

window.React = React

class Root extends Component {
  constructor() {
    super()
    this.state = {
      username: store.get('username') || null,
    }
  }

  componentDidMount() {
    this.name.focus()
  }

  saveName(e) {
    e.preventDefault()
    let name = this.name.value
    store.set('username', name)
    this.setState({ username: name })
  }

  forget() {
    store.clear()
    this.setState({ username: null })
  }

  render() {
    let { username } = this.state
    if (username) {
      return (
        <div>
          <App username={ username } />
          <div className="top">
            <div className="forget" onClick={ this.forget.bind(this) }>
              Forget me
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h1>What's your name?</h1>
          <form onSubmit={ this.saveName.bind(this) } >
            <input type="text" ref={ (e) => this.name = e } />
          </form>
        </div>
      )

    }
  }
}

render(<Root />, document.getElementById('root'))
