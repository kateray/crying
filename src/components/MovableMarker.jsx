import React, { Component } from 'react';

class MovableMarker extends Component {
  render() {
    return (
      <div className="movable-marker" draggable="true" dangerouslySetInnerHTML={{ __html: this.props.hex}} />
    );
  }
}

export default MovableMarker;
