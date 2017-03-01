import React, { Component } from 'react'

function USGSOverlay() {}
let overlay;

class Pano extends Component {

  constructor(props) {
    super(props)
    this.foundPanorama = this.foundPanorama.bind(this)
    this.streetViewUpdated = this.streetViewUpdated.bind(this)
    this.streetView = null
  }

  setupOverlay() {
    console.log('are we doing this quite a lot then??? ')
    USGSOverlay.prototype = new this.props.googleMaps.OverlayView();
    USGSOverlay.prototype.constructor = USGSOverlay;

    function USGSOverlay() {
      // this.text_ = text;
      this.div_ = null;


    }

    USGSOverlay.prototype.onAdd = function() {
      console.log('now i am added')
      var div = document.createElement('div');
      div.className = 'floating-text';
      // div.style.borderStyle = 'none';
      // div.style.borderWidth = '0px';
      // div.style.position = 'absolute';
      div.innerHTML = this.text_;
      this.div_ = div;
      var panes = this.getPanes();
      panes.overlayLayer.appendChild(div);
    };

    USGSOverlay.prototype.draw = function() {
      console.log('here we are drawing')
      var point = this.getProjection().fromLatLngToContainerPixel(this.position_);
      // console.log(!this.position_)
      // console.log(this.position_.lat())
      //
      console.log(point)
      // // Resize the image's div to fit the indicated dimensions.
      // var div = this.div_;
      // div.style.left = point.x + 'px';
      // div.style.top = point.y + 'px';
      // div.style.width = '10px';
      // div.style.height = '10px';
    };

    USGSOverlay.prototype.onRemove = function() {
      console.log('do we ever remove?')
      this.div_.parentNode.removeChild(this.div_);
      this.div_ = null;
    };

    return USGSOverlay;
  }

  componentDidMount() {
    if (!this.props.googleMaps) {
      return
    }
    if (this.streetView === null) {
      const googleMaps = this.props.googleMaps;
      const options = {
        visible: true,
        panControl: false,
        linksControl: false,
        fullscreenControl: false,
        addressControl: false
      }
      this.props.myMap.streetView = new googleMaps.StreetViewPanorama(this.streetViewContainer, options)
      this.streetView = this.props.myMap.getStreetView()
      // console.log(this.streetView)
      USGSOverlay = this.setupOverlay()
      overlay = new USGSOverlay();
      overlay.setMap(this.streetView)
      googleMaps.event.addListener(this.streetView, 'idle', function(){
        console.log('r we ever here?')
        console.log(overlay.getProjection())
      }.bind(this))
      // googleMaps.event.addListener(this.streetView, 'position_changed', this.streetViewUpdated)
    }
  }

  foundPanorama(pano){
    console.log(pano)
    if (pano) {
      var panoCenter = pano.location.latLng;

      // this.overlay = new this.USGSOverlay(panoCenter, this.streetView, this.props.selectedPin.title)
      // var heading = google.maps.geometry.spherical.computeHeading(panoCenter, lookTo);
    }
  }

  streetViewUpdated() {
    console.log('wtf we are jere it waefoa')
    const position = {lat: this.props.selectedPin.lat, lng: this.props.selectedPin.lng};
    var latLng = new this.props.googleMaps.LatLng(this.props.selectedPin.lat, this.props.selectedPin.lng)
    // this.overlay = new this.USGSOverlay(latLng, this.streetView, this.props.selectedPin.title)
    // this.overlay.setMap(this.streetView)
    this.overlay = new this.USGSOverlay(latLng, this.props.selectedPin.title);
    console.log(this.overlay)
    // setTimeout(() => {
    //   this.overlay = new this.USGSOverlay(latLng, this.props.selectedPin.title);
    //   if (this.overlay && this.overlay.setMap) {
    //     this.overlay.setMap(this.streetView)
    //   }
    // }, 500, this)
  }

  componentWillReceiveProps(props) {
    console.log(props)
    if (props.selectedId) {
      const position = {lat: props.selectedPin.lat, lng: props.selectedPin.lng};
      var latLng = new props.googleMaps.LatLng(props.selectedPin.lat, props.selectedPin.lng)
      // const visible = this.streetView.getVisible()
      // if (!visible) {
      //   this.streetView.setVisible(true)
      // }
      // const pos = this.streetView.getPosition()

      this.streetView.setPosition(latLng)
      // console.log(pos)
      // this.overlay.setMap(this.streetView)
      // console.log(this.overlay.getProjection())
      // this.overlay.setMap(this.streetView)

      // this.overlay = new this.USGSOverlay(latLng, this.props.selectedPin.title);
      // this.overlay.setMap(this.props.myMap)
    }
  }

  componentDidUpdate() {
    console.log(this.props.selectedId)
    if (this.props.selectedId) {
      // var latLng = new this.props.googleMaps.LatLng(this.props.selectedPin.lat, this.props.selectedPin.lng)
      // console.log(this.overlay)
      // this.overlay.text_ = this.props.selectedPin.title;
      // this.overlay.position_ = latLng;
      // this.overlay.div_.innerHTML = this.props.selectedPin.title;
      // console.log(this.overlay)
      // const thing = this.overlay.getProjection().fromLatLngToContainerPixel(latLng)
      // console.log(thing)
      // const position = {lat: this.props.selectedPin.lat, lng: this.props.selectedPin.lng};
      // var latLng = new this.props.googleMaps.LatLng(this.props.selectedPin.lat, this.props.selectedPin.lng)
      // const visible = this.streetView.getVisible()
      // if (!visible) {
      //   this.streetView.setVisible(true)
      // }
      // const pos = this.streetView.getPosition()
      // console.log(pos)
      // this.streetView.setPosition(latLng)
      // setTimeout(() => {
      //   this.overlay = new this.USGSOverlay(latLng, this.streetView, this.props.selectedPin.title)
      // }, 0, this)
      // this.overlay = new this.USGSOverlay(latLng, this.streetView, this.props.selectedPin.title)
      // const service = new this.props.googleMaps.StreetViewService;
      // service.getPanoramaByLocation(latLng, 50, this.foundPanorama)

      // if (!pos || pos.lat() !== this.props.selectedPin.lat || pos.lng() !== this.props.selectedPin.lng) {
      //   console.log('reset')
      //   this.streetView.setPosition(position)
      // }
      // console.log(pos)


    } else {
      console.log('well what about here?')
      if (this.overlay) {
        this.overlay.setMap(null)
      }

    }
  }

  render() {
    if (this.props.selectedId && overlay) {
      var latLng = new this.props.googleMaps.LatLng(this.props.selectedPin.lat, this.props.selectedPin.lng)
      console.log(overlay)
      overlay.text_ = this.props.selectedPin.title;
      overlay.position_ = latLng;
    }
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
