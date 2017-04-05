import React, { Component } from 'react'
import { Map, TileLayer, ZoomControl, GridLayer, MapLayer, latLng, Marker } from 'react-leaflet'
import EmojiPinContainer from '../containers/EmojiPinContainer'
import EmojiTool from './EmojiTool'
import Magnify from './Magnify'
import Graffiti from '../Graffiti'
import { divIcon } from 'leaflet'


class Thing extends Marker {
  // createLeafletLement(coords, done) {
    // console.log('yyyyyyyyy')
    // console.log(coords)
  // }

  // _initImage(thing) {
  //   console.log('okayyyyyyyy')
  // }
  //
  // componentDidMount() {
  //   console.log(this.props.bounds)
  //   // this.props.map.fitBounds(this.props.bounds);
  //
  //   console.log('okay')
  //   console.log(this)
  // }
  // componentDidUpdate() {
  //   // console.log(this.props)
  //   console.log(this.props.position)
  //   // this.leafletElement.setBounds(this.props.bounds);
  // }
}

class UserMap extends Component {
  constructor(props) {
    super(props)
    this.dragStart = this.dragStart.bind(this)
    this.dragPinOver = this.dragPinOver.bind(this)
    this.pinDrop = this.pinDrop.bind(this)
    this.setupStreetView = this.setupStreetView.bind(this)
    this.unselectPin = this.unselectPin.bind(this)
    this.selectPin = this.selectPin.bind(this)
    this.povChanged = this.povChanged.bind(this)
    this.positionChanged = this.positionChanged.bind(this)
    this.visibleChanged = this.visibleChanged.bind(this)
    this.titleChanged = this.titleChanged.bind(this)
    this.streetViewOptions = {
      visible: false,
      panControl: false,
      linksControl: true,
      fullscreenControl: false,
      addressControl: false,
      zoomControl: false
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

  visibleChanged() {
    if (this.streetView.getVisible()){
      setTimeout(function(){ this.setState({loading: false}) }.bind(this), 850);
    }
  }

  setupStreetView(maps){
    console.log(this.streetViewContainer)
    this.streetView = new maps.StreetViewPanorama(this.streetViewContainer.leafletElement._icon, this.streetViewOptions)
    console.log(this.streetView)
    this.streetViewService = new maps.StreetViewService()
    maps.event.addListener(this.streetView, "pov_changed", this.povChanged)
    maps.event.addListener(this.streetView, "position_changed", this.positionChanged)
    maps.event.addListener(this.streetView, "visible_changed", this.visibleChanged)
  }

  componentDidMount() {
    // console.log('man')
    // console.log(this.leafletRectangle)
    // this.leafletMap.leafletElement.openPopup()
    // console.log(this.streetViewContainer)
    this.leafletMap.container.addEventListener("dragover", this.dragOver.bind(this));
    this.leafletMap.container.addEventListener("drop", this.dragEnd.bind(this));
    this.leafletMap.container.addEventListener("dragleave", this.dragLeave.bind(this));
    this.offsetTop = this.leafletMap.container.offsetParent.offsetParent.offsetTop;
  }

  componentDidUpdate() {
    if (!this.streetview && this.streetViewContainer) {
      console.log('yyyyy')
      this.setupStreetView(window.google.maps)
    }

    // console.log(this.leafletRectangle)
    // if (this.leafletRectangle && !this.streetViewContainer) {
    //   this.streetViewContainer = this.leafletRectangle.leafletElement._path;
    //   console.log(this.streetViewContainer.leafletElement._path)
    //   this.setupStreetView(window.google.maps)
    // }

    // if (this.leafletRectangle && !this.streetViewContainer) {
    //   // console.log(this.leafletRectangle)
    //   console.log(this.leafletRectangle)
    //   this.streetViewContainer = this.leafletRectangle.leafletElement._icon;
    //   console.log(this.streetViewContainer)
    //   if (this.streetViewContainer) {
    //     this.setupStreetView(window.google.maps)
    //
    //   }
    //   // console.log(this.streetViewContainer.leafletElement._path)
    // }
  }

  componentWillUpdate(props) {
    // console.log(this.stree)
    // console.log('will update')
    // if (this.leafletRectangle && !this.streetViewContainer) {
    //   // console.log(this.leafletRectangle)
    //   console.log(this.leafletRectangle)
    //   this.streetViewContainer = this.leafletRectangle.leafletElement._icon;
    //   console.log(this.streetViewContainer)
    //   if (this.streetViewContainer) {
    //     this.setupStreetView(window.google.maps)
    //
    //   }
    //   // console.log(this.streetViewContainer.leafletElement._path)
    // }
    // something is selected
    if (!this.streetView) {
      return;
    }
    // console.log(this.streetViewContainer)
    let panoTop, panoLeft;
    if (props.selectedId) {
      const pt = this.leafletMap.leafletElement.latLngToContainerPoint({lat: props.selectedPin.lat, lng: props.selectedPin.lng})
      panoTop = pt.y-350;
      panoLeft = pt.x-250;
      // console.log(this.streetViewContainer)
      // this.streetViewContainer.style.left = panoLeft+'px';
      // this.streetViewContainer.style.top = panoTop+'px';
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
  }

  selectPin(id) {
    this.setState({loading: true})
    this.props.selectPin(id)
  }

  render() {
    let panoTop, panoLeft, northEast;
    let pttt = this.state.position;
    let bounds = [[this.state.position[0]+0.0035, this.state.position[1]-0.02], [this.state.position[0]+0.025, this.state.position[1]+0.02]]
    if (this.props.selectedId) {
      const pt = this.leafletMap.leafletElement.latLngToContainerPoint({lat: this.props.selectedPin.lat, lng: this.props.selectedPin.lng})
      panoTop = pt.y-350;
      panoLeft = pt.x-250;
      const lat = this.props.selectedPin.lat
      const lng = this.props.selectedPin.lng
      // console.log(lat)
      // console.log(lng)
      // bounds = bounds([lat+0.0035, lng-0.02], [lat+0.025, lng+0.02])
      // bounds = [[lat+0.0035, lng-0.02], [lat+0.025, lng+0.02]]
      // const southWest = L.latLng(lat+0.0035, lng-0.02)
      // northEast = L.latLng(lat+0.025, lng+0.02)
      // bounds = L.latLngBounds(southWest, northEast);
      pttt = [lat, lng]
      // console.log(bounds)
      // console.log(southWest)
      // console.log(pttt)


    }
    const street = divIcon({className: "xxx", iconSize: [500, 200],});

    const emojis = this.props.emojis.icons.map((e) =>
      <EmojiTool key={e.name} data={e} onDragStart={this.dragStart} />
    );
    const pins = Object.keys(this.props.pins).map((k) =>
      <EmojiPinContainer key={k} id={k} data={this.props.pins[k]} offsetTop={this.offsetTop} selectPin={this.selectPin} unselect={this.unselectPin} onDragStart={this.dragStart} onDragOver={this.dragPinOver} onDrop={this.pinDrop} onDelete={this.props.deletePin} />
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
            <Marker ref={(el) => {this.streetViewContainer = el; }} position={pttt} zIndex={10000001} icon={street} className="grid-layer" />
            {pins}
          </Map>
        </div>
        <div className="pin-container">
          {emojis}
        </div>
      </div>
    );
  }
}

export default UserMap;
