import { combineReducers } from 'redux'

const marker = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_MARKER':
      return {
        id: action.id,
        //TODO
        hex: '&#x1f525',
        lat: action.lat,
        lng: action.lng
      }
    case 'MOVE_MARKER':
      if (state.id !== action.id) {
        return state
      }

      return Object.assign({}, state, {
        lat: action.lat,
        lng: action.lng
      })

    default:
      return state
  }
}

const markers = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MARKER':
      return [
        ...state,
        marker(undefined, action)
      ]
    case 'MOVE_MARKER':
      return state.map(m =>
        marker(m, action)
      )
    default:
      return state
  }
}

const markerStore = combineReducers({
  markers
})

export default markerStore
