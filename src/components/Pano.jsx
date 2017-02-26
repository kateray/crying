import React, { Component } from 'react'

class Pano extends Component {

  constructor(props) {
    super(props)
    this.streetView = null
  }

  initialize() {
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
      this.streetView = new googleMaps.StreetViewPanorama(this.streetViewContainer, options)
    }
  }

  componentDidMount() {
    this.initialize()
  }

  componentDidUpdate() {
    this.initialize()
    if (this.props.selectedId) {
      this.streetView.setPosition({lat: this.props.selectedPin.lat, lng: this.props.selectedPin.lng})
      this.streetView.setVisible(true)
    } else {
      this.streetView.setVisible(false)
    }
  }

  render() {
    return (
      <div className={this.props.selectedId ? 'street-view-container open' : 'street-view-container'} >
        <div className="street-view" ref={(el) => {this.streetViewContainer = el;}} />
        {this.props.selectedId &&
          <div>
            <input className="pin-form-field" type="text" value={this.props.selectedPin.title} onChange={(e) => this.props.onUpdate(this.props.selectedId, {title: e.target.value})}/>
            <textarea className="pin-form-field" placeholder="What happened? (optional)" onChange={(e) => this.props.onUpdate(this.props.selectedId, {description: e.target.value})} value={this.props.selectedPin.description}/>

          </div>
        }
        <div className="arrow-down" />
      </div>
    )
  }
}

export default Pano;
