export const SET_ONLINE = 'SET_ONLINE'
export const SET_OFFLINE = 'SET_OFFLINE'

export function offline() {
  return {
    type: SET_OFFLINE,
  }
}

export function online() {
  return {
    type: SET_ONLINE,
  }
}
