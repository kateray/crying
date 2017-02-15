import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'

class Magnify extends Component {

  render() {
    const height = 70;
    return (
      <Map className="pink-map" style={{height: height, top: this.props.top-height-5, left: this.props.left}} zoomControl={false} attributionControl={false} opacity={0.5} zoom={15} center={this.props.position}>
        <TileLayer url='https://api.mapbox.com/styles/v1/kray/ciz6s7pe400162sqzis0pnxgz/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3JheSIsImEiOiJjaXoxZmdyZ3gwMDE1MnFvZG9oZmhrMTBsIn0.mvcEq1pLdeOv-xUSGn6sVw' />
      </Map>
    )
  }
}

export default Magnify;
