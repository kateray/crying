import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

const Marker = ({ name }) => <img className="emoji-pin" src={"/images/"+name+".png"} alt={name} />;

class Magnify extends Component {

  render() {
    const height = 150;

    return (
      <div className="magnifier-container" style={{height: height, top: this.props.data.dragTop - height, left: this.props.data.dragLeft}}>
        <GoogleMapReact
          center={{lat: this.props.data.lat, lng: this.props.data.lng}}
          defaultZoom={16}
          >
          <Marker lat={this.props.data.lat} lng={this.props.data.lng} name={this.props.dragging.name}/>
        </GoogleMapReact>
      </div>
    )
  }
}

export default Magnify;
