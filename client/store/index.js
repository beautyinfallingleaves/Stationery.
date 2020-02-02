import { createStore, combineReducers } from 'redux'
import currentSide from './currentSide'
import imageData from './imageData'
import imagePostcardFront from './imagePostcardFront'
import imagePostcardBack from './imagePostcardBack'
import isWriting from './isWriting'
import postcardFrontView from './postcardFrontView'
import postcardBackView from './postcardBackView'
import sendModalVisible from './sendModalVisible'
import mapVisible from './mapVisible'
import takingPhoto from './takingPhoto'

const reducer = combineReducers({
  currentSide,
  imagePostcardFront,
  imagePostcardBack,
  imageData,
  isWriting,
  postcardFrontView,
  postcardBackView,
  sendModalVisible,
  mapVisible,
  takingPhoto,
})

const store = createStore(reducer)

export default store
