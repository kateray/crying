import React, { Component } from 'react'
import * as l from '../../../lib'
import _ from 'lodash'

export class Settings extends Component {
  constructor(props){
    super(props)
    this.updateUser = this.updateUser.bind(this)
    this.state = {
      email: this.props.user.email,
      password: '',
      passwordConfirm: '',
      errors: {}
    }
  }

  updateUser(e){
    e.preventDefault()
    let fields = {email: this.state.email, password: this.state.password, passwordConfirm: this.state.passwordConfirm}
    let errors = l.validateFields(fields, 'update')
    this.setState({password: '', passwordConfirm: ''})
    if (_.isEmpty(errors)) {
      this.props.updateUser(fields, this.props.user.uid)
    } else {
      this.setState({errors: errors})
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
    if (nextProps.showSaveConfirmation) {
      this.setState({errors: {}})
    }
  }

  render() {
    return (
      <form className='user-form' onSubmit={this.updateUser}>
        <div className='close-form' onClick={this.props.closeMenu}>&#x2715;</div>
        {this.state.errors.general &&
          <div className="form-error">{this.state.errors.general}</div>
        }
        <label htmlFor="email">Email</label>
        {this.state.errors.email &&
          <div className="form-error">{this.state.errors.email}</div>
        }
        <input className={this.state.errors.email ? 'error' : ''} type="text" value={this.state.email} onChange={(e) => this.setState({email: e.target.value.trim()})} placeholder="email" />
        <label htmlFor="password">New Password</label>
        {this.state.errors.password &&
          <div className="form-error">{this.state.errors.password}</div>
        }
        <input className={this.state.errors.password ? 'error' : ''} type="password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value.trim()})} placeholder="password" />
        <label htmlFor="password-confirm">Confirm New Password</label>
        <input className={this.state.errors.password ? 'error' : ''} type="password" value={this.state.passwordConfirm} onChange={(e) => this.setState({passwordConfirm: e.target.value.trim()})} placeholder="confirm password" />
        {this.props.showSaveConfirmation &&
          <div className='save-confirmation visible'>Changes saved!</div>
        }
        <input className="nav-button" type="submit" value="Save"/>
      </form>
    )
  }
}
