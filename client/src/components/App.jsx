import React, { PureComponent } from 'react'
import Home from './Home'
import MapContainer from '../containers/MapContainer'
import ShareMap from './ShareMap'
import { Route } from 'react-router-dom'

export class App extends PureComponent {
  componentWillMount() {
    this.props.getPins(this.props.match.params.id)
  }

  render() {
    let showMap
    if (this.props.user && this.props.match.params.id === this.props.user) {
      showMap = MapContainer
    } else {
      showMap = ShareMap
    }
    return (
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/maps/:id" component={showMap}/>
      </div>
    )
  }
}
