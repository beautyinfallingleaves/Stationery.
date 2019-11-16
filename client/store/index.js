import { createStore, combineReducers } from 'redux'
import currentSide from './currentSide'
import imageData from './imageData'
import isWriting from './isWriting'

const reducer = combineReducers({
  currentSide,
  imageData,
  isWriting,
})

const store = createStore(reducer)

export default store
