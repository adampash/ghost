// import SimpleMultiPeer from 'simple-multi-peer'
//
// let Peers = {
//   init(room_id, channel) {
//     this.peers = new SimpleMultiPeer({
//      channel: channel, // Your signaller URL.
//      room: room_id,                // Which 'room' you'll be using to communicate with your peers
//                                     // (all peers in the same room will be signalled to each other).
//      callbacks: {                   // Connection related callbacks
//        connect: function() { console.log("CONNECTED PEER THING")},      // -> 2 peers are connected
//        close: function() {},        // -> a connection is closed
//        data: function() { console.log("PEER DATA")},         // -> any data is received
//      }
//     })
//   },
//
//   send(message) {
//     // Send data over a dataChannel to all peers
//     this.peers.send("I'm alive!!!")
//   }
//
// }
//
// export default Peers

import 'webrtc-adapter'

const config = {
  iceServers: [
    { url: "stun:stun.l.google.com:19302" },
    { url: "stun:stun1.l.google.com:19302" },
    { url: "stun:stun2.l.google.com:19302" },
    { url: "stun:stun3.l.google.com:19302" },
    { url: "stun:stun4.l.google.com:19302" },
    { url: "stun:stun.ekiga.net" },
    { url: "stun:stun.ideasip.com" },
    { url: "stun:stun.rixtelecom.se" },
    { url: "stun:stun.schlund.de" },
    { url: "stun:stun.stunprotocol.org:3478" },
    { url: "stun:stun.voiparound.com" },
    { url: "stun:stun.voipbuster.com" },
    { url: "stun:stun.voipstunt.com" },
    { url: "stun:stun.voxgratia.org" },
  ]
}

let rtcPeerConn
let dataChannelOptions = {
  ordered: true, //no guaranteed delivery, unreliable but faster
  maxRetransmitTime: 1000, //milliseconds
}
let dataChannel

let DataChannel = {
  init(room_id, user_id, channel) {
    this.room_id = room_id
    this.user_id = user_id
    this.channel = channel

    //Send a first signaling message to anyone listening
    //In other apps this would be on a button click, we are just doing it on page load
    this.channel.push('signal',{"type":"user_here", user_id: this.user_id, "room":this.room_id})

    this.channel.on('signaling_message', this.handleSignalingMessage.bind(this))
  },

  handleSignalingMessage(data) {
    this.displaySignalMessage("Signal received: " + data.type)
    if (this.user_id === data.user_id) {
      console.log("SAME USER!!!")
      return
    }
    //Setup the RTC Peer Connection object
    if (!rtcPeerConn)
      this.startSignaling()

    if (data.type != "user_here") {
      let message = JSON.parse(data.message)
      if (message.sdp) {
        // if (rtcPeerConn.remoteDescription.)
        rtcPeerConn.setRemoteDescription(new RTCSessionDescription(message.sdp),
          this.handleOffer.bind(this), this.logError.bind(this)
        )
      }
      else {
        rtcPeerConn.addIceCandidate(new RTCIceCandidate(message.candidate))
      }
    }
  },

  handleOffer() {
    if (rtcPeerConn.remoteDescription.type == 'offer') {
      debugger
      rtcPeerConn.createAnswer(this.sendLocalDesc.bind(this), this.logError.bind(this))
    }
  },

  startSignaling() {
    this.displaySignalMessage("starting signaling...")
    rtcPeerConn = new RTCPeerConnection(config, null)
    dataChannel = rtcPeerConn.createDataChannel('chat', dataChannelOptions)

    dataChannel.onopen = this.dataChannelStateChanged
    rtcPeerConn.ondatachannel = this.receiveDataChannel

    // send any ice candidates to the other peer
    rtcPeerConn.onicecandidate = (evt) => {
      if (evt.candidate)
        this.channel.push('signal',
          {
            "type":"ice candidate",
            "message": JSON.stringify({ 'candidate': evt.candidate }),
            "room":this.room_id,
            user_id: this.user_id,
          }
        )
      this.displaySignalMessage("completed that ice candidate...")
    }

    // let the 'negotiationneeded' event trigger offer generation
    rtcPeerConn.onnegotiationneeded = () => {
      this.displaySignalMessage("on negotiation called")
      rtcPeerConn.createOffer(this.sendLocalDesc.bind(this), this.logError.bind(this))
    }
  },

  sendLocalDesc(desc) {
    rtcPeerConn.setLocalDescription(desc)
    // rtcPeerConn.setLocalDescription(desc, () => {
    //   this.displaySignalMessage("sending local description")
    //   this.channel.push('signal',
    //     {
    //       "type":"SDP",
    //       "message": JSON.stringify({ 'sdp': rtcPeerConn.localDescription }),
    //       "room":this.room_id,
    //       user_id: this.user_id,
    //     }
    //   )
    // }, this.logError.bind(this))
  },

  //Data Channel Specific methods
  dataChannelStateChanged() {
    if (dataChannel.readyState === 'open') {
      this.displaySignalMessage("Data Channel open")
      dataChannel.onmessage = receiveDataChannelMessage
    }
  },

  receiveDataChannel(event) {
    debugger
    this.displaySignalMessage("Receiving a data channel")
    dataChannel = event.channel
    dataChannel.onmessage = receiveDataChannelMessage
  },

  receiveDataChannelMessage(event) {
    this.displayMessage("From DataChannel: " + event.data)

    if (event.data.split(" ")[0] == "memoryFlipTile") {
      let tileToFlip = event.data.split(" ")[1]
      this.displayMessage("Flipping tile " + tileToFlip)
      let tile = document.querySelector("#" + tileToFlip)
      let index = tileToFlip.split("_")[1]
      let tile_value = memory_array[index]
      flipTheTile(tile,tile_value)
    } else if (event.data.split(" ")[0] == "newBoard") {
      this.displayMessage("Setting up new board")
      memory_array = event.data.split(" ")[1].split(",")
      newBoard()
    }

  },

  //Logging/Display Methods
  logError(error) {
    this.displaySignalMessage("ERROR:", error.name + ': ' + error.message)
  },

  displayMessage(message) {
    console.log("MESSAGE:", message)
  },

  displaySignalMessage(message) {
    console.log("SIGNALING MESSAGE:", message)
  },
}

export default DataChannel
window.DataChannel = DataChannel
