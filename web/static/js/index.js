// Phoenix' dependencies
import '../css/app.scss'

import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import ReduxStore from './reduxStore'
import { forgetMe } from './actions/messages'

import store from 'store'
import uuid from 'node-uuid'

import App from './app'
import Login from './login'

window.React = React
window.console.error = (function() {
  var error = console.error

  return function(exception) {
    if ((exception + '').indexOf('Warning: A component is `contentEditable`') != 0) {
      error.apply(console, arguments)
    }
  }
})()

function generateColor() {
  let colors = ['r', 'g', 'b'].reduce( (acc, color) => {
    acc[color] = Math.floor(Math.random() * 255)
    return acc
  }, {})
  return `rgb(${colors.r},${colors.g},${colors.b})`
}

class Root extends Component {
  constructor() {
    super()
    this.state = {
      user: store.get('user') || null,
    }
  }

  saveName(username) {
    let id = uuid.v4()
    let color = generateColor()
    // store.set('username', username)
    // store.set('id', id)
    // store.set('color', color)
    let user = {
      username,
      id,
      color,
    }
    store.set('user', user)
    this.setState({
      user
    })
  }

  forget() {
    ReduxStore.dispatch(forgetMe())
    store.clear()
    this.setState({ user: null })
  }

  render() {
    let { user } = this.state
    if (user) {
      return (
        <div>
          <App user={ user } room_id={ room_id } />
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

render(
  <Provider store={ ReduxStore }>
    <Root />
  </Provider>,
  document.getElementById('root'))
