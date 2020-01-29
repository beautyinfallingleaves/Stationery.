const defaultState = false

const TOGGLE_SENDMODALVISIBLE = 'TOGGLE_SENDMODALVISIBLE'

export const toggleSendModalVisible = () => {
  return {
    type: TOGGLE_SENDMODALVISIBLE,
  }
}

const sendModalVisibleReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_SENDMODALVISIBLE:
      return !state
    default:
      return state
  }
}

export default sendModalVisibleReducer
