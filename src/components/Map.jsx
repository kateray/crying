import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import EmojiPinContainer from '../containers/EmojiPinContainer'
import EmojiTool from './EmojiTool'
import Magnify from './Magnify'



var overlay;

class UserMap extends Component {
  constructor(props) {
    super(props);
    this.dragStart = this.dragStart.bind(this);
    this.dragPinOver = this.dragPinOver.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.pinDrop = this.pinDrop.bind(this);
    this.hasLoaded = this.hasLoaded.bind(this)
    // this.initDraggableCircle = this.initDraggableCircle.bind(this)
    this.state = {
      position: {lat: 40.734583, lng: -73.997263},
      magnifier: null,
      dragging: null
    };
  }

  dragStart(props) {
    // this.leafletMap.leafletElement.closePopup()
    this.setState({dragging: props})
  }

  dragOver(e) {
    console.log(e)
    if (!this.state.dragging) {
      return;
    }
    const targetClass = e.target.className;
    console.log(e.target)
    console.log(targetClass)
    // Sneky hack so map doesn't go crazy dragging over leaflet attribution
    if (targetClass.includes('leaflet-container') ) {
      const position = this.leafletMap.leafletElement.containerPointToLatLng([e.offsetX, e.offsetY])
      const magnifier = {dragLatLng: position, dragLeft: e.offsetX, dragTop: e.offsetY};
      this.setState({magnifier: magnifier})
    } else {
      this.props.handleDragLeave()
    }
  }

  dragPinOver(magnifier) {
    this.setState({magnifier: magnifier})
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

  componentDidMount() {
    // console.log(this.maps)
    // this.leafletMap.container.addEventListener("dragover", this.dragOver.bind(this));
    // this.leafletMap.container.addEventListener("drop", this.dragEnd.bind(this));
    // this.leafletMap.container.addEventListener("dragleave", this.dragLeave.bind(this));
    // this.offsetTop = this.leafletMap.container.offsetParent.offsetParent.offsetTop;
  }

  // initDraggableCircle({map, maps}) {
  //   maps.event.addListener(circle, 'drag', this.dragOver);
  // }

  hasLoaded({map, maps}) {
    USGSOverlay.prototype = new maps.OverlayView();
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

    Object.keys(this.props.pins).map(function(k) {
      const lat = this.props.pins[k].lat;
      const lng = this.props.pins[k].lng;
      const position = {lat: lat, lng: lng}

      const panorama = new maps.StreetViewPanorama(document.getElementById('street-view'), {
        fullscreenControl: false,
        addressControl: false,
        position: position,
        visible: true,
          pov: {
            heading: 34,
            pitch: 10
          }
        });
      // const marker = new maps.Marker({
      //   position: position,
      //   map: panorama,
      //   icon: 'https://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=cafe|FFFF00',
      //   title: this.props.pins[k].name,
      //   visible: true
      // })
      // marker.addListener('click', function() {
      //   panorama.setVisible(true)
      // });
      const latLng = new maps.LatLng(lat, lng);
      console.log(latLng)
      overlay = new USGSOverlay(panorama, latLng);
    }.bind(this));
  }

  render() {
    const emojis = this.props.emojis.icons.map((e) =>
      <EmojiTool key={e.name} data={e} onDragStart={this.dragStart} />
    );
    const pins = Object.keys(this.props.pins).map((k) =>
      <EmojiPinContainer key={k} id={k} data={this.props.pins[k]} offsetTop={this.offsetTop} onDragStart={this.dragStart} onDragOver={this.dragPinOver} onDrop={this.pinDrop} onDelete={this.props.deletePin} onUpdate={this.props.updatePin} />
    );
    return (
      <div>
        {this.state.magnifier && this.state.dragging &&
          <Magnify draggingObject={this.state.dragging} data={this.state.magnifier} />
        }
        <div className="map-container">
          <GoogleMapReact draggable={false} onGoogleApiLoaded={this.hasLoaded} onChildMouseMove={this.dragOver} bootstrapURLKeys={{key: 'AIzaSyCPMTBegS_87RC5YX0rrTbWVBqp9o9VINk'}} defaultCenter={this.state.position} defaultZoom={14} scrollWheelZoom={false}>
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
