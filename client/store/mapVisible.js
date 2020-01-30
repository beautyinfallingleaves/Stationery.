const defaultState = true

const TOGGLE_MAPVISIBLE = 'TOGGLE_MAPVISIBLE'

export const toggleMapVisible = () => {
  return {
    type: TOGGLE_MAPVISIBLE,
  }
}

const mapVisibleReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_MAPVISIBLE:
      return !state
    default:
      return state
  }
}

export default mapVisibleReducer
