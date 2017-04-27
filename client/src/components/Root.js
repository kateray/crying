import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import '../css/App.css'
import AppContainer from '../containers/AppContainer'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route component={AppContainer}/>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
