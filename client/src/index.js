import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import crying from './reducers'
import AppContainer from './containers/AppContainer'
import { SoonContainer } from './containers/SoonContainer'
import airbrakeJs from 'airbrake-js'

require('./css/index.scss')
require('./css/App.scss')

let el = document.getElementById('root')
let user = JSON.parse(el.dataset.user)
let initialState = {env: el.dataset.env, isSaving: false, user: user, fetchedPins: [], errors: {}, showSaveConfirmation: {}}
let store = createStore(crying, {app: initialState}, applyMiddleware(thunk))

if (initialState.env === 'production') {
  let airbrake = new airbrakeJs({projectId: 142752, projectKey: 'e4601743a59d5134eea5d31682af34ae'})
}

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/soon' component={SoonContainer} />
        <Route path='/(maps)?/:id?' component={AppContainer} />
      </Switch>
    </Router>
  </Provider>,
  el
)
