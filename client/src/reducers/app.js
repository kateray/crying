import * as AppActions from "../actions/AppActions";

const app = (state = {isSaving: false, user: false, error: null, fetchedPins: []}, action) => {
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
        error: null,
        isSaving: false,
        fetchedPins: action.pins
      });
    case AppActions.SAVE_PINS_ERROR:
      return Object.assign({}, state, {
        error: action.payload,
        isSaving: false
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
