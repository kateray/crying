import React, { Component } from 'react'
import { Map, TileLayer, ZoomControl } from 'react-leaflet'
import EmojiPinContainer from '../containers/EmojiPinContainer'
import EmojiTool from './EmojiTool'
import Magnify from './Magnify'
import Graffiti from '../Graffiti'


class UserMap extends Component {
  constructor(props) {
    super(props)
    this.dragStart = this.dragStart.bind(this)
    this.dragPinOver = this.dragPinOver.bind(this)
    this.pinDrop = this.pinDrop.bind(this)
    this.setupStreetView = this.setupStreetView.bind(this)
    this.unselectPin = this.unselectPin.bind(this)
    this.povChanged = this.povChanged.bind(this)
    this.positionChanged = this.positionChanged.bind(this)
    this.titleChanged = this.titleChanged.bind(this)
    this.streetViewOptions = {
      visible: false,
      panControl: true,
      linksControl: false,
      fullscreenControl: false,
      addressControl: false,
      zoomControl: true
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
    this.unselectPin()
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

  povChanged() {
    const pov = this.streetView.getPov()
    this.props.updateSelected({heading: pov.heading, pitch: pov.pitch})
  }

  positionChanged() {
    const position = this.streetView.getPosition()
    this.props.updateSelected({lat: position.lat(), lng: position.lng()})
  }

  titleChanged(e) {
    e.stopPropagation()
    this.props.updateSelected({title: e.target.innerHTML})
  }

  setupStreetView(maps){
    this.streetView = new maps.StreetViewPanorama(this.streetViewContainer, this.streetViewOptions)
    this.streetViewService = new maps.StreetViewService()
    maps.event.addListener(this.streetView, "pov_changed", this.povChanged)
    maps.event.addListener(this.streetView, "position_changed", this.positionChanged)
  }

  componentDidMount() {
    this.setupStreetView(window.google.maps)
    this.leafletMap.container.addEventListener("dragover", this.dragOver.bind(this));
    this.leafletMap.container.addEventListener("drop", this.dragEnd.bind(this));
    this.leafletMap.container.addEventListener("dragleave", this.dragLeave.bind(this));
    this.offsetTop = this.leafletMap.container.offsetParent.offsetParent.offsetTop;
  }


  componentWillUpdate(props) {
    // something is selected
    if (props.selectedId) {
      // we have not changed selection
      if (this.props.selectedId === props.selectedId) {
        if (this.overlay) {
          if (props.selectedPin.title !== this.overlay.text_) {
            this.overlay.updateText(props.selectedPin.title)
          }
        }
      // we have changed selection
      } else {
        const latLng = new window.google.maps.LatLng(props.selectedPin.lat, props.selectedPin.lng)
        this.streetViewService.getPanorama({location: latLng}, function(result, status){
          if (status === 'OK') {
            this.streetView.setPosition(latLng)
            this.streetView.setPov({heading: props.selectedPin.heading, pitch: props.selectedPin.pitch})
            this.streetView.setVisible(true)
            if (this.overlay) {
              this.overlay.setMap(null)
              this.overlay = null
            }
            this.overlay = new Graffiti(this)
            this.setState({noPano: false})
          } else {
            if (this.streetView.getVisible()){
              this.streetView.setVisible(false)
            }
            this.setState({noPano: true})
          }
        }.bind(this))
      }
    // nothing is selected
    } else {
      if (this.overlay) {
        this.overlay.setMap(null)
        this.overlay = null
      }
      if (this.streetView.getVisible()){
        this.streetView.setVisible(false)
      }
    }
  }

  unselectPin() {
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
      <EmojiPinContainer key={k} id={k} data={this.props.pins[k]} offsetTop={this.offsetTop} selectPin={this.props.selectPin} unselect={this.unselectPin} onDragStart={this.dragStart} onDragOver={this.dragPinOver} onDrop={this.pinDrop} onDelete={this.props.deletePin} />
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
          {this.state.noPano &&
            <div className="no-pano-container">
              <div className="no-pano">No streetview available</div>
            </div>
          }
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
