import React, { Component } from 'react'

class Header extends Component {

  render() {
    return (
      <div id="header">
        <div id="app-title"><img src="/images/cry.png" /><h1>Crying in Public</h1><img src="/images/cry.png" /></div>
        <div id="app-description">
          An emotional map of New York City, made out of the important things that happen to us outside.
        </div>
        <div id="app-buttons-container">
          <button className="nav-button" id="save" onClick={this.props.onSave}>Save</button>
          <button className="nav-button" id="logout">Logout</button>
        </div>
      </div>
    )
  }
}

export default Header;
