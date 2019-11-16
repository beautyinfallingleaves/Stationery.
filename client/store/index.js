import { createStore, combineReducers } from 'redux'
import isWriting from './isWriting'

const reducer = combineReducers({
  isWriting,
})

const store = createStore(reducer)

export default store
