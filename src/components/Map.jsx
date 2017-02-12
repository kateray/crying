import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import MoveMarker from '../containers/MoveMarker'

class UserMap extends Component {

  render() {
    const markers = this.props.markers.map((m) =>
      <MoveMarker key={m.id} data={m} />
    );
    const position = [40.734583, -73.997263];
    return (
      <Map center={position} zoom={13} scrollWheelZoom={false} onClick={this.props.handleClick}>
        <TileLayer
          url='https://api.mapbox.com/styles/v1/kray/ciz1fyu1f000t2sphzml1bxtd/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3JheSIsImEiOiJjaXoxZmdyZ3gwMDE1MnFvZG9oZmhrMTBsIn0.mvcEq1pLdeOv-xUSGn6sVw'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers}
      </Map>
    );
  }
}

export default UserMap;
