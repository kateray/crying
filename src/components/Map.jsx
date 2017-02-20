import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import EmojiPinContainer from '../containers/EmojiPinContainer'
import EmojiTool from './EmojiTool'
import Magnify from './Magnify'


class UserMap extends Component {
  constructor(props) {
    super(props);
    this.dragStart = this.dragStart.bind(this);
    this.dragPinOver = this.dragPinOver.bind(this);
    this.pinDrop = this.pinDrop.bind(this);
    this.state = {
      position: [40.734583, -73.997263],
      magnifier: null
    };
  }

  dragStart(props) {
    this.leafletMap.leafletElement.closePopup()
    this.props.handleDragStart(props)
  }

  dragOver(e) {
    e.preventDefault();
    const targetClass = e.target.className;
    // Sneky hack so map doesn't go crazy dragging over leaflet attribution
    if (targetClass.includes('leaflet-container') ) {
      const position = this.leafletMap.leafletElement.containerPointToLatLng([e.offsetX, e.offsetY])
      const magnifier = {dragLatLng: position, dragLeft: e.offsetX, dragTop: e.offsetY};
      this.setState({magnifier: magnifier})
    } else {
      this.props.handleDragLeave()
    }
  }

  dragPinOver(magnifier) {
    this.setState({magnifier: magnifier})
  }

  dragLeave(e) {
    this.setState({magnifier: null})
  }

  dragEnd(e) {
    this.setState({magnifier: null});
    const latlng = this.leafletMap.leafletElement.containerPointToLatLng([e.offsetX, e.offsetY]);
    this.props.handleDrop(latlng.lat, latlng.lng)
  }

  pinDrop(data) {
    this.setState({magnifier: null})
    this.props.handlePinDrop(data)
  }

  componentDidMount() {
    this.leafletMap.container.addEventListener("dragover", this.dragOver.bind(this));
    this.leafletMap.container.addEventListener("drop", this.dragEnd.bind(this));
    this.leafletMap.container.addEventListener("dragleave", this.dragLeave.bind(this));
    this.offsetTop = this.leafletMap.container.offsetParent.offsetParent.offsetTop;
  }

  render() {
    const emojis = this.props.emojis.icons.map((e) =>
      <EmojiTool key={e.name} data={e} onDragStart={this.dragStart} />
    );
    const pins = this.props.pins.map((m) =>
      <EmojiPinContainer key={m.id} data={m} offsetTop={this.offsetTop} onDragStart={this.dragStart} onDragOver={this.dragPinOver} onDrop={this.pinDrop} onDelete={this.props.deletePin} />
    );
    return (
      <div>
        {this.state.magnifier && this.props.dragging &&
          <Magnify draggingObject={this.props.dragging} data={this.state.magnifier} />
        }
        <div className="map-container">
          <Map ref={(el) => { this.leafletMap = el; }} center={this.state.position} zoom={14} scrollWheelZoom={false}>
            <TileLayer
              url='https://api.mapbox.com/styles/v1/kray/ciz1fyu1f000t2sphzml1bxtd/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3JheSIsImEiOiJjaXoxZmdyZ3gwMDE1MnFvZG9oZmhrMTBsIn0.mvcEq1pLdeOv-xUSGn6sVw'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {pins}
          </Map>
        </div>
        <div className="pin-container">
          {emojis}
        </div>
      </div>
    );
  }
}

export default UserMap;
