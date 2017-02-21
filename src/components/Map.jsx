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
      magnifier: null,
      dragging: null
    };
  }

  dragStart(props) {
    this.leafletMap.leafletElement.closePopup()
    this.setState({dragging: props})
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
    // Wow. Gotta have this preventDefault or Firefox might suddenly take you to sex.com
    e.preventDefault()
    const latlng = this.leafletMap.leafletElement.containerPointToLatLng([e.offsetX, e.offsetY]);
    const data = Object.assign({}, this.state.dragging, {lat: latlng.lat, lng: latlng.lng})
    this.props.handleDrop(data)
    this.setState({magnifier: null, dragging: null});
  }

  pinDrop(data) {
    this.props.handleDrop(data)
    this.setState({magnifier: null, dragging: null})
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
    const pins = this.props.pinKeys.map((k) =>
      <EmojiPinContainer key={k} id={k} offsetTop={this.offsetTop} onDragStart={this.dragStart} onDragOver={this.dragPinOver} onDrop={this.pinDrop} onDelete={this.props.deletePin} />
    );
    return (
      <div>
        {this.state.magnifier && this.state.dragging &&
          <Magnify draggingObject={this.state.dragging} data={this.state.magnifier} />
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
