import { PRESENCE_DIFF, PRESENCE_SYNC } from '../actions/users'
import { Presence } from 'phoenix'

const initialState = []

let presences = {}


let listBy = (id, {metas: [first, ...rest]}) => {
  return first.user
}

export function users(state = initialState, action) {
  let newState
  switch(action.type) {
    case PRESENCE_SYNC:
      Presence.syncState(presences, action.state)
      newState = Presence.list(presences, listBy)
      return newState
    case PRESENCE_DIFF:
      Presence.syncDiff(presences, action.state)
      newState = Presence.list(presences, listBy)
      return newState
    default:
      return state
  }
}
