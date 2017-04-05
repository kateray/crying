import React, { Component } from 'react';
import '../css/App.css';
import HeaderContainer from '../containers/HeaderContainer';
import MapContainer from '../containers/MapContainer';

class App extends Component {

  render() {
    return (
      <div>
        <HeaderContainer />
        <MapContainer />
      </div>
    );
  }
}

export default App;
