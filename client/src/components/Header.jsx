import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

class Header extends Component {

  componentDidMount() {
    this.props.getUser()
  }

  render() {
    return (
      <div id="header">
        <Link to="/">
          <div id="app-title">
            <img src="/images/cry.png" />
            <h1>Crying in Public</h1>
            <img src="/images/cry.png" />
          </div>
        </Link>
        <div id="app-description">
          An emotional map of New York City, made out of the important things that happen to us outside.
        </div>
        {this.props.user &&
          <div id="app-buttons-container">
          <Route exact path="/" render={() => (
            <Link className="nav-button" to="/map">
              Your Map
            </Link>
          )}/>
          <Route path="/map" render={() => (
            <a className={this.props.isSaving ? "nav-button saving" : "nav-button"} id="save" onClick={this.props.onSave}>{this.props.isSaving ? "Saving..." : "Save"}</a>
          )}/>
            <a className="nav-button" id="logout" href="http://localhost:3001/logout">Logout</a>
          </div>
        }
        {!this.props.user &&
          <div id="app-buttons-container">
            <a className="nav-button" id="login" href="http://localhost:3001/auth/facebook">Login</a>
          </div>
        }
      </div>
    )
  }
}

export default Header;
