import React, { Component } from 'react'
import MapContainer from '../containers/MapContainer'
import ShareMapContainer from '../containers/ShareMapContainer'
import { Route } from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <div>
        {this.props.user &&
          <Route component={MapContainer} />
        }
        {!this.props.user &&
          <Route component={ShareMapContainer} />
        }
      </div>
    )
  }
}

export default App;
