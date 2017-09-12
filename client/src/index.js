import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import crying from './reducers'
import Root from './components/Root'
require('./css/index.scss')

let el = document.getElementById('root')
let user = JSON.parse(el.dataset.user).uid
let initialState = {env: el.dataset.env, isSaving: false, user: user, error: null, fetchedPins: [], errors: {}}
let store = createStore(crying, {app: initialState}, applyMiddleware(thunk))

render(
  <Root store={store} />,
  el
)
