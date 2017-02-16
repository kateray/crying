import React, { Component } from 'react'
import { divIcon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'

class EmojiPin extends Component {
  componentDidMount() {
    this.leafletMap.leafletElement.openPopup();
  }

  render() {
    const icon = divIcon({className: 'emoji-marker', iconSize: 16, html: this.props.data.hex, popupAnchor: [55,-10]});
    const position = [this.props.data.lat, this.props.data.lng];
    return (
      <Marker ref={(el) => { this.leafletMap = el; }} position={position} icon={icon} draggable='true' onDragEnd={this.props.handleDrop}>
        <Popup>
          <div>
            <div>
              <input type="text" value={this.props.data.title} onChange={this.props.handleTitleChange}/>
            </div>
            <div>
              <input type="text" placeholder="What happened? (optional)" value={this.props.data.description} onChange={this.props.handleDescriptionChange} />
            </div>
          </div>
        </Popup>
      </Marker>
    );
  }
}

export default EmojiPin;
