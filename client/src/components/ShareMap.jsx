import React, { Component } from 'react'
import { Map, TileLayer, ZoomControl } from 'react-leaflet'
import { HeaderContainer } from '../containers/HeaderContainer'
import SharePin from './SharePin'

export class ShareMap extends Component {
  render () {
    let position = [40.734583, -73.997263]
    const pins = this.props.fetchedPins.map((k, i) =>
      <SharePin key={i} data={k} />
    )
    return (
      <div className='share-map'>
        <HeaderContainer />
        <div id='map-container' style={{height: window.innerHeight}}>
          <Map center={position} zoom={14} zoomControl={false} minZoom={13}>
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
