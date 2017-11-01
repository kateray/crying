import React, { Component } from 'react'
import * as l from '../../../lib'
import _ from 'lodash'

require('../css/Login.scss')

export class LoginForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      errors: {}
    }
  }

  login = (e) => {
    e.preventDefault()
    let fields = {email: this.state.email, password: this.state.password, passwordConfirm: this.state.passwordConfirm}
    let errors = l.validateFields(fields, this.props.mode)
    if (_.isEmpty(errors)) {
      this.props.login(
        this.props.mode,
        fields,
        this.props.fromHomepage
      )
    } else {
      this.setState({errors: errors})
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }

  render(){
    return(
      <form className='user-form' onSubmit={this.login}>
        {this.state.errors.general &&
          <div className="form-error">{this.state.errors.general}</div>
        }
        <span>
          {this.state.errors.email &&
            <div className="form-error">{this.state.errors.email}</div>
          }
          <input className={this.state.errors.email ? 'error' : ''} type="text" value={this.state.email} onChange={(e) => this.setState({email: e.target.value.trim()})} placeholder="email" />
        </span>
        {this.state.errors.password &&
          <div className="form-error">{this.state.errors.password}</div>
        }
        <input className={this.state.errors.password ? 'error' : ''} type="password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value.trim()})} placeholder="password" />
        {this.props.mode === 'signup' &&
          <input className={this.state.errors.password ? 'error' : ''} type="password" value={this.state.passwordConfirm} onChange={(e) => this.setState({passwordConfirm: e.target.value.trim()})} placeholder="password confirmation" />
        }
        <input className='nav-button' type="submit" value='Submit'/>
      </form>
    )
  }
}
