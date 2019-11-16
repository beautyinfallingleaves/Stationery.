const defaultState = false

const TOGGLE_ISWRITING = 'TOGGLE_ISWRITING'

export const toggleIsWriting = () => {
  return {
    type: TOGGLE_ISWRITING,
  }
}

const isWritingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_ISWRITING:
      return !state
    default:
      return state
  }
}

export default isWritingReducer
