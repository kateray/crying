import React, { Component } from 'react'
import MapContainer from '../containers/MapContainer'
import ShareMapContainer from '../containers/ShareMapContainer'
import { Route } from 'react-router-dom'

class App extends Component {
  componentWillMount() {
    this.selectMap = this.selectMap.bind(this)
  }

  selectMap(){
    if (this.props.user && this.props.match.params.id === this.props.user) {
      return MapContainer
    } else {
      return ShareMapContainer
    }
  }

  render() {
    return (
      <div>
        <Route path="/maps/:id" component={this.selectMap()}/>
      </div>
    )
  }
}

export default App;
