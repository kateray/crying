import React, { Component } from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet'
import { icon } from 'leaflet'

class Magnify extends Component {

  render() {
    const emojiIcon = icon({className: 'emoji-pin', iconUrl: "/images/"+this.props.data.data.name+".png", iconSize: 16});
    const position = this.props.data.latLng;
    const top = this.props.data.magTop;
    const left = this.props.data.magLeft;
    return (
      <div className="magnify-container pin-map-container" style={{top: top, left: left}}>
        <Map className="magnify-map" zoomControl={false} attributionControl={false} opacity={0.5} zoom={16} center={position}>
          <TileLayer url='/images/mapbox/{x}/{y}.png' />
          <Marker position={position} icon={emojiIcon} />
        </Map>
        <div className="arrow-down" />
      </div>
    )
  }
}

export default Magnify;
