import React, { Component } from 'react'

class Trash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    };
  }

  handleDragOver(e) {
    e.preventDefault();
    this.props.hideMagnifier();
    this.setState({ready: true})
  }

  handleDragLeave(e) {
    this.setState({ready: false})
  }

  handleDrop(e) {
    this.props.handleDrop();
  }

  render() {
    let classString = 'trash';
    if (this.props.dragging) {
      classString += ' show';
    }
    if (this.state.ready) {
      classString += ' hovered';
    }
    return (
      <div className={classString} dangerouslySetInnerHTML={{ __html: '&#x1F5D1'}} onDragOver={this.handleDragOver.bind(this)} onDragLeave={this.handleDragLeave.bind(this)} onDrop={this.handleDrop.bind(this)}/>
    )
  }
}

export default Trash;
