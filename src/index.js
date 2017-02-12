import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import markerStore from './reducers'
import App from './components/App'
import './css/index.css'

let store = createStore(markerStore)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
