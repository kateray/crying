import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import ShareMenu from './ShareMenu'

class Header extends Component {
  constructor(props) {
    super(props);
    this.onShareToggle = this.onShareToggle.bind(this)
    this.state = {
      shareMenuOpen: false
    }
  }

  componentWillMount() {
    if (this.props.user === '{{USER}}') {
      this.props.getUser()
    }
  }

  onShareToggle() {
    this.setState({shareMenuOpen: !this.state.shareMenuOpen})
  }

  render() {
    let saveNote;
    if (this.props.isSaving) {
      saveNote = 'Saving...';
    } else if (this.props.error) {
      saveNote = this.props.error;
    } else if (this.props.lastSave) {
      saveNote = 'saved ' + (new Date(this.props.lastSave)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
    return (
      <div id="header">
        <Link to="/">
          <div id="app-title">
            <img src="/images/cry.png" alt="&#x1f62d" />
            <h1>Crying in Public</h1>
            <img src="/images/cry.png" alt="&#x1f62d" />
          </div>
        </Link>
        <div id="app-description">
          An emotional map of New York City, made out of the important things that happen to us outside.
        </div>
        {this.props.user &&
          <div id="app-buttons-container">
          <Route exact path="/" render={() => (
            <Link className="nav-button" to={"/maps/"+this.props.user}>
              Your Map
            </Link>
          )}/>
          <Route path="/maps/:id" render={() => (
            <span>
              <span className="save-note">{saveNote}</span>
              <a className="nav-button" disabled={this.props.isSaving ? true : false} id="save" onClick={this.props.onSave}>save</a>
            </span>
          )}/>
            <a className="nav-button" id="logout" href={this.props.path+"logout"}>logout</a>
            <Route path="/maps/:id" render={() => (
              <span>
                <a className={this.state.shareMenuOpen ? "nav-button highlight" : "nav-button"} onClick={this.onShareToggle}>share</a>
                {this.state.shareMenuOpen &&
                  <ShareMenu />
                }
              </span>
            )}/>
          </div>
        }
        {!this.props.user &&
          <div id="app-buttons-container">
            <span>
              Create your own map ->
            </span>
            <a className="nav-button" id="login" href={this.props.path+"auth/facebook"}>
              <img className="fb-logo" src="/images/FB-f-Logo__white_29.png" alt="facebook" />
              login
            </a>
          </div>
        }
      </div>
    )
  }
}

export default Header;
