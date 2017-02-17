import React, { Component } from 'react'

class EmojiTool extends Component {
  dragStart(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", e.currentTarget);
    this.props.handleDragStart()
  }

  render() {
    console.log(this.props.dragging)
    return (
      <div className="marker-entry">
        <div className="movable-marker" draggable="true" onDragStart={this.dragStart.bind(this)} dangerouslySetInnerHTML={{ __html: this.props.hex}} />
        <div className="marker-description">{this.props.title}</div>
        <div className="marker-direction">
          ← drag the emoji
        </div>
      </div>
    );
  }
}

export default EmojiTool;
