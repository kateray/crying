import React, { Component } from 'react'

class EmojiTool extends Component {
  dragStart(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onDragStart(this.props.data)
  }

  render() {
    return (
      <div className="pin-entry" onMouseDown={this.dragStart.bind(this)}>
        <img className={this.props.animatingTools ? "movable-pin animating" : "movable-pin"} src={"/images/"+this.props.data.name+".png"} alt={this.props.data.hex} />
        <div className="pin-title">{this.props.data.title}</div>
        <div className="pin-direction">
          ← drag the emoji
        </div>
      </div>
    );
  }
}

export default EmojiTool;
