import * as AppActions from "../actions/AppActions";

const app = (state = {}, action) => {
  switch (action.type) {
    case AppActions.SELECT_PIN:
      return Object.assign({}, state, {
        selected: action.payload
      });
    default:
      return state
  }
}

export default app
