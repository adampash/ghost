import { combineReducers } from 'redux'
import * as messageReducer from './messages'

const rootReducer = combineReducers({
  ...messageReducer,
})

export default rootReducer
