const defaultState = {
  imageUri: null,
  latitude: null,
  longitude: null,
}

const SET_IMAGEDATA = 'SET_IMAGEDATA'

export const setImageData = (imageData) => {
  return {
    type: SET_IMAGEDATA,
    imageData,
  }
}

const imageDataReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_IMAGEDATA:
      return action.imageData
    default:
      return state
  }
}

export default imageDataReducer
