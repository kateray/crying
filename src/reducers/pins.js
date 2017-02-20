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

export default pins