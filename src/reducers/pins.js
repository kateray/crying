import * as PinActions from "../actions/PinActions";
import _ from 'lodash'

const pins = (state = {}, action) => {
  switch (action.type) {
    case PinActions.ADD_PIN:
      const newPin = Object.assign({}, action.data, {
        description: "",
      });
      return Object.assign({}, state, {
        [action.id]: newPin,
      });
    case PinActions.UPDATE_PIN:
      const updatedPin = Object.assign({}, state[action.id], action.data);
      return Object.assign({}, state, {
        [action.id]: updatedPin
      });
    case PinActions.DELETE_PIN:
      const newState = _.omit(state, action.id);
      return newState;
    default:
      return state
  }
}

export default pins
