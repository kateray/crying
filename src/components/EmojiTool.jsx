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
      <div className="marker-entry" draggable="true" onDragStart={this.dragStart.bind(this)}>
        <img className="movable-marker" src={"/images/"+this.props.data.name+".png"} />
        <div className="marker-description">{this.props.data.title}</div>
        <div className="marker-direction">
          ← drag the emoji
        </div>
      </div>
    );
  }
}

export default EmojiTool;
