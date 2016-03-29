import { NEW_MESSAGE, SEND_MESSAGE, FORGET_ME, USER_TYPING, REFRESH } from '../actions/messages'

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

function freshUsers(state) {
  return state.filter( (user) => {
    Date.now() - user.time > 2000
  })
}

export function typing_users(state = [], action) {
  switch (action.type) {
    case USER_TYPING:
      return [ ...freshUsers(state), action.user ]
    case REFRESH:
      return freshUsers(state)
    default:
      return freshUsers(state)
    }
}
