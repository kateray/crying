import React, { Component } from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet'
import { icon } from 'leaflet'

class Magnify extends Component {

  render() {
    const height = 200;
    const emojiIcon = icon({className: 'emoji-pin', iconUrl: "/images/"+this.props.draggingObject.name+".png", iconSize: 16});
    const position = this.props.data.dragLatLng;
    const top = this.props.data.dragTop - height;
    const left = this.props.data.dragLeft;
    return (
      <div className="magnify-container" style={{height: height, top: top, left: left}}>
        <Map className="magnify-map" style={{height: height}} zoomControl={false} attributionControl={false} opacity={0.5} zoom={16} center={position}>
          <TileLayer url='/images/mapbox/{x}/{y}.png' />
          <Marker position={position} icon={emojiIcon} />
        </Map>
        <div className="arrow-down" />
      </div>
    )
  }
}

export default Magnify;
