import React, { Component } from 'react'
import { icon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'

class EmojiPin extends Component {
  constructor(props) {
    super(props);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.popupOpen = this.popupOpen.bind(this);
  }

  componentDidMount() {
    this.leafletMap.leafletElement.openPopup();
  }

  handleDescriptionKey(e) {
    if (e.key === 'Enter') {
      this.leafletMap.leafletElement.closePopup();
    }
  }

  onDragStart() {
    this.props.onDragStart(this.props.data)
  }

  onDrop(e) {
    this.props.onDrop({id: this.props.id, lat: e.target._latlng.lat, lng: e.target._latlng.lng})
  }

  onDragOver(e) {
    const y = e.originalEvent.pageY-this.props.offsetTop;
    const magnifier = {dragLatLng: e.latlng, dragLeft: e.originalEvent.pageX, dragTop: y};
    this.props.onDragOver(magnifier)
  }

  onDelete() {
    this.props.onDelete(this.props.id, this.props.data)
  }

  popupOpen(e) {
    const position = {lat: this.props.data.lat, lng: this.props.data.lng}
    // const map = new window.google.maps.Map(e.popup._contentNode, {
    //   center: position,
    //   zoom: 18,
    //   streetViewControl: false
    // });
    // var marker = new window.google.maps.Marker({
    //     position: position,
    //     map: map,
    //     icon: "/images/"+this.props.data.name+".png",
    //     title: this.props.data.title
    // });
    new window.google.maps.StreetViewPanorama(e.popup._contentNode, {
      fullscreenControl: false,
      zoomControl: false,
      addressControl: false,
      panControl: false,
      linksControl: false,
      position: position,
        pov: {
          heading: 34,
          pitch: 10
        }
      });
  }

  render() {
    const emojiIcon = icon({iconUrl: "/images/"+this.props.data.name+".png", iconSize: 16, popupAnchor: [90,12]});
    const position = [this.props.data.lat, this.props.data.lng];
    return (
      <div lat={this.props.data.lat} lng={this.props.data.lng} text={'hey'} ref={(el) => { this.leafletMap = el; }} position={position} icon={emojiIcon} draggable='true' onDragStart={this.onDragStart}>
        <Popup>
          <div className="popup-stuff">
            <div>
              <input type="text" value={this.props.data.title} onChange={(e) => this.props.onUpdate(this.props.id, {title: e.target.value})}/>
            </div>
            <div>
              <textarea placeholder="What happened? (optional)" onKeyPress={this.handleDescriptionKey.bind(this)} onChange={(e) => this.props.onUpdate(this.props.id, {description: e.target.value})} defaultValue={this.props.data.description}/>
            </div>
            <div onClick={this.onDelete} className="delete-pin">delete pin</div>
          </div>
        </Popup>
      </div>
    );
  }
}

export default EmojiPin;
