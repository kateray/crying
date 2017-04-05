import { combineReducers } from 'redux'
import pins from './pins'
import app from './app'

const crying = combineReducers({
  pins,
  app
})

export default crying
