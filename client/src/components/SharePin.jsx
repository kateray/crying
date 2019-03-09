import React, { Component } from 'react'
import { icon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import * as l from '../../../lib'

require('../css/Popup.scss')

class SharePin extends Component {
  constructor(props) {
    super(props)
    this.state = {popupPosition: ''}
  }

  openPopup = (e) => {
    const popupPosition = l.getPopupPosition(e.originalEvent.clientX, e.originalEvent.clientY, 300)
    this.setState({popupPosition: popupPosition})
    this.leafletMap.leafletElement.openPopup()
  }

  closePopup = () => {
    this.leafletMap.leafletElement.closePopup()
  }

  render() {
    const zoom = this.props.data.zoom;
    // lol https://groups.google.com/forum/#!topic/google-maps-js-api-v3/uqKfg0ZBhWc
    const fov = 3.9018*Math.pow(zoom,2) - 42.432*zoom + 123;
    const emojiIcon = icon({iconUrl: "/images/"+this.props.data.name+".png", iconSize: 20});
    const position = [parseFloat(this.props.data.lat), parseFloat(this.props.data.lng)];
    const src = "https://maps.googleapis.com/maps/api/streetview?key=AIzaSyAqTbCi1cn63_xyUgVTSZ9yWvkJXjp2jUssignature=brIm8IzV4mYcS8rnbT7rz2vLg7w=&size=500x300&location=" + this.props.data.lat + "," + this.props.data.lng + "&heading=" + this.props.data.heading + "&pitch=" + this.props.data.pitch + "&fov=" + fov;
    return (
      <Marker ref={(el) => { this.leafletMap = el; }} position={position} icon={emojiIcon} onMouseOver={this.openPopup} onMouseOut={this.closePopup}>
        <Popup autoPan={false}>
          <div className={'popup-container ' + this.state.popupPosition}>
            <div className="floating-text">{this.props.data.title}</div>
            <img className="pano-image" alt="streetview" src={src} />
            <div className='arrow' />
          </div>
        </Popup>
      </Marker>
    );
  }
}

export default SharePin;
