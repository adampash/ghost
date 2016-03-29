export const NEW_MESSAGE = 'NEW_MESSAGE'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const FORGET_ME = 'FORGET_ME'
export const USER_TYPING = 'USER_TYPING'
export const REFRESH = 'REFRESH'

import Wire from '../wire'
import ReduxStore from '../reduxStore'

export function refresh(message) {
  return {
    type: REFRESH,
  }
}

export function newMessage(message) {
  return {
    type: NEW_MESSAGE,
    message
  }
}

export function broadcastTyping(time, user) {
  let shortUser = {
    username: user.username,
    id: user.id,
    time
  }
  Wire.typing(shortUser)
  return { type: "blah" }
}

let typingTimeout
export function userTyping(user) {
  clearTimeout(typingTimeout)
  typingTimeout = setTimeout(() => ReduxStore.dispatch(refresh()), 1000)
  return {
    type: USER_TYPING,
    user
  }
}

export function sendMessage(message) {
  Wire.send(message)
  return {
    type: SEND_MESSAGE,
    message
  }
}

export function forgetMe() {
  return {
    type: FORGET_ME,
  }
}
