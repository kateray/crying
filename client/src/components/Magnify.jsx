import React, { Component } from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet'
import { icon } from 'leaflet'

class Magnify extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      top: 80,
      left: 80,
      position: [40.734583, -73.997263],
      emoji: 'cry'
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data.showMagnifier) {
      const visible = true
      const emoji = nextProps.data.data.name
      const position = nextProps.data.latLng
      const arrowOffset = 20
      const popupHeight = 300
      const popupWidth = 500
      const top = nextProps.data.magTop - (popupHeight + arrowOffset*2 + arrowOffset/6 +arrowOffset/2)
      const left = nextProps.data.magLeft - popupWidth/2
      this.setState({visible: visible, position: position, top: top, left: left, emoji: emoji})
    } else if (this.state.visible === true){
      this.setState({visible: false})
    }
  }

  render() {
    const position = this.state.position
    const classString = this.state.visible ? "magnify-container pin-map-container" : "magnify-container pin-map-container invisible"
    const emojiIcon = icon({className: 'emoji-pin', iconUrl: `/images/${this.state.emoji}.png`, iconSize: 16})
    return (
      <div className={classString} style={{top: this.state.top, left: this.state.left}}>
        <Map className="magnify-map" zoomControl={false} dragging={false} attributionControl={false} opacity={0.5} zoom={16} center={position}>
          <TileLayer url='/images/mapbox/{x}/{y}.png' />
        </Map>
        <div className="arrow" />
        <img className="magnifier-icon" src={`/images/${this.state.emoji}.png`} />
      </div>
    )
  }
}

export default Magnify;
