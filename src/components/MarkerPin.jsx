import React, { Component } from 'react'
import { divIcon } from 'leaflet'
import { Marker } from 'react-leaflet'

class MarkerPin extends Component {

  render() {
    const icon = divIcon({className: 'emoji-marker', iconSize: 16, html: this.props.data.hex});
    const position = [this.props.data.lat, this.props.data.lng];
    return (
      <Marker position={position} icon={icon}>
      </Marker>
    );
  }
}

export default MarkerPin;
