import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import ShareMenu from './ShareMenu'
import LoginForm from './LoginForm'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareMenuOpen: false,
      loginMenuOpen: false
    }
  }

  _renderUserButtons() {
    let saveNote;
    if (this.props.isSaving) {
      saveNote = 'Saving...';
    } else if (this.props.errors.pin) {
      saveNote = this.props.errors.pin;
    } else if (this.props.lastSave) {
      saveNote = 'saved ' + (new Date(this.props.lastSave)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
    return (
      <div id="app-buttons-container">
        {!this.props.showSave &&
          <Link className="nav-button" to={"/maps/"+this.props.user}>
            your map
          </Link>
        }
        {this.props.showSave &&
          <Route path="/maps/:id" render={() => (
            <span>
              <span className="save-note">{saveNote}</span>
              <a className="nav-button"
                disabled={this.props.isSaving ? true : false}
                id="save" onClick={this.props.onSave}>
                save
              </a>
              <a className={this.state.shareMenuOpen ? "nav-button highlight" : "nav-button"}
                onClick={() => this.setState({shareMenuOpen: !this.state.shareMenuOpen})}>
                share
              </a>
              {this.state.shareMenuOpen &&
                <ShareMenu />
              }
            </span>
          )}/>
        }
        <a className="nav-button" id="logout" href='/logout'>logout</a>
      </div>
    )
  }

  _renderNoUserButtons() {
    return (
      <div id="app-buttons-container">
        {this.state.loginMenuOpen &&
          <LoginForm login={this.props.login} errors={this.props.errors.user} />
        }
        <span>
          Create your own map ->
        </span>
        <a className="nav-button" id="login" onClick={() => this.setState({loginMenuOpen: !this.state.loginMenuOpen})}>
          login
        </a>
      </div>
    )
  }

  render() {
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
          this._renderUserButtons()
        }
        {!this.props.user &&
          this._renderNoUserButtons()
        }
      </div>
    )
  }
}

export default Header;
