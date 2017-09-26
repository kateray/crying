import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import crying from './reducers'
import AppContainer from './containers/AppContainer'

require('./css/index.scss')
require('./css/App.scss')

let el = document.getElementById('root')
let user = JSON.parse(el.dataset.user).uid
let initialState = {env: el.dataset.env, isSaving: false, user: user, fetchedPins: [], errors: {}}
let store = createStore(crying, {app: initialState}, applyMiddleware(thunk))

render(
  <Provider store={store}>
    <Router>
      <Route path="/(maps)?/:id?" component={AppContainer}/>
    </Router>
  </Provider>,
  el
)
