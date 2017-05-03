import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import crying from './reducers'
import Root from './components/Root'
import './css/index.css'

let el = document.getElementById('root')
let path = el.dataset.env === 'development' ? "http://localhost:3001/" : "/";
let user = el.dataset.user;
let initialState = {env: el.dataset.env, path: path, isSaving: false, user: user, error: null, fetchedPins: []}
let store = createStore(crying, {app: initialState}, applyMiddleware(thunk))

render(
  <Root store={store} />,
  el
)
