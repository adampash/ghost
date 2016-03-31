import {
  NEW_MESSAGE,
  SEND_MESSAGE,
  FORGET_ME,
  USER_TYPING,
  REFRESH,
  AWAY_MESSAGE,
  JOIN_MESSAGE,
  LEFT_MESSAGE,
} from '../actions/messages'
import R from 'ramda'

const initialState = []

function messagesWithoutAway(state) {
  return R.filter(
    ((m) => m.id !== "away_message"),
    state
  )
}

let generateJoinedMessage = (users) => {
  return users.map( (user) => {
    return {
      id: Math.random() * 10000000,
      text: `${user.username} is in the room`,
      type: "presence_message",
      style: 'join',
      user: {},
    }
  })
}

let generateLeftMessage = (users) => {
  return users.map( (user) => {
    return {
      id: Math.random() * 10000000,
      text: `${user.username} is no longer in the room`,
      type: "presence_message",
      style: 'left',
      user: {},
    }
  })
}

export function messages(state = initialState, action) {
  let newMessages
  switch (action.type) {
    case NEW_MESSAGE:
      return [ ...state, action.message ]
    case SEND_MESSAGE:
      return messagesWithoutAway([ ...state, action.message ])
    case AWAY_MESSAGE:
      return [ ...state, { id: "away_message", user: {} }]
    case JOIN_MESSAGE:
      newMessages = generateJoinedMessage(action.users)
      return [ ...state, ...newMessages ]
    case LEFT_MESSAGE:
      newMessages = generateLeftMessage(action.users)
      return [ ...state, ...newMessages ]
    case FORGET_ME:
      return []
    default:
      return state
    }
}

function objId(obj) { return obj.id }
function objName(obj) { return obj.username }

function freshUsers(state) {
  return R.sortBy(objName, R.uniqBy(objId, state.filter( (user) => {
    return Date.now() - user.time < 900
  })))
}

export function typing_users(state = [], action) {
  switch (action.type) {
    case USER_TYPING:
      let newState = [action.user, ...state]
      return freshUsers(newState)
    case SEND_MESSAGE:
    case NEW_MESSAGE:
      return state.filter( (user) => user.id != action.message.user.id)
    case REFRESH:
      // console.log("REFRESH", Date.now() - state[0].time, freshUsers(state))
      return freshUsers(state)
    default:
      return state
    }
}
