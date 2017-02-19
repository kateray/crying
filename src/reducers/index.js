import { combineReducers } from 'redux'

const marker = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_MARKER':
      return Object.assign({description: ''}, action.data);
    case 'UPDATE_PIN':
      if (state.id !== action.id) {
        return state
      }
      return Object.assign({}, state, action.data)

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
    case 'UPDATE_PIN':
      return state.map(m =>
        marker(m, action)
      )
    case 'DELETE_PIN':
      const pinId = action.data.id;
      return state.filter(pin => pin.id !== pinId);
    default:
      return state
  }
}

const app = (state = [], action) => {
  switch (action.type) {
    case 'START_DRAG':
      return Object.assign({}, state, {
        dragging: action.object
      })
    case 'DRAG_OVER':
      return Object.assign({}, state, {
        magnifier: action.data
      })
    case 'STOP_DRAG':
      return Object.assign({}, state, {
        dragging: null,
        magnifier: null
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
