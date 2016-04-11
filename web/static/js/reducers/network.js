import { SET_OFFLINE, SET_ONLINE } from "../actions/network"

export function online(state = true, action) {
  switch (action.type) {
    case SET_ONLINE:
      return true
    case SET_OFFLINE:
      return false
    default:
      return state
  }
}
