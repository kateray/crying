import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import EmojiPinContainer from '../containers/EmojiPinContainer'
import EmojiTool from './EmojiTool'
import Magnify from './Magnify'
import PanoContainer from '../containers/PanoContainer'


function createPano(myMap, mapper) {
  USGSOverlay.prototype = new mapper.OverlayView();
  function USGSOverlay(map, position) {
    this.map_ = map;
    console.log(position)
    this.position_ = position;
    this.div_ = null;
    this.setMap(map);
  }
  USGSOverlay.prototype.onAdd = function() {
    console.log('sup')
    var div = document.createElement('div');
    div.className = 'floating-text';
    div.style.borderStyle = 'none';
    div.style.borderWidth = '0px';
    div.style.position = 'absolute';
    div.innerHTML = 'we stayed here for a long time';

    this.div_ = div;

    // Add the element to the "overlayLayer" pane.
    var panes = this.getPanes();
    panes.overlayLayer.appendChild(div);
  };

  USGSOverlay.prototype.draw = function() {
    console.log('y?')
    var overlayProjection = this.getProjection();
    console.log(this.position_)
    var sw = overlayProjection.fromLatLngToDivPixel(this.position_);
    console.log(sw)

    // Resize the image's div to fit the indicated dimensions.
    var div = this.div_;
    div.style.left = sw.x + 'px';
    div.style.top = sw.y + 'px';
    div.style.width = '10px';
    div.style.height = '10px';
  };
}

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
    this.mapLoaded = this.mapLoaded.bind(this)
    this.toolDrop = this.toolDrop.bind(this)
    this.clickMap = this.clickMap.bind(this)
    this.googleMaps = null
    this.myMap = null
    this.state = {
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
    const magnifier = {lat: mouse.lat, lng: mouse.lng, dragLeft: mouse.x, dragTop: mouse.y};
    this.setState({magnifier: magnifier})
  }

  toolDrag(e) {
    e.preventDefault()
    if (!this.state.dragging) {
      return;
    }

    const latlng = point2LatLng(e.nativeEvent, this.myMap, this.googleMaps);
    const magnifier = {lat: latlng.lat(), lng: latlng.lng(), dragLeft: e.nativeEvent.offsetX, dragTop: e.nativeEvent.offsetY};
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

  mapLoaded({map, maps}) {
    this.myMap = map;
    this.googleMaps = maps
  }

  clickMap(mouse) {
    if (mouse.event.target.className === 'widget-scene-canvas') {
      return
    }
    this.props.selectPin(null)
  }

  render() {
    const emojis = this.props.emojis.icons.map((e) =>
      <EmojiTool key={e.name} data={e} onDragStart={this.setDragging} />
    );
    const pins = Object.keys(this.props.pins).map((k) =>
      <EmojiPinContainer key={k} id={k} object='pin' data={this.props.pins[k]} lat={this.props.pins[k].lat} lng={this.props.pins[k].lng} selectPin={this.props.selectPin} />
    );
    let panoLat, panoLong;
    if (this.props.selected) {
      const selectedPin = this.props.pins[this.props.selected];
      panoLat = selectedPin.lat;
      panoLong = selectedPin.lng;
    }
    return (
      <div>
        {this.state.magnifier && this.state.dragging &&
          <Magnify dragging={this.state.dragging} data={this.state.magnifier} />
        }
        <div className="map-container" onDragOver={this.toolDrag} onDrop={this.toolDrop}>
          <GoogleMapReact
            yesIWantToUseGoogleMapApiInternals={true}
            defaultCenter={this.state.position}
            defaultZoom={14}
            bootstrapURLKeys={{key: 'AIzaSyCPMTBegS_87RC5YX0rrTbWVBqp9o9VINk'}}
            draggable={this.state.dragging ? false : true}
            onGoogleApiLoaded={this.mapLoaded}
            onChildMouseDown={this.startPinDrag}
            onChildMouseMove={this.pinDrag}
            onChildMouseUp={this.pinDrop}
            onClick={this.clickMap}
            >
            <PanoContainer googleMaps={this.googleMaps} lat={panoLat} lng={panoLong}/>
            {pins}
          </GoogleMapReact>
        </div>
        <div className="pin-container">
          {emojis}
        </div>
      </div>
    );
  }
}

export default UserMap;
