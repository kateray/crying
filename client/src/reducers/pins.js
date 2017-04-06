import * as PinActions from "../actions/PinActions";
import _ from 'lodash'

const pins = (state = {items: []}, action) => {
  switch (action.type) {
    case PinActions.ADD_PIN:
      console.log('are we here or something?')
      const newPin = Object.assign({}, action.data, {
        uid: Date.now().toString(),
        heading: 34,
        pitch: 10,
        zoom: 1
      })
      return Object.assign({}, state, {
        items: [
          ...state.items,
          newPin
        ]
      });
    case PinActions.UPDATE_PIN:
      console.log('no we must be here')
      return Object.assign({}, state, {
        items: state.items.map((item) => {
          if (item.uid === action.uid) {
            return Object.assign({}, item, action.data)
          }
          return item
        })
      });
    case PinActions.DELETE_PIN:
      console.log(action)
      const newItems = _.omit(state.items, _.find(state.items, ['uid', action.uid]))
      return Object.assign({}, state, {
        items: state.items.filter((item) => item.uid !== action.uid)
      });
    default:
      return state
  }
}

export default pins
