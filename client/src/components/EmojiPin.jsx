import React, { PureComponent } from 'react'
import { icon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import * as l from '../../../lib'

require('../css/Popup.scss')

export class EmojiPin extends PureComponent {
  constructor(props) {
    super(props)
    this.onDragStart = this.onDragStart.bind(this)
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
