const defaultState = ''

const SET_IMAGEPOSTCARDFRONT = 'SET_IMAGEPOSTCARDFRONT'
const REMOVE_IMAGEPOSTCARDFRONT = 'REMOVE_IMAGEPOSTCARDFRONT'

export const setImagePostcardFront = (imageUri) => {
  return {
    type: SET_IMAGEPOSTCARDFRONT,
    imageUri,
  }
}

export const removeImagePostcardFront = () => {
  return { type: REMOVE_IMAGEPOSTCARDFRONT }
}

const imagePostcardFrontReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_IMAGEPOSTCARDFRONT:
      return action.imageUri
    case REMOVE_IMAGEPOSTCARDFRONT:
      return defaultState
    default:
      return state
  }
}

export default imagePostcardFrontReducer
