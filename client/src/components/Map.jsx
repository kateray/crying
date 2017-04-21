import React, { Component } from 'react'
import { Map, TileLayer, ZoomControl } from 'react-leaflet'
import HeaderContainer from '../containers/HeaderContainer'
import EmojiPinContainer from '../containers/EmojiPinContainer'
import EmojiTool from './EmojiTool'
import Magnify from './Magnify'
import Graffiti from '../Graffiti'
import _ from 'lodash'


class UserMap extends Component {
  constructor(props) {
    super(props)
    this.dragStart = this.dragStart.bind(this)
    this.pinDrag = this.pinDrag.bind(this)
    this.pinDrop = this.pinDrop.bind(this)
    this.updatePin = this.updatePin.bind(this)
    this.setupStreetView = this.setupStreetView.bind(this)
    this.deletePin = this.deletePin.bind(this)
    this.onSave = this.onSave.bind(this)
    this.unselectPin = this.unselectPin.bind(this)
    this.selectPin = this.selectPin.bind(this)
    this.povChanged = this.povChanged.bind(this)
    this.positionChanged = this.positionChanged.bind(this)
    this.visibleChanged = this.visibleChanged.bind(this)
    this.titleChanged = this.titleChanged.bind(this)
    this.setLeafletMap = this.setLeafletMap.bind(this)
    this.streetViewOptions = {
      visible: false,
      panControl: false,
      linksControl: true,
      fullscreenControl: false,
      addressControl: false,
      zoomControl: false
    }
    this.state = {
      pins: [],
      newPin: null,
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

  toolDrag(e) {
    e.preventDefault();
    const targetClass = e.target.className;
    // Sneky hack so map doesn't go crazy dragging over leaflet attribution
    if (targetClass.includes('leaflet-container') || targetClass.includes('street-view') ) {
      const position = this.leafletMap.leafletElement.containerPointToLatLng([e.pageX, e.pageY])
      const magnifier = {dragLatLng: position, dragLeft: e.pageX, dragTop: e.pageY};
      this.setState({magnifier: magnifier})
    } else {
      this.dragLeave()
    }
  }

  pinDrag(e) {
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

  toolDrop(e) {
    // Wow. Gotta have this preventDefault or Firefox might suddenly take you to sex.com
    e.preventDefault()
    const latlng = this.leafletMap.leafletElement.containerPointToLatLng([e.offsetX, e.offsetY]);
    const uid = Date.now().toString()
    const newPin = Object.assign({uid: uid, heading: 34, pitch: 10, zoom: 1}, this.state.dragging, {lat: latlng.lat, lng: latlng.lng})
    const pins = [...this.state.pins, newPin]
    this.setState({pins: pins, magnifier: null, dragging: null, newPin: uid});
  }

  updatePin(uid, data) {
    const pins = this.state.pins.map((item) => {
      if (item.uid === uid) {
        return Object.assign({}, item, data)
      }
      return item
    })
    this.setState({pins: pins})
  }

  pinDrop(uid, data) {
    this.updatePin(uid, data)
    this.setState({magnifier: null, dragging: null})
  }

  povChanged() {
    const pov = this.streetView.getPov()
    this.updatePin(this.props.selectedId, {heading: pov.heading, pitch: pov.pitch})
  }

  positionChanged() {
    const position = this.streetView.getPosition()
    this.updatePin(this.props.selectedId, {lat: position.lat(), lng: position.lng()})
  }

  titleChanged(e) {
    e.stopPropagation()
    this.updatePin(this.props.selectedId, {title: e.target.innerHTML})
  }

  visibleChanged() {
    if (this.streetView.getVisible()){
      setTimeout(function(){ this.setState({loading: false}) }.bind(this), 850);
    }
  }

  setupStreetView(maps){
    this.streetView = new maps.StreetViewPanorama(this.streetViewContainer, this.streetViewOptions)
    this.streetViewService = new maps.StreetViewService()
    maps.event.addListener(this.streetView, "pov_changed", this.povChanged)
    maps.event.addListener(this.streetView, "position_changed", this.positionChanged)
    maps.event.addListener(this.streetView, "visible_changed", this.visibleChanged)
  }

  confirmSave(e){
    if (!_.isEqual(this.props.fetchedPins, this.state.pins) ) {
      const confirmationMessage = "You have unsaved changes that you'll lose if you leave now";
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    }
  }

  componentDidMount() {
    this.props.getPins()
    this.setupStreetView(window.google.maps)
    this.leafletMap.container.addEventListener("dragover", this.toolDrag.bind(this));
    this.leafletMap.container.addEventListener("drop", this.toolDrop.bind(this));
    this.leafletMap.container.addEventListener("dragleave", this.dragLeave.bind(this));
    this.offsetTop = this.leafletMap.container.offsetParent.offsetParent.offsetTop;
    window.addEventListener("beforeunload", this.confirmSave.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.fetchedPins !== nextProps.fetchedPins) {
      this.setState({pins: nextProps.fetchedPins})
    }
  }

  componentWillUpdate(props) {
    // something is selected
    if (props.selectedId) {
      const selectedPin = _.find(this.state.pins, ['uid', props.selectedId])

      // we have not changed selection
      if (this.props.selectedId === props.selectedId) {
        if (this.overlay) {
          if (selectedPin.title !== this.overlay.text_) {
            this.overlay.updateText(selectedPin.title)
          }
        }
      // we have changed selection
      } else {
        const latLng = new window.google.maps.LatLng(selectedPin.lat, selectedPin.lng)
        this.streetViewService.getPanorama({location: latLng}, function(result, status){
          if (status === 'OK') {
            this.streetView.setPosition(latLng)
            this.streetView.setPov({heading: selectedPin.heading, pitch: selectedPin.pitch})
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
            this.setState({noPano: true, loading: false})
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
    this.leafletMap.leafletElement.dragging.enable()
  }

  selectPin(uid) {
    this.setState({loading: true, newPin: null})
    this.props.selectPin(uid)
    this.leafletMap.leafletElement.dragging.disable()
  }

  deletePin(uid) {
    this.unselectPin()
    this.setState({pins: this.state.pins.filter((item) => item.uid !== uid)})
  }

  // important to define ref as bound method rather than inline so that it doesn't get called with null
  // https://facebook.github.io/react/docs/refs-and-the-dom.html#caveats
  setLeafletMap(el) {
    this.leafletMap = el
  }

  onSave() {
    this.props.onSave(this.state.pins)
  }

  render() {
    let panoTop, panoLeft;
    if (this.props.selectedId) {
      const selectedPin = _.find(this.state.pins, ['uid', this.props.selectedId])
      const pt = this.leafletMap.leafletElement.latLngToContainerPoint({lat: selectedPin.lat, lng: selectedPin.lng})
      panoTop = pt.y-295;
      panoLeft = pt.x-250;
    }
    const emojis = this.props.emojis.icons.map((e) =>
      <EmojiTool key={e.name} data={e} onDragStart={this.dragStart} />
    );
    const pins = this.state.pins.map((k) =>
      <EmojiPinContainer key={k.uid} data={k} isNew={ this.state.newPin === k.uid } offsetTop={this.offsetTop} selectPin={this.selectPin} unselect={this.unselectPin} onDragStart={this.dragStart} onDragOver={this.pinDrag} onDrop={this.pinDrop} onDelete={this.deletePin} />
    );
    return (
      <div>
        <HeaderContainer onSave={this.onSave} />
        {this.state.magnifier && this.state.dragging &&
          <Magnify draggingObject={this.state.dragging} data={this.state.magnifier} />
        }
        <div className="map-container">
          <Map ref={this.setLeafletMap} center={this.state.position} zoom={14} zoomControl={false} scrollWheelZoom={false}>
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
          {this.state.loading &&
            <div className="loading-street-view" />
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
