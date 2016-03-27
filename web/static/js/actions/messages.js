export const NEW_MESSAGE = 'NEW_MESSAGE'
export const SEND_MESSAGE = 'SEND_MESSAGE'

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
