import React, { Component } from 'react'

class EmojiTool extends Component {
  dragStart(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", e.currentTarget);
    this.props.onDragStart(this.props.data)
  }

  render() {
    return (
      <div className="marker-entry">
        <div className="movable-marker" draggable="true" onDragStart={this.dragStart.bind(this)} dangerouslySetInnerHTML={{ __html: this.props.data.hex}} />
        <div className="marker-description">{this.props.data.title}</div>
        <div className="marker-direction">
          ← drag the emoji
        </div>
      </div>
    );
  }
}

export default EmojiTool;
