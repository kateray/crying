import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import EmojiPinContainer from '../containers/EmojiPinContainer'
import EmojiTool from './EmojiTool'
import Magnify from './Magnify'


class UserMap extends Component {
  constructor(props) {
    super(props)
    this.dragStart = this.dragStart.bind(this)
    this.dragPinOver = this.dragPinOver.bind(this)
    this.pinDrop = this.pinDrop.bind(this)
    this.setupStreetView = this.setupStreetView.bind(this)
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
      position: [40.734583, -73.997263],
      magnifier: null,
      dragging: null
    };
  }

  dragStart(props) {
    this.leafletMap.leafletElement.closePopup()
    this.setState({dragging: props})
  }

  dragOver(e) {
    e.preventDefault();
    const targetClass = e.target.className;
    // Sneky hack so map doesn't go crazy dragging over leaflet attribution
    if (targetClass.includes('leaflet-container') || targetClass.includes('street-view') ) {
      const position = this.leafletMap.leafletElement.containerPointToLatLng([e.offsetX, e.offsetY])
      const magnifier = {dragLatLng: position, dragLeft: e.offsetX, dragTop: e.offsetY};
      this.setState({magnifier: magnifier})
    } else {
      this.dragLeave()
    }
  }

  dragPinOver(e) {
    const targetClass = e.originalEvent.target.className;
    if (targetClass.includes('leaflet-container') || targetClass.includes('leaflet-drag-target') || targetClass.includes('street-view') ) {
      const y = e.originalEvent.pageY-this.offsetTop;
      const magnifier = {dragLatLng: e.latlng, dragLeft: e.originalEvent.pageX, dragTop: y};
      this.setState({magnifier: magnifier})
    } else {
      this.dragLeave()
    }
  }

  dragLeave(e) {
    this.setState({magnifier: null})
  }

  dragEnd(e) {
    // Wow. Gotta have this preventDefault or Firefox might suddenly take you to sex.com
    e.preventDefault()
    const latlng = this.leafletMap.leafletElement.containerPointToLatLng([e.offsetX, e.offsetY]);
    const data = Object.assign({}, this.state.dragging, {lat: latlng.lat, lng: latlng.lng})
    this.props.handleDrop(data)
    this.setState({magnifier: null, dragging: null});
  }

  pinDrop(data) {
    this.props.handleDrop(data)
    this.setState({magnifier: null, dragging: null})
  }

  setupStreetView(maps){
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
      div.style.width = '100px';
      div.style.height = '10px';
    };
    Graffiti.prototype.onRemove = function() {
      this.div_.parentNode.removeChild(this.div_);
      this.div_ = null;
    };

    this.overlay = new Graffiti()
  }

  componentDidMount() {
    this.setupStreetView(window.google.maps)
    this.leafletMap.container.addEventListener("dragover", this.dragOver.bind(this));
    this.leafletMap.container.addEventListener("drop", this.dragEnd.bind(this));
    this.leafletMap.container.addEventListener("dragleave", this.dragLeave.bind(this));
    this.offsetTop = this.leafletMap.container.offsetParent.offsetParent.offsetTop;
  }

  componentWillUpdate(props) {
    const visible = this.streetView.getVisible()
    if (props.selectedId) {
      const latLng = new window.google.maps.LatLng(props.selectedPin.lat, props.selectedPin.lng)
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
      <EmojiTool key={e.name} data={e} onDragStart={this.dragStart} />
    );
    const pins = Object.keys(this.props.pins).map((k) =>
      <EmojiPinContainer key={k} id={k} data={this.props.pins[k]} offsetTop={this.offsetTop} selectPin={this.props.selectPin} onDragStart={this.dragStart} onDragOver={this.dragPinOver} onDrop={this.pinDrop} onDelete={this.props.deletePin} onUpdate={this.props.updatePin} />
    );
    return (
      <div>
        {this.state.magnifier && this.state.dragging &&
          <Magnify draggingObject={this.state.dragging} data={this.state.magnifier} />
        }
        <div className="map-container">
          <Map ref={(el) => { this.leafletMap = el; }} center={this.state.position} zoom={14} scrollWheelZoom={false}>
            <TileLayer
              url='https://api.mapbox.com/styles/v1/kray/ciz1fyu1f000t2sphzml1bxtd/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3JheSIsImEiOiJjaXoxZmdyZ3gwMDE1MnFvZG9oZmhrMTBsIn0.mvcEq1pLdeOv-xUSGn6sVw'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {pins}
          </Map>
        </div>
        <div className={this.props.selectedId ? 'street-view-container open' : 'street-view-container'}>
          <div className="street-view" ref={(el) => {this.streetViewContainer = el;}} />
        </div>
        <div className="pin-container">
          {emojis}
        </div>
      </div>
    );
  }
}

export default UserMap;
