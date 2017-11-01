import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ShareMenu from './ShareMenu'
import { LoginForm } from './LoginForm'
import { Settings } from './Settings'

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {menuOpen: false}
  }

  toggleMenu = (menuName) => {
    this.props.receiveSaveConfirmation({user: false})
    this.props.receiveError({user: {}})
    if (this.state.menuOpen === menuName) {
      this.setState({menuOpen: false})
    } else {
      this.setState({menuOpen: menuName})
    }
  }

  closeMenu = () => {
    this.setState({menuOpen: false})
  }

  renderUserButtons = () => {
    let saveNote;
    if (this.props.isSaving) {
      saveNote = 'Saving...';
    } else if (this.props.errors.pin) {
      saveNote = this.props.errors.pin;
    } else if (this.props.lastSave) {
      saveNote = 'saved ' + (new Date(this.props.lastSave)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
    return (
      <span>
        {!this.props.showSave &&
          <a className="nav-button" href={"/maps/"+this.props.user.uid}>
            your map
          </a>
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
              <a className={this.state.menuOpen === 'share' ? "nav-button highlight" : "nav-button"}
                onClick={() => this.toggleMenu('share')}>
                share
              </a>
            </span>
          )}/>
        }
        <a className={this.state.menuOpen === 'settings' ? 'nav-button highlight' : 'nav-button'}
          id="login"
          onClick={() => this.toggleMenu('settings')}>
          settings
        </a>
        <a className="nav-button" id="logout" href='/logout'>logout</a>
      </span>
    )
  }

  renderNoUserButtons() {
    return (
      <span>
        <span>
          Create your own map ->
        </span>
        <a className={this.state.menuOpen === 'signup' ? 'nav-button highlight' : 'nav-button'}
          id="signup"
          onClick={() => this.toggleMenu('signup')}>
          Sign up
        </a>
        <a className={this.state.menuOpen === 'login' ? 'nav-button highlight' : 'nav-button'}
          id="login"
          onClick={() => this.toggleMenu('login')}>
          Login
        </a>
      </span>
    )
  }

  render() {
    let openMenu
    if (this.state.menuOpen === 'share') {
      openMenu = <ShareMenu closeMenu={this.closeMenu}/>
    } else if (this.state.menuOpen === 'settings') {
      openMenu =  <Settings
                  closeMenu={this.closeMenu}
                  showSaveConfirmation={this.props.showSaveConfirmation.user}
                  errors={this.props.errors.user}
                  user={this.props.user}
                  updateUser={this.props.updateUser} />
    } else if (this.state.menuOpen === 'login' || this.state.menuOpen === 'signup') {
      openMenu = <LoginForm mode={this.state.menuOpen} login={this.props.login} errors={this.props.errors.user} />
    }
    return (
      <div id="header">
        <a href="/">
          <div id="app-title">
            <img src="/images/cry.png" alt="&#x1f62d" />
            <h1>Crying in Public</h1>
            <img src="/images/cry.png" alt="&#x1f62d" />
          </div>
        </a>
        <div id="app-description">
          An emotional map of New York City, made out of the important things that happen to us outside. Project by <a href="https://twitter.com/kraykray" target="_blank">kraykray</a>
        </div>
        <div id="app-buttons-container">
          {this.props.user &&
            this.renderUserButtons()
          }
          {!this.props.user &&
            this.renderNoUserButtons()
          }
          {openMenu}
        </div>
      </div>
    )
  }
}
