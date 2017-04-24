import * as AppActions from "../actions/AppActions";

const app = (state = {isSaving: false, user: false}, action) => {
  switch (action.type) {
    case AppActions.SELECT_PIN:
      return Object.assign({}, state, {
        selected: action.payload
      })
    case AppActions.REQUEST_SAVE:
      return Object.assign({}, state, {
        isSaving: true,
        lastSave: Date.now()
      });
    case AppActions.RECEIVE_PINS:
      return Object.assign({}, state, {
        isSaving: false,
        fetchedPins: action.pins
      });
    case AppActions.RECEIVE_USER:
      return Object.assign({}, state, {
        user: action.payload
      });
    default:
      return state
  }
}

export default app
