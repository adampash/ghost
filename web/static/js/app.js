import { Component } from 'react'

import '../../../deps/phoenix_html/priv/static/phoenix_html'
import { Socket } from 'phoenix'

export default class App extends Component {
  constructor(props) {
    super()
    let { username } = props
    console.log(username)
    // this.socket = new Socket("/socket",
    // {
    //   params: {
    //     token: window.userToken
    //   },
    //   logger: (kind, msg, data) => {
    //     console.log(`${kind}: ${msg}`, data)
    //   }
    // })
    // this.socket.connect()
    // this.channel = this.socket.channel("posts:lobby", {})
    // this.channel.join()
    // .receive("ok", resp => { console.log("Joined successfully", resp) })
    // .receive("error", resp => { console.log("Unable to join", resp) })
    //
    // this.channel.on("post_update", this.handlePayload.bind(this))
    //
    // this.userId = Math.floor(1000 * Math.random(10))
  }

  render() {
    let { username } = this.props
    return (
      <div>
      <h1>...</h1>
      </div>
    )
  }
}
