import React, { Component } from 'react'

class EmojiTool extends Component {
  constructor(props) {
    super(props);
    // the result of unimagiable Safari pain
    this.imageElement = document.createElement("img");
    this.imageElement.src = "/images/"+props.data.name+".png";
  }

  dragStart(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("Text", this.props.data.name)
    e.dataTransfer.setDragImage(this.imageElement, 15, 15)
    this.props.onDragStart(this.props.data)
  }

  render() {
    return (
      <div className="pin-entry" draggable="true" onDragStart={this.dragStart.bind(this)}>
        <img className="movable-pin" src={"/images/"+this.props.data.name+".png"} alt={this.props.data.hex} />
        <div className="pin-title">{this.props.data.title}</div>
        <div className="pin-direction">
          ← drag the emoji
        </div>
      </div>
    );
  }
}

export default EmojiTool;