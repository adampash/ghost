export const NEW_MESSAGE = 'NEW_MESSAGE'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const FORGET_ME = 'FORGET_ME'

export function newMessage(message) {
  return {
    type: NEW_MESSAGE,
    message
  }
}

export function sendMessage(message) {
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
