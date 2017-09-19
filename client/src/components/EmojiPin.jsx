import React, { PureComponent } from 'react'
import { icon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import * as l from '../../../lib'

require('../css/Popup.scss')

export class EmojiPin extends PureComponent {
  constructor(props) {
    super(props)
    this.onDragStart = this.onDragStart.bind(this)
    this.fillInAddress = this.fillInAddress.bind(this)
    this.initializePlaces = this.initializePlaces.bind(this)
  }

  fillInAddress() {
    const location = this.autocomplete.getPlace().geometry.location
    this.props.positionChanged(location)
    this.props.panTo(location)
  }

  componentDidMount() {
    if (this.props.isNew) {
      this.leafletMap.leafletElement.openPopup()
    }
  }

  onDragStart() {
    this.props.onDragStart(this.props.data)
  }

  onDrop(e) {
    this.props.onDrop(
      this.props.data.uid,
      {lat: e.target._latlng.lat, lng: e.target._latlng.lng}
    )
  }

  initializePlaces() {
    this.autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), {types: ['geocode'], componentRestrictions: {country: 'us'}})
    const geolocation = {lat: parseFloat(this.props.data.lat), lng: parseFloat(this.props.data.lng)};
    const circle = new google.maps.Circle({
      center: geolocation,
      radius: 20000
    });
    this.autocomplete.setBounds(circle.getBounds())
    this.autocomplete.setOptions({strictBounds: true})
    this.autocomplete.addListener('place_changed', this.fillInAddress)
  }

  render() {
    const emojiIcon = icon({
      iconUrl: `/images/${this.props.data.name}.png`,
      iconSize: 20
    })
    const position = [parseFloat(this.props.data.lat), parseFloat(this.props.data.lng)]
    const popupPosition = l.getPopupPosition(this.props.popupCoords.x, this.props.popupCoords.y, 320)
    return (
      <Marker
        ref={(el) => { this.leafletMap = el }}
        position={position}
        icon={emojiIcon}
        draggable={true}
        onPopupOpen={() => this.props.selectPin(this.props.data.uid)}
        onPopupClose={this.props.unselect}
        onDragStart={this.onDragStart}
        onDrag={this.props.onDragOver}
        onDragEnd={this.onDrop.bind(this)}>
        <Popup autoPan={false}>
          <div className={'popup-container ' + popupPosition}>
            <div className="address-search">
              Change location:
              <input id='autocomplete' placeholder="Address" onFocus={this.initializePlaces} />
            </div>
            <div
              className="delete-pin"
              onClick={() => {this.props.onDelete(this.props.data.uid)}}>
              delete pin
            </div>
            <div className='arrow' />
          </div>
        </Popup>
      </Marker>
    )
  }
}
