const defaultState = ''

const SET_IMAGEPOSTCARDBACK = 'SET_IMAGEPOSTCARDBACK'
const REMOVE_IMAGEPOSTCARDBACK = 'REMOVE_IMAGEPOSTCARDBACK'

export const setImagePostcardBack = (imageUri) => {
  return {
    type: SET_IMAGEPOSTCARDBACK,
    imageUri,
  }
}

export const removeImagePostcardBack = () => {
  return { type: REMOVE_IMAGEPOSTCARDBACK }
}

const imagePostcardBackReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_IMAGEPOSTCARDBACK:
      return action.imageUri
    case REMOVE_IMAGEPOSTCARDBACK:
      return defaultState
    default:
      return state
  }
}

export default imagePostcardBackReducer
