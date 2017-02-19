import React, { Component } from 'react'

class EmojiTool extends Component {
  dragStart(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", e.currentTarget);
    this.props.onDragStart(this.props.data)
    const img = document.createElement("img");
    img.src = "/images/"+this.props.data.name+".png";
    e.dataTransfer.setDragImage(img, 15, 15);
  }

  render() {
    return (
      <div className="pin-entry" draggable="true" onDragStart={this.dragStart.bind(this)}>
        <img className="movable-pin" src={"/images/"+this.props.data.name+".png"} alt={this.props.data.hex} />
        <div className="pin-description">{this.props.data.title}</div>
        <div className="pin-direction">
          ← drag the emoji
        </div>
      </div>
    );
  }
}

export default EmojiTool;
