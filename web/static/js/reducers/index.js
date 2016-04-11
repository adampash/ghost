import { combineReducers } from 'redux'
import * as messageReducer from './messages'
import * as userReducer from './users'
import * as networkReducer from './network'

const rootReducer = combineReducers({
  ...messageReducer,
  ...networkReducer,
  ...userReducer,
})

export default rootReducer
