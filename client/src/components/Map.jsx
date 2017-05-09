import React, { Component } from 'react'
import { Map, TileLayer, ZoomControl } from 'react-leaflet'
import HeaderContainer from '../containers/HeaderContainer'
import EmojiPinContainer from '../containers/EmojiPinContainer'
import EmojiTool from './EmojiTool'
import Magnify from './Magnify'
import Graffiti from '../Graffiti'
import _ from 'lodash'
import airbrakeJs from 'airbrake-js'

let airbrake = new airbrakeJs({projectId: 142752, projectKey: 'e4601743a59d5134eea5d31682af34ae'});

class UserMap extends Component {
  constructor(props) {
    super(props)
    this.toolDragStart = this.toolDragStart.bind(this)
    this.stopDrag = this.stopDrag.bind(this)
    this.pinDragStart = this.pinDragStart.bind(this)
    this.pinDrag = this.pinDrag.bind(this)
    this.pinDrop = this.pinDrop.bind(this)
    this.updatePin = this.updatePin.bind(this)
    this.setupStreetView = this.setupStreetView.bind(this)
    this.deletePin = this.deletePin.bind(this)
    this.onSave = this.onSave.bind(this)
    this.unselectPin = this.unselectPin.bind(this)
    this.closePopups = this.closePopups.bind(this)
    this.selectPin = this.selectPin.bind(this)
    this.povChanged = this.povChanged.bind(this)
    this.positionChanged = this.positionChanged.bind(this)
    this.visibleChanged = this.visibleChanged.bind(this)
    this.titleChanged = this.titleChanged.bind(this)
    this.autoSave = this.autoSave.bind(this)
    this.toolDrag = this.toolDrag.bind(this)
    this.toolDrop = this.toolDrop.bind(this)
    this.setLeafletMap = this.setLeafletMap.bind(this)
    this.preload = this.preload.bind(this)
    this.streetViewOptions = {
      visible: false,
      panControl: false,
      linksControl: true,
      fullscreenControl: false,
      addressControl: false,
      zoomControl: true
    }
    this.state = {
      pins: [],
      newPin: null,
      position: [40.734583, -73.997263],
      dragging: null,
      loadedPoints: [],
      errorPoints: []
    };
  }

  closePopups(){
    this.leafletMap.leafletElement.closePopup()
  }

  toolDragStart(data) {
    this.closePopups()
    this.setState({dragging: {type: 'tool', data: data}})
    this.leafletMap.leafletElement.on("mousemove", this.toolDrag)
  }

  pinDragStart(data){
    this.closePopups()
    this.setState({dragging: {type: 'pin', data: data}})
  }

  toolDrag(e) {
    const targetClass = e.originalEvent.target.className;
    if (targetClass.includes('leaflet-container') || targetClass.includes('leaflet-drag-target') || targetClass.includes('street-view') || targetClass.includes('leaflet-marker-icon') ) {
      const dragging = this.state.dragging;
      dragging.showMagnifier = true;
      dragging.latLng = e.latlng;
      dragging.magLeft = e.originalEvent.pageX;
      dragging.magTop = e.originalEvent.pageY-this.offsetTop;
      dragging.showDraggableTool = true;
      dragging.toolTop = e.originalEvent.pageY-15;
      dragging.toolLeft = e.originalEvent.pageX-15;
      this.setState({dragging: dragging})
    } else {
      this.magnifierHide()
    }
  }

  pinDrag(e) {
    const targetClass = e.originalEvent.target.className;
    if (targetClass.includes('leaflet-container') || targetClass.includes('leaflet-drag-target') || targetClass.includes('street-view') || targetClass.includes('leaflet-marker-icon') ) {
      const pt = this.leafletMap.leafletElement.latLngToContainerPoint(e.latlng)
      const dragging = this.state.dragging;
      dragging.showMagnifier = true;
      dragging.latLng = e.latlng;
      dragging.magLeft = pt.x;
      dragging.magTop = pt.y;
      this.setState({dragging: dragging})
    } else {
      this.magnifierHide()
    }
  }

  magnifierHide() {
    const dragging = this.state.dragging;
    dragging.showMagnifier = false;
    this.setState({dragging: dragging})
  }

  toolDrop(e) {
    this.leafletMap.leafletElement.removeEventListener('mousemove');
    if (this.state.dragging && this.state.dragging.type === 'tool') {
      const uid = Date.now().toString()
      const newPin = Object.assign({uid: uid, heading: 34, pitch: 10, zoom: 1}, this.state.dragging.data, {lat: e.latlng.lat, lng: e.latlng.lng})
      const pins = [...this.state.pins, newPin]
      this.setState({pins: pins, dragging: null, newPin: uid});
    }
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
    this.setState({dragging: null})
  }

  povChanged() {
    const pov = this.streetView.getPov()
    this.updatePin(this.props.selectedId, {heading: pov.heading, pitch: pov.pitch, zoom: pov.zoom})
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

  autoSave() {
    if (!_.isEqual(this.props.fetchedPins, this.state.pins) ) {
      this.props.onSave(this.props.match.params.id, this.state.pins)
    }
    setTimeout(this.autoSave, 60000)
  }

  stopDrag(e) {
    if (this.state.dragging) {
      const targetClass = e.target.className
      if (targetClass !== 'leaflet-container') {
        this.leafletMap.leafletElement.removeEventListener('mousemove');
        this.setState({dragging: null})
      }
    }
  }

  componentWillMount() {
    this.props.getPins(this.props.match.params.id)
  }

  componentDidMount() {
    this.preload()
    this.setupStreetView(window.google.maps)
    this.leafletMap.leafletElement.on("moveend", this.preload);
    this.leafletMap.leafletElement.on("mouseup", this.toolDrop)
    document.body.addEventListener("mouseup", this.stopDrag);
    this.offsetTop = this.leafletMap.container.offsetParent.offsetTop;
    window.addEventListener("beforeunload", this.confirmSave.bind(this));
    setTimeout(this.autoSave, 60000)
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
            this.streetView.setPov({heading: selectedPin.heading, pitch: selectedPin.pitch, zoom: selectedPin.zoom})
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
    if (this.leafletMap) {
      this.leafletMap.leafletElement.dragging.enable()
    }
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
    this.props.onSave(this.props.match.params.id, this.state.pins)
  }

  preload() {
    let bounds = this.leafletMap.leafletElement.getBounds()
    let min = this.leafletMap.leafletElement.project(bounds.getNorthWest(), 16).divideBy(256).floor(),
      max = this.leafletMap.leafletElement.project(bounds.getSouthEast(), 16).divideBy(256).floor();
    let loaded = this.state.loadedPoints;
    let errored = this.state.errorPoints;
    for (let i = min.x; i <= max.x; i++) {
      for (let j = min.y; j <= max.y; j++) {
        if (!_.find(loaded, {x: i, y: j})){
          loaded.push({x: i, y: j})
          const url = '/images/mapbox/'+i.toString()+'/'+j.toString()+'.png';
          let img=new Image();
          img.className = 'hidden';
          img.alt = "mapbox";
          img.src=url;
          document.body.append(img)
          img.onerror = function() {
            if (!_.find(errored, {x: i, y: j})){
              errored.push({x: i, y: j})
            }
          }
        }
      }
    }
    if (errored.length > 0) {
      console.log(JSON.stringify(errored))
      clearTimeout(this.sendMissingTiles);
      this.sendMissingTiles = setTimeout( () => {
        airbrake.notify(JSON.stringify(errored));
        this.setState({errored: []})
      }, 60000);
    }
    this.setState({loadedPoints: loaded})
  }

  render() {
    let panoTop, panoLeft;
    if (this.props.selectedId) {
      const selectedPin = _.find(this.state.pins, ['uid', this.props.selectedId])
      const pt = this.leafletMap.leafletElement.latLngToContainerPoint({lat: selectedPin.lat, lng: selectedPin.lng})
      panoTop = pt.y;
      panoLeft = pt.x;
    }
    const emojis = this.props.emojis.icons.map((e) =>
      <EmojiTool key={e.name} data={e} onDragStart={this.toolDragStart} />
    );
    const pins = this.state.pins.map((k) =>
      <EmojiPinContainer key={k.uid} data={k} isNew={ this.state.newPin === k.uid } offsetTop={this.offsetTop} selectPin={this.selectPin} unselect={this.unselectPin} onDragStart={this.pinDragStart} onDragOver={this.pinDrag} onDrop={this.pinDrop} onDelete={this.deletePin} />
    );
    return (
      <div>
        <HeaderContainer onSave={this.onSave} showSave={true}/>
        {this.state.dragging && this.state.dragging.showMagnifier &&
          <Magnify data={this.state.dragging} />
        }
        {this.state.dragging && this.state.dragging.showDraggableTool &&
          <img className="draggable-tool" alt={this.state.dragging.data.name} src={"/images/"+this.state.dragging.data.name+".png"} style={{top: this.state.dragging.toolTop, left: this.state.dragging.toolLeft}} />
        }
        <div id="map-container" className={this.state.dragging ? "dragging" : ""} style={{height: window.innerHeight-60}}>
          <Map ref={this.setLeafletMap} center={this.state.position} zoom={14} zoomControl={false} scrollWheelZoom={false}>
            <ZoomControl position='bottomright' />
            <TileLayer
              url='https://api.mapbox.com/styles/v1/kray/cj27sh4ld00002sqc4cl4hnza/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3JheSIsImEiOiJjaXoxZmdyZ3gwMDE1MnFvZG9oZmhrMTBsIn0.mvcEq1pLdeOv-xUSGn6sVw'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {pins}
          </Map>
        </div>
        <div className={this.props.selectedId ? 'street-view-container pin-map-container open' : 'street-view-container pin-map-container'} style={{top: panoTop, left: panoLeft}}>
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
