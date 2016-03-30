import { combineReducers } from 'redux'
import * as messageReducer from './messages'
import * as userReducer from './users'

const rootReducer = combineReducers({
  ...messageReducer,
  ...userReducer,
})

export default rootReducer
