import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class EmojiPin extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.onClick = this.onClick.bind(this)
  }

  handleDescriptionKey(e) {
    if (e.key === 'Enter') {
    }
  }

  onDelete() {
    this.props.onDelete(this.props.id, this.props.data)
  }

  onClick() {
    this.props.selectPin(this.props.id)
  }

  render() {
    return (
      <img onClick={this.onClick} draggable="true" className="emoji-pin" src={"/images/"+this.props.data.name+".png"} alt={this.props.data.name} />
    );
  }
}

export default EmojiPin;
