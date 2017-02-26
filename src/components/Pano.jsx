import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Pano extends Component {

  constructor(props) {
    super(props)
    this.streetView = null
  }

  initialize(canvas) {
    if (this.props.googleMaps && this.streetView === null) {
      const googleMaps = this.props.googleMaps;
      const options = {
        visible: false,
        panControl: false,
        linksControl: false,
        fullscreenControl: false,
        addressControl: false,
        pov: {heading: 34, pitch: 10}
      }
      this.streetView = new googleMaps.StreetViewPanorama(canvas, options)
    }
  }

  componentDidMount() {
    this.initialize(ReactDOM.findDOMNode(this))
  }

  componentDidUpdate() {
    this.initialize(ReactDOM.findDOMNode(this))
    if (this.props.isSelected) {
      this.streetView.setPosition({lat: this.props.lat, lng: this.props.lng})
      this.streetView.setVisible(true)
    } else {
      this.streetView.setVisible(false)
    }
  }

  render() {
    return (
      <div className={this.props.isSelected ? 'street-view open' : 'street-view'}>
      </div>
    )
  }
}

export default Pano;
