const defaultState = false

const TOGGLE_SENDMODALVISIBLE = 'TOGGLE_SENDMODALVISIBLE'

export const toggleSendModalVisible = () => {
  console.log('in action creator')
  return {
    type: TOGGLE_SENDMODALVISIBLE,
  }
}

const sendModalVisibleReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_SENDMODALVISIBLE:
      console.log('Changing from:', state, 'to:', !state)
      return !state
    default:
      return state
  }
}

export default sendModalVisibleReducer
