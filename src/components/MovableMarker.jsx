import React, { Component } from 'react';

class MovableMarker extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="marker-entry">
        <div className="movable-marker" draggable="true" dangerouslySetInnerHTML={{ __html: this.props.hex}} />
        <div className="marker-description">{this.props.description}</div>
        <div className="marker-direction">
          ← drag the emoji
        </div>
      </div>
    );
  }
}

export default MovableMarker;
