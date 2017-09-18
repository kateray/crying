import React, { Component } from 'react'
import { icon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'

require('../css/Popup.scss')

class SharePin extends Component {
  constructor(props) {
    super(props);
    this.openPopup = this.openPopup.bind(this)
    this.closePopup = this.closePopup.bind(this)
    this.state = {popupPosition: ''}
  }

  openPopup(e){
    let popupPosition = ''

    const x = e.originalEvent.clientX
    const y = e.originalEvent.clientY
    const popupHeight = 300
    const popupWidth = 500

    // too high
    if (y < popupHeight) {
      popupPosition = popupPosition + 'top '
    }
    // too right
    if ((window.innerWidth - x) < popupWidth/2) {
      popupPosition = popupPosition + 'right'
    }
    // too left
    if (x < popupWidth/2) {
      popupPosition = popupPosition + 'left'
    }
    this.setState({popupPosition: popupPosition})
    this.leafletMap.leafletElement.openPopup()
  }

  closePopup(){
    this.leafletMap.leafletElement.closePopup()
  }

  render() {
    const zoom = this.props.data.zoom;
    // lol https://groups.google.com/forum/#!topic/google-maps-js-api-v3/uqKfg0ZBhWc
    const fov = 3.9018*Math.pow(zoom,2) - 42.432*zoom + 123;
    const emojiIcon = icon({iconUrl: "/images/"+this.props.data.name+".png", iconSize: 20});
    const position = [parseFloat(this.props.data.lat), parseFloat(this.props.data.lng)];
    const src = "http://maps.googleapis.com/maps/api/streetview?key=AIzaSyAqTbCi1cn63_xyUgVTSZ9yWvkJXjp2jUs&size=500x300&location=" + this.props.data.lat + "," + this.props.data.lng + "&heading=" + this.props.data.heading + "&pitch=" + this.props.data.pitch + "&fov=" + fov;
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
