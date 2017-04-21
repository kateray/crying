import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import crying from './reducers'
import Root from './components/Root'
import './css/index.css'

let store = createStore(crying, applyMiddleware(thunk))

render(
  <Root store={store} />,
  document.getElementById('root')
)
