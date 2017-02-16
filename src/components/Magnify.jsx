import React, { Component } from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet'
import { divIcon } from 'leaflet'

class Magnify extends Component {

  render() {
    const height = 150;
    const icon = divIcon({className: 'emoji-marker', iconSize: 16, html: this.props.draggingObject.hex});
    const position = this.props.data.dragLatLng;
    const top = this.props.data.dragTop - height;
    const left = this.props.data.dragLeft;
    return (
      <Map className="pink-map" style={{height: height, top: top, left: left}} zoomControl={false} attributionControl={false} opacity={0.5} zoom={15} center={position}>
        <TileLayer url='https://api.mapbox.com/styles/v1/kray/ciz6s7pe400162sqzis0pnxgz/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3JheSIsImEiOiJjaXoxZmdyZ3gwMDE1MnFvZG9oZmhrMTBsIn0.mvcEq1pLdeOv-xUSGn6sVw' />
        <Marker position={position} icon={icon} />
      </Map>
    )
  }
}

export default Magnify;
