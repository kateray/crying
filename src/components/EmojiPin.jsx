import React, { Component } from 'react'
import { divIcon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'

class EmojiPin extends Component {
  constructor(props) {
    super(props);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
  }

  componentDidMount() {
    this.leafletMap.leafletElement.openPopup();
  }

  handleDescriptionKey(e) {
    if (e.key === 'Enter') {
      this.leafletMap.leafletElement.closePopup();
    }
  }

  onDragStart() {
    this.props.onDragStart(this.props.data)
  }

  onDragOver(e) {
    const magnifier = {dragLatLng: e.latlng, dragLeft: e.originalEvent.x, dragTop: e.originalEvent.y};
    this.props.onDragOver(magnifier)
  }

  render() {
    const icon = divIcon({className: 'emoji-marker', iconSize: 16, html: this.props.data.hex, popupAnchor: [90,0]});
    const position = [this.props.data.lat, this.props.data.lng];
    return (
      <Marker ref={(el) => { this.leafletMap = el; }} position={position} icon={icon} draggable='true' onDragStart={this.onDragStart} onDrag={this.onDragOver} onDragEnd={this.props.handleDrop}>
        <Popup>
          <div>
            <div>
              <input type="text" value={this.props.data.title} onChange={this.props.handleTitleChange}/>
            </div>
            <div>
              <textarea placeholder="What happened? (optional)" onKeyPress={this.handleDescriptionKey.bind(this)} onChange={this.props.handleDescriptionChange} defaultValue={this.props.data.description}/>
            </div>
          </div>
        </Popup>
      </Marker>
    );
  }
}

export default EmojiPin;
