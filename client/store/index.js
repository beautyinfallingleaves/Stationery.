import { createStore, combineReducers } from 'redux'
import imageData from './imageData'
import isWriting from './isWriting'

const reducer = combineReducers({
  imageData,
  isWriting,
})

const store = createStore(reducer)

export default store
