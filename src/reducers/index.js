import { combineReducers } from 'redux'

const pin = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PIN':
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

const pins = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PIN':
      return [
        ...state,
        pin(undefined, action)
      ]
    case 'UPDATE_PIN':
      return state.map(m =>
        pin(m, action)
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
    case 'HIDE_MAGNIFIER':
      return Object.assign({}, state, {
        magnifier: null
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

const pinStore = combineReducers({
  pins,
  app
})

export default pinStore
