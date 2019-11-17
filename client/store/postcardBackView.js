const defaultState = {}

const SET_POSTCARDBACKVIEW = 'SET_POSTCARDBACKVIEW'

export const setPostcardBackView = (viewObj) => {
  return {
    type: SET_POSTCARDBACKVIEW,
    viewObj,
  }
}

const postcardBackViewReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_POSTCARDBACKVIEW:
      return action.viewObj
    default:
      return state
  }
}

export default postcardBackViewReducer
