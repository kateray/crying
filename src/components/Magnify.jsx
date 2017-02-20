import React, { Component } from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet'
import { icon } from 'leaflet'

class Magnify extends Component {

  render() {
    const height = 150;
    const emojiIcon = icon({className: 'emoji-pin', iconUrl: "/images/"+this.props.draggingObject.name+".png", iconSize: 16});
    const position = this.props.data.dragLatLng;
    const top = this.props.data.dragTop - height;
    const left = this.props.data.dragLeft;
    return (
      <Map className="mini-map" style={{height: height, top: top, left: left}} zoomControl={false} attributionControl={false} opacity={0.5} zoom={15} center={position}>
        <TileLayer url='https://api.mapbox.com/styles/v1/kray/cizcz53tq00bh2spmmkpwoqj6/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3JheSIsImEiOiJjaXoxZmdyZ3gwMDE1MnFvZG9oZmhrMTBsIn0.mvcEq1pLdeOv-xUSGn6sVw' />
        <Marker position={position} icon={emojiIcon} />
      </Map>
    )
  }
}

export default Magnify;
