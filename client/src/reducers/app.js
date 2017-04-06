import * as AppActions from "../actions/AppActions";

const app = (state = {}, action) => {
  switch (action.type) {
    case AppActions.SELECT_PIN:
      return Object.assign({}, state, {
        selected: action.payload
      })
    case AppActions.RECEIVE_PINS:
      return Object.assign({}, state, {
        fetchedPins: action.pins
      });
    default:
      return state
  }
}

export default app
