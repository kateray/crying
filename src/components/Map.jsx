import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import EmojiPinContainer from '../containers/EmojiPinContainer'
import Magnify from './Magnify'


class UserMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      position: [40.734583, -73.997263],
      mousePosition: [40.734583, -73.997263],
      top: 0,
      left: 0
    };
  }

  dragOver(e) {
    e.preventDefault();
    const latlng = this.leafletMap.leafletElement.containerPointToLatLng([e.offsetX, e.offsetY]);
    this.setState({dragging: true, mousePosition: latlng, top: e.offsetY, left: e.offsetX});
  }

  dragEnd(e) {
    e.preventDefault();
    this.setState({dragging: false});
    const latlng = this.leafletMap.leafletElement.containerPointToLatLng([e.offsetX, e.offsetY]);
    this.props.handleDrop(latlng.lat, latlng.lng)
  }

  componentDidMount() {
    this.leafletMap.container.addEventListener("dragover", this.dragOver.bind(this));
    this.leafletMap.container.addEventListener("drop", this.dragEnd.bind(this));
  }

  render() {
    const markers = this.props.markers.map((m) =>
      <EmojiPinContainer key={m.id} data={m} />
    );
    return (
      <div>
        {this.state.dragging &&
          <Magnify position={this.state.mousePosition} top={this.state.top} left={this.state.left} />
        }
        <Map ref={(el) => { this.leafletMap = el; }} center={this.state.position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            url='https://api.mapbox.com/styles/v1/kray/ciz1fyu1f000t2sphzml1bxtd/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3JheSIsImEiOiJjaXoxZmdyZ3gwMDE1MnFvZG9oZmhrMTBsIn0.mvcEq1pLdeOv-xUSGn6sVw'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {markers}
        </Map>
      </div>
    );
  }
}

export default UserMap;
