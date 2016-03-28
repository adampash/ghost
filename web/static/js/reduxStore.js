import { createStore } from 'redux'
import rootReducer from './reducers/index'

let ReduxStore = createStore(rootReducer)

export default ReduxStore
