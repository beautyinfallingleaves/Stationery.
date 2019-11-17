const defaultState = {}

const SET_POSTCARDFRONTVIEW = 'SET_POSTCARDFRONTVIEW'

export const setPostcardFrontView = (viewObj) => {
  return {
    type: SET_POSTCARDFRONTVIEW,
    viewObj,
  }
}

const postcardFrontViewReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_POSTCARDFRONTVIEW:
      return action.viewObj
    default:
      return state
  }
}

export default postcardFrontViewReducer
