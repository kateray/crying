import React, { PureComponent } from 'react'
import Graffiti from '../Graffiti'
import * as l from '../../../lib'

export class StreetView extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      noPano: false
    }
  }

  componentDidMount() {
    const streetViewOptions = {
      visible: false,
      panControl: false,
      linksControl: true,
      fullscreenControl: false,
      addressControl: false,
      zoomControl: true
    }
    const maps = window.google.maps
    this.streetView = new maps.StreetViewPanorama(this.streetViewContainer, streetViewOptions)
    this.streetViewService = new maps.StreetViewService()
    maps.event.addListener(this.streetView, "pov_changed", this.povChanged)
    maps.event.addListener(this.streetView, "position_changed", this.positionChanged)
    maps.event.addListener(this.streetView, "visible_changed", this.visibleChanged)
  }

  sameSelection = (pin) => {
    if (this.overlay) {
      if (pin.title !== this.overlay.text_) {
        this.overlay.updateText(pin.title)
      }
    }
  }

  newSelection = (pin) => {
    this.setState({loading: true})
    const latLng = new window.google.maps.LatLng(pin.lat, pin.lng)
    this.streetViewService.getPanorama({location: latLng}, (result, status) => {
      if (status === 'OK') {
        this.streetView.setPosition(latLng)
        this.streetView.setPov({heading: pin.heading, pitch: pin.pitch, zoom: pin.zoom})
        this.streetView.setVisible(true)
        if (this.overlay) {
          this.overlay.setMap(null)
          this.overlay = null
        }
        this.overlay = new Graffiti(this)
        this.setState({noPano: false})
      } else {
        if (this.streetView.getVisible()) {
          this.streetView.setVisible(false)
        }
        this.setState({noPano: true, loading: false})
      }
    })
  }

  noSelection = () => {
    if (this.overlay) {
      this.overlay.setMap(null)
      this.overlay = null
    }
    if (this.streetView.getVisible()){
      this.streetView.setVisible(false)
    }
  }

  componentWillUpdate(props) {
    const oldpin = this.props.selectedPin
    const pin = props.selectedPin
    if (pin) {
      if (oldpin && oldpin.uid === pin.uid) {
        this.sameSelection(pin)
      } else {
        this.newSelection(pin)
      }
    } else {
      this.noSelection()
    }
  }

  positionChanged = () => {
    const position = this.streetView.getPosition()
    this.props.positionChanged(position)
  }

  povChanged = () => {
    const pov = this.streetView.getPov()
    this.props.updatePin(this.props.selectedPin.uid, {heading: pov.heading, pitch: pov.pitch, zoom: pov.zoom})
  }

  visibleChanged = () => {
    if (this.streetView.getVisible()){
      setTimeout(function(){ this.setState({loading: false}) }.bind(this), 850);
    }
  }

  render() {
    const popupPosition = l.getPopupPosition(this.props.popupCoords.x, this.props.popupCoords.y, 320)
    return (
      <div className={this.props.selectedPin ? 'street-view-container pin-map-container open' : 'street-view-container pin-map-container'} style={{top: this.props.popupCoords.y, left: this.props.popupCoords.x}}>
        <div className={'popup-container ' + popupPosition}>
          {this.state.noPano &&
            <div className="no-pano-container">
              <div className="no-pano">No streetview available</div>
            </div>
          }
          {this.state.loading &&
            <div className="loading-street-view" />
          }
          <div className="street-view" ref={(el) => {this.streetViewContainer = el;}} />
        </div>
      </div>
    )
  }
}
