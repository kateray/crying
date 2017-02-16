import React, { Component } from 'react'
import { divIcon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'

class EmojiPin extends Component {
  componentDidMount() {
    this.leafletMap.leafletElement.openPopup();
  }

  render() {
    const icon = divIcon({className: 'emoji-marker', iconSize: 16, html: this.props.data.hex, popupAnchor: [90,0]});
    const position = [this.props.data.lat, this.props.data.lng];
    return (
      <Marker ref={(el) => { this.leafletMap = el; }} position={position} icon={icon} draggable='true' onDragStart={this.props.handleDragStart} onDrag={this.props.handleDragOver} onDragEnd={this.props.handleDrop}>
        <Popup>
          <div>
            <div>
              <input type="text" value={this.props.data.title} onChange={this.props.handleTitleChange}/>
            </div>
            <div>
              <textarea placeholder="What happened? (optional)" onChange={this.props.handleDescriptionChange}>{this.props.data.description}</textarea>
            </div>
          </div>
        </Popup>
      </Marker>
    );
  }
}

export default EmojiPin;
