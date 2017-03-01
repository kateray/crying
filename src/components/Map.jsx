import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import EmojiPinContainer from '../containers/EmojiPinContainer'
import EmojiTool from './EmojiTool'
import Magnify from './Magnify'

function point2LatLng(e, googleMap, googleMaps) {
  const topRight = googleMap.getProjection().fromLatLngToPoint(googleMap.getBounds().getNorthEast());
  const bottomLeft = googleMap.getProjection().fromLatLngToPoint(googleMap.getBounds().getSouthWest());
  const scale = Math.pow(2, googleMap.getZoom());
  const worldPoint = new googleMaps.Point(e.offsetX / scale + bottomLeft.x, e.offsetY / scale + topRight.y);
  return googleMap.getProjection().fromPointToLatLng(worldPoint);
}

class UserMap extends Component {
  constructor(props) {
    super(props);
    this.startPinDrag = this.startPinDrag.bind(this)
    this.pinDrag = this.pinDrag.bind(this)
    this.pinDrop = this.pinDrop.bind(this)
    this.setDragging = this.setDragging.bind(this);
    this.toolDrag = this.toolDrag.bind(this);
    this.loadMap = this.loadMap.bind(this)
    this.toolDrop = this.toolDrop.bind(this)
    this.clickMap = this.clickMap.bind(this)
    this.googleMaps = null
    this.myMap = null
    this.streetViewOptions = {
      visible: false,
      panControl: false,
      linksControl: false,
      fullscreenControl: false,
      addressControl: false,
      pov: {
        heading: 34,
        pitch: 10
      }
    }
    this.state = {
      mapLoaded: false,
      position: {lat: 40.734583, lng: -73.997263},
      selected: null,
      magnifier: null,
      dragging: null
    };
  }

  startPinDrag(h, props, mouse) {
    if (props.object !== 'pin') {
      return
    }
    this.setDragging(props.data)
  }

  setDragging(props) {
    this.setState({dragging: props})
  }

  pinDrag(h, props, mouse) {
    if (props.object !== 'pin') {
      return
    }
    const magnifier = {lat: mouse.lat, lng: mouse.lng};
    this.setState({magnifier: magnifier})
  }

  toolDrag(e) {
    e.preventDefault()
    if (!this.state.dragging) {
      return;
    }
    const latlng = point2LatLng(e.nativeEvent, this.myMap, this.googleMaps);
    const magnifier = {lat: latlng.lat(), lng: latlng.lng()};
    this.setState({magnifier: magnifier})

    // const targetClass = e.target.className;
    // // Sneky hack so map doesn't go crazy dragging over leaflet attribution
    // if (targetClass.includes('leaflet-container') ) {
    //   const position = this.leafletMap.leafletElement.containerPointToLatLng([e.offsetX, e.offsetY])
    //   const magnifier = {dragLatLng: position, dragLeft: e.offsetX, dragTop: e.offsetY};
    //   this.setState({magnifier: magnifier})
    // } else {
    //   this.dragLeave()
    // }
  }

  dragLeave(e) {
    this.setState({magnifier: null})
  }

  pinDrop(h, props, mouse) {
    if (props.object !== 'pin') {
      return
    }
    this.props.handleDrop({id: props.id, lat: mouse.lat, lng: mouse.lng})
    this.setState({magnifier: null, dragging: null})
  }

  toolDrop(e) {
    // Wow. Gotta have this preventDefault or Firefox might suddenly take you to sex.com
    e.preventDefault()
    const latlng = point2LatLng(e.nativeEvent, this.myMap, this.googleMaps);
    const data = Object.assign({}, this.state.dragging, {lat: latlng.lat(), lng: latlng.lng()})
    this.props.handleDrop(data)
    this.setState({magnifier: null, dragging: null});
  }

  loadMap({map, maps}) {
    this.myMap = map;
    this.googleMaps = maps;
    const streetView = new maps.StreetViewPanorama(this.streetViewContainer, this.streetViewOptions)
    this.streetView = streetView
    Graffiti.prototype = new maps.OverlayView();
    function Graffiti() {
      this.div_ = null;
      this.setMap(streetView)
    }
    Graffiti.prototype.onAdd = function() {
      var div = document.createElement('div');
      div.className = 'floating-text';
      div.style.position = 'absolute';
      this.div_ = div;
      var panes = this.getPanes();
      panes.overlayLayer.appendChild(div);
    };
    Graffiti.prototype.updateProperties = function(position, text){
      this.position_ = position;
      this.text_ = text;
      // only draw if we have already added
      if (this.div_) {
        this.draw()
      }
    };
    Graffiti.prototype.draw = function() {
      const point = this.getProjection().fromLatLngToDivPixel(this.position_);
      var div = this.div_;
      div.innerHTML = this.text_;
      if (point) {
        div.style.left = point.x + 'px';
        div.style.top = '40px';
      }
      div.style.width = '10px';
      div.style.height = '10px';
    };
    Graffiti.prototype.onRemove = function() {
      this.div_.parentNode.removeChild(this.div_);
      this.div_ = null;
    };

    this.overlay = new Graffiti()
  }

  clickMap(mouse) {
    const className = mouse.event.target.className;
    if (className === 'widget-scene-canvas' || className === 'pin-form-field') {
      return
    }
    this.props.selectPin(null)
  }

  componentWillUpdate(props) {
    const visible = this.streetView.getVisible()
    if (props.selectedId) {
      const latLng = new this.googleMaps.LatLng(props.selectedPin.lat, props.selectedPin.lng)
      // only set to visible if it wasn't
      if (visible === false) {
        this.streetView.setVisible(true)
      }
      // only set position if it has changed
      if (latLng !== this.streetView.position) {
        this.streetView.setPosition(latLng)
      }
      this.overlay.updateProperties(latLng, props.selectedPin.title)
    } else {
      if (visible === true) {
        this.streetView.setVisible(false)
      }
    }
  }

  render() {
    const emojis = this.props.emojis.icons.map((e) =>
      <EmojiTool key={e.name} data={e} onDragStart={this.setDragging} />
    );
    const pins = Object.keys(this.props.pins).map((k) =>
      <EmojiPinContainer key={k} id={k} object='pin' data={this.props.pins[k]} lat={this.props.pins[k].lat} lng={this.props.pins[k].lng} selectPin={this.props.selectPin} />
    );
    return (
      <div>
        <div className="map-container" onDragOver={this.toolDrag} onDrop={this.toolDrop}>
          <GoogleMapReact
            yesIWantToUseGoogleMapApiInternals={true}
            defaultCenter={this.state.position}
            defaultZoom={14}
            bootstrapURLKeys={{key: 'AIzaSyCPMTBegS_87RC5YX0rrTbWVBqp9o9VINk'}}
            draggable={this.state.dragging ? false : true}
            onGoogleApiLoaded={this.loadMap}
            onChildMouseDown={this.startPinDrag}
            onChildMouseMove={this.pinDrag}
            onChildMouseUp={this.pinDrop}
            onClick={this.clickMap}
            >
            {this.state.magnifier && this.state.dragging &&
              <Magnify dragging={this.state.dragging} data={this.state.magnifier} lat={this.state.magnifier.lat} lng={this.state.magnifier.lng} />
            }
            {pins}
          </GoogleMapReact>
          <div className={this.props.selectedId ? 'street-view-container' : 'street-view-container'} >
            <div className="street-view" ref={(el) => {this.streetViewContainer = el;}} />
            {this.props.selectedId &&
              <div>
                <input className="pin-form-field" type="text" value={this.props.selectedPin.title} onChange={(e) => this.props.updatePin(this.props.selectedId, {title: e.target.value})}/>
                <textarea className="pin-form-field" placeholder="What happened? (optional)" onChange={(e) => this.props.updatePin(this.props.selectedId, {description: e.target.value})} value={this.props.selectedPin.description}/>
              </div>
            }
            <div className="arrow-down" />
          </div>
        </div>
        <div className="pin-container">
          {emojis}
        </div>
      </div>
    );
  }
}

export default UserMap;
