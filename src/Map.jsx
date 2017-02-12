import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';

class UserMap extends Component {
  render() {
    const position = [40.734583, -73.997263];
    return (
      <Map center={position} zoom={13} onClick={this.props.handleClick}>
        <TileLayer
          url='https://api.mapbox.com/styles/v1/kray/ciz1fyu1f000t2sphzml1bxtd/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3JheSIsImEiOiJjaXoxZmdyZ3gwMDE1MnFvZG9oZmhrMTBsIn0.mvcEq1pLdeOv-xUSGn6sVw'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
    );
  }
}

export default UserMap;
