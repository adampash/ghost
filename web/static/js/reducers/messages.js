import { NEW_MESSAGE, SEND_MESSAGE, FORGET_ME } from '../actions/messages'

const initialState = []

export function messages(state = initialState, action) {
  switch (action.type) {
    case NEW_MESSAGE:
      return [ ...state, action.message ]
    case SEND_MESSAGE:
      return [ ...state, action.message ]
    case FORGET_ME:
      return []
    default:
      return state
    }
}
