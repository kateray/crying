import React, { PureComponent } from 'react'
import { icon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'

export class EmojiPin extends PureComponent {
  constructor(props) {
    super(props)
    this.onDragStart = this.onDragStart.bind(this)
    this.select = this.select.bind(this)
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

  select() {
    this.props.selectPin(this.props.data.uid)
  }

  render() {
    const emojiIcon = icon({
      iconUrl: `/images/${this.props.data.name}.png`,
      iconSize: 19,
      popupAnchor: [0,-20]
    })
    const position = [parseFloat(this.props.data.lat), parseFloat(this.props.data.lng)]
    return (
      <Marker
        ref={(el) => { this.leafletMap = el }}
        position={position}
        icon={emojiIcon}
        draggable={true}
        onPopupOpen={this.select}
        onPopupClose={this.props.unselect}
        onDragStart={this.onDragStart}
        onDrag={this.props.onDragOver}
        onDragEnd={this.onDrop.bind(this)}>
        <Popup autoPan={false}>
          <div className="pin-popup">
            <div
              className="delete-pin"
              onClick={() => {this.props.onDelete(this.props.data.uid)}}>
              delete pin
            </div>
            <div className="arrow-down" />
          </div>
        </Popup>
      </Marker>
    )
  }
}
