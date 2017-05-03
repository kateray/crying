import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import '../css/App.css'
import Home from './Home'
import AppContainer from '../containers/AppContainer'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/maps/:id" component={AppContainer}/>
      </div>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
