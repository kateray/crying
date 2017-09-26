import * as types from '../constants/AppActionTypes'

const app = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_ERROR:
      return Object.assign({}, state, {
        isSaving: false,
        errors: {
          ...state.errors,
          ...action.payload
        }
      })
    case types.SELECT_PIN:
      return Object.assign({}, state, {
        selected: action.payload
      })
    case types.REQUEST_SAVE:
      return Object.assign({}, state, {
        isSaving: true,
        lastSave: Date.now()
      });
    case types.IS_FETCHING_PINS:
      return Object.assign({}, state, {
        isFetchingPins: action.payload
      })
    case types.RECEIVE_PINS:
      return Object.assign({}, state, {
        error: null,
        isSaving: false,
        fetchedPins: action.pins
      });
    case types.RECEIVE_USER:
      return Object.assign({}, state, {
        user: action.payload
      });
    default:
      return state
  }
}

export default app
