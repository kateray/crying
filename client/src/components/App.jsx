import React, { Component } from 'react'
import Home from './Home'
import MapContainer from '../containers/MapContainer'
import ShareMapContainer from '../containers/ShareMapContainer'
import { Route } from 'react-router-dom'

class App extends Component {
  componentWillMount() {
    this.props.getUser()
    this.selectMap = this.selectMap.bind(this)
  }

  selectMap(){
    if (this.props.user) {
      return MapContainer
    } else {
      return ShareMapContainer
    }
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/maps/:id" component={this.selectMap()}/>
      </div>
    )
  }
}

export default App;
