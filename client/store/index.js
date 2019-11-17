import { createStore, combineReducers } from 'redux'
import currentSide from './currentSide'
import imageData from './imageData'
import imagePostcardFront from './imagePostcardFront'
import imagePostcardBack from './imagePostcardBack'
import isWriting from './isWriting'
import postcardFrontView from './postcardFrontView'
import postcardBackView from './postcardBackView'

const reducer = combineReducers({
  currentSide,
  imagePostcardFront,
  imagePostcardBack,
  imageData,
  isWriting,
  postcardFrontView,
  postcardBackView,
})

const store = createStore(reducer)

export default store
