import React, { PureComponent } from 'react'
import MapContainer from '../containers/MapContainer'
import { ShareMap } from './ShareMap'
import { Route } from 'react-router-dom'

export class App extends PureComponent {
  componentWillMount() {
    this.props.getPins(this.props.match.params.id)
  }

  render() {
    let showMap
    if (this.props.user && this.props.match.params.id === this.props.user.uid) {
      showMap = <MapContainer match={this.props.match} fetchedPins={this.props.fetchedPins} />
    } else {
      showMap = <ShareMap match={this.props.match} fetchedPins={this.props.fetchedPins} />
    }
    return (
      <div>
        {showMap}
      </div>
    )
  }
}
