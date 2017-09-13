import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Map, TileLayer, ZoomControl } from 'react-leaflet'
import { HeaderContainer } from '../containers/HeaderContainer'
import SharePin from './SharePin'

class ShareMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      position: [40.734583, -73.997263]
    };
  }

  render() {
    const pins = this.props.pins.map((k) =>
      <SharePin key={k.uid} data={k} />
    );
    return (
      <div className="share-map">
        <HeaderContainer />
        <div id="map-container" style={{height: window.innerHeight}}>
          <Map center={this.state.position} zoom={14} zoomControl={false} scrollWheelZoom={false}>
            <ZoomControl position='bottomright' />
            <TileLayer
              url='https://api.mapbox.com/styles/v1/kray/ciz1fyu1f000t2sphzml1bxtd/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3JheSIsImEiOiJjaXoxZmdyZ3gwMDE1MnFvZG9oZmhrMTBsIn0.mvcEq1pLdeOv-xUSGn6sVw'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {pins}
          </Map>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    pins: state.app.fetchedPins,
  }
}

export default connect(
  mapStateToProps
)(ShareMap)
