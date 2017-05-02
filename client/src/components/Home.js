import React, { Component } from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet'
import HeaderContainer from '../containers/HeaderContainer'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      position: [40.734583, -73.997263]
    };
  }

  render() {
    return (
      <div>
        <HeaderContainer />
        <div id="map-container">
          <Map center={this.state.position} zoom={14} zoomControl={false} scrollWheelZoom={false}>
            <ZoomControl position='bottomright' />
            <TileLayer
              url='https://api.mapbox.com/styles/v1/kray/ciz1fyu1f000t2sphzml1bxtd/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3JheSIsImEiOiJjaXoxZmdyZ3gwMDE1MnFvZG9oZmhrMTBsIn0.mvcEq1pLdeOv-xUSGn6sVw'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
          </Map>
        </div>
      </div>
    );
  }
}

export default Home;
