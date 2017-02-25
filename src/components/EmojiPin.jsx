import React, { Component } from 'react'

class EmojiPin extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  handleDescriptionKey(e) {
    if (e.key === 'Enter') {
    }
  }

  onDelete() {
    this.props.onDelete(this.props.id, this.props.data)
  }

  render() {
    return (
      <img draggable="true" className="emoji-pin" src={"/images/"+this.props.data.name+".png"} alt={this.props.data.name} />
    );
  }
}

export default EmojiPin;
