import { combineReducers } from 'redux'

const marker = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_MARKER':
      return {
        id: action.id,
        hex: action.hex,
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

const app = (state = [], action) => {
  switch (action.type) {
    case 'START_DRAG':
      return Object.assign({}, state, {
        dragging: action.hex
      })
    case 'STOP_DRAG':
      return Object.assign({}, state, {
        dragging: null
      })
    default:
      return state
  }
}

const markerStore = combineReducers({
  markers,
  app
})

export default markerStore
