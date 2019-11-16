const defaultState = {
  imageUri: null,
  latitude: null,
  longitude: null,
}

const SET_IMAGEDATA = 'SET_IMAGEDATA'
const REMOVE_IMAGEDATA = 'REMOVE_IMAGEDATA'

export const setImageData = (imageData) => {
  return {
    type: SET_IMAGEDATA,
    imageData,
  }
}

export const removeImageData = () => {
  return { type: REMOVE_IMAGEDATA }
}

const imageDataReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_IMAGEDATA:
      return action.imageData
    case REMOVE_IMAGEDATA:
      return defaultState
    default:
      return state
  }
}

export default imageDataReducer
