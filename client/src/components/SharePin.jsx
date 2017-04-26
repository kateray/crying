import React, { Component } from 'react'
import { icon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'

class SharePin extends Component {
  render() {
    const emojiIcon = icon({iconUrl: "/images/"+this.props.data.name+".png", iconSize: 19, popupAnchor: [0,-20]});
    const position = [this.props.data.lat, this.props.data.lng];
    const src = "http://maps.googleapis.com/maps/api/streetview?key=AIzaSyAqTbCi1cn63_xyUgVTSZ9yWvkJXjp2jUs&size=500x300&location=" + this.props.data.lat + "," + this.props.data.lng + "&heading=" + this.props.data.heading + "&pitch=" + this.props.data.pitch;
    return (
      <Marker position={position} icon={emojiIcon}>
        <Popup autoPan={false}>
          <div className="share-pin-popup">
            <div className="floating-text">{this.props.data.title}</div>
            <img className="pano-image" src={src} />
            <div className="arrow-down" />
          </div>
        </Popup>
      </Marker>
    );
  }
}

export default SharePin;
