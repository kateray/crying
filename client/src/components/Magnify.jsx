import React, { PureComponent } from 'react'
import { Map, TileLayer } from 'react-leaflet'

class Magnify extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      top: 80,
      left: 80,
      position: [40.734583, -73.997263],
      emoji: 'cry'
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data && nextProps.data.inDraggableArea) {
      const visible = true
      const emoji = nextProps.data.data.name
      const position = nextProps.data.latLng
      const arrowOffset = 20
      const popupHeight = 300
      const popupWidth = 500
      const top = nextProps.data.pos.y - (popupHeight + arrowOffset * 2 + arrowOffset / 6 + arrowOffset / 2)
      const left = nextProps.data.pos.x - popupWidth / 2
      this.setState({visible: visible, position: position, top: top, left: left, emoji: emoji})
    } else if (this.state.visible === true) {
      this.setState({visible: false})
    }
  }

  render () {
    const position = this.state.position
    const classString = this.state.visible ? 'magnify-container pin-map-container' : 'magnify-container pin-map-container invisible'
    return (
      <div className={classString} style={{top: this.state.top, left: this.state.left}}>
        <Map className='magnify-map' zoomControl={false} dragging={false} attributionControl={false} opacity={0.5} zoom={16} center={position}>
          <TileLayer url='/images/mapbox/{x}/{y}.png' />
        </Map>
        <div className='arrow' />
        <img className='magnifier-icon' src={`/images/${this.state.emoji}.png`} />
      </div>
    )
  }
}

export default Magnify
