import React, { Component } from 'react'
import { Map, TileLayer, ZoomControl } from 'react-leaflet'
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
    this.selectPin = this.selectPin.bind(this)
    this.unselectPin = this.unselectPin.bind(this)
    this.streetViewOptions = {
      visible: false,
      panControl: false,
      linksControl: false,
      fullscreenControl: false,
      addressControl: false,
      zoomControl: false,
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

    const stopGoogle = function(e) {
      e.stopPropagation()
    }

    const updatePin = function(e){
      e.stopPropagation()
      if (this.props.selectedId) {
        this.props.updatePin(this.props.selectedId, {title: e.target.innerHTML})
      }
    }.bind(this)

    Graffiti.prototype = new maps.OverlayView();
    function Graffiti() {
      this.content_ = null;
      this.setMap(streetView)
    }
    Graffiti.prototype.onAdd = function() {
      var content = document.createElement('div');
      content.setAttribute('contenteditable', true)
      content.className = 'floating-text';
      this.content_ = content;
      content.addEventListener("keypress", stopGoogle);
      content.addEventListener("keyup", updatePin);
      var panes = this.getPanes();
      panes.overlayLayer.appendChild(content);
    };
    Graffiti.prototype.updateProperties = function(text){
      this.text_ = text;
      // only draw if we have already added
      if (this.content_) {
        this.draw()
      }
    };
    Graffiti.prototype.draw = function() {
      var content = this.content_;
      content.innerHTML = this.text_;
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

  selectPin(id, data) {
    const latLng = new window.google.maps.LatLng(data.lat, data.lng)
    this.streetView.setPosition(latLng)
    this.overlay.updateProperties(data.title)
    this.streetView.setVisible(true)
    this.props.selectPin(id)
  }

  unselectPin() {
    this.streetView.setVisible(false)
    this.props.selectPin(null)
  }

  render() {
    let panoTop, panoLeft;
    if (this.props.selectedId) {
      const pt = this.leafletMap.leafletElement.latLngToContainerPoint({lat: this.props.selectedPin.lat, lng: this.props.selectedPin.lng})
      panoTop = pt.y-350;
      panoLeft = pt.x-250;
    }
    const emojis = this.props.emojis.icons.map((e) =>
      <EmojiTool key={e.name} data={e} onDragStart={this.dragStart} />
    );
    const pins = Object.keys(this.props.pins).map((k) =>
      <EmojiPinContainer key={k} id={k} data={this.props.pins[k]} offsetTop={this.offsetTop} selectPin={this.selectPin} unselect={this.unselectPin} onDragStart={this.dragStart} onDragOver={this.dragPinOver} onDrop={this.pinDrop} onDelete={this.props.deletePin} onUpdate={this.props.updatePin} />
    );
    return (
      <div>
        {this.state.magnifier && this.state.dragging &&
          <Magnify draggingObject={this.state.dragging} data={this.state.magnifier} />
        }
        <div className="map-container">
          <Map ref={(el) => { this.leafletMap = el; }} center={this.state.position} zoom={14} zoomControl={false} scrollWheelZoom={false}>
            <ZoomControl position='bottomright' />
            <TileLayer
              url='https://api.mapbox.com/styles/v1/kray/ciz1fyu1f000t2sphzml1bxtd/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3JheSIsImEiOiJjaXoxZmdyZ3gwMDE1MnFvZG9oZmhrMTBsIn0.mvcEq1pLdeOv-xUSGn6sVw'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {pins}
          </Map>
        </div>
        <div className={this.props.selectedId ? 'street-view-container open' : 'street-view-container'} style={{top: panoTop, left: panoLeft}}>
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
