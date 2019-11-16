const defaultState = 'front'

const SET_CURRENTSIDE = 'SET_CURRENTSIDE'

export const setCurrentSide = (currentSide) => {
  return {
    type: SET_CURRENTSIDE,
    currentSide,
  }
}

const currentSideReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CURRENTSIDE:
      return action.currentSide
    default:
      return state
  }
}

export default currentSideReducer
