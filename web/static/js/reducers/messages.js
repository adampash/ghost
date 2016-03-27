import { NEW_MESSAGE, SEND_MESSAGE } from '../actions/messages'

const initialState = [
  { text: "HI", id: Math.random() * 1000000 }
]

export function messages(state = initialState, action) {
  switch (action.type) {
    case NEW_MESSAGE:
      return [ ...state, action.message ]
    case SEND_MESSAGE:
      return [ ...state, action.message ]
    default:
      return state
    }
}
