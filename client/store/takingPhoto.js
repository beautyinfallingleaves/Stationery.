const defaultState = false

const TOGGLE_TAKINGPHOTO = 'TOGGLE_TAKINGPHOTO'

export const toggleTakingPhoto = () => {
  return {
    type: TOGGLE_TAKINGPHOTO,
  }
}

const takingPhotoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_TAKINGPHOTO:
      return !state
    default:
      return state
  }
}

export default takingPhotoReducer
