// Phoenix' dependencies
import '../css/app.scss'

import React, { Component } from 'react'
import store from 'store'
import Guid from 'guid'
// import { ContentState, convertToRaw, convertFromRaw } from 'draft-js'
import { render } from 'react-dom'
import App from './app'
import Login from './login'

window.React = React

class Root extends Component {
  constructor() {
    super()
    this.state = {
      username: store.get('username') || null,
      id: store.get('id') || null,
    }
  }

  saveName(username) {
    let id = Guid.create().value
    store.set('username', username)
    store.set('id', id)
    this.setState({ username, id, room_id })
  }

  forget() {
    store.clear()
    this.setState({ username: null, id: null })
  }

  render() {
    let { username, id } = this.state
    if (username) {
      return (
        <div>
          <App username={ username } id={ id } room_id={ room_id } />
          <div className="top">
            <div className="forget" onClick={ this.forget.bind(this) }>
              Forget me
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <Login saveName={ this.saveName.bind(this) }/>
      )

    }
  }
}

render(<Root />, document.getElementById('root'))
