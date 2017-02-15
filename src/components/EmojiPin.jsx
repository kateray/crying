import React, { Component } from 'react'
import { divIcon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'

class EmojiPin extends Component {

  render() {
    const icon = divIcon({className: 'emoji-marker', iconSize: 16, html: this.props.data.hex});
    const position = [this.props.data.lat, this.props.data.lng];
    return (
      <Marker ref={(el) => { el.leafletElement.openPopup(); }} position={position} icon={icon} draggable='true' onDragEnd={this.props.handleDrop}>
        <Popup>
          <div>
            <input type="text" value={this.props.data.title} />
            <input type="text" placeholder="What happened? (optional)" value={this.props.data.description} />
          </div>
        </Popup>
      </Marker>
    );
  }
}

export default EmojiPin;
