import React, { Component } from 'react'
import * as l from '../../../server/src/lib'
import _ from 'lodash'

class LoginForm extends Component {
  constructor(props){
    super(props)
    this.login = this.login.bind(this)
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  login(e){
    e.preventDefault()
    let fields = {email: this.state.email, password: this.state.password}
    let errors = l.validateFields(fields)
    if (_.isEmpty(errors)) {
      this.props.login(
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
        <input className='nav-button' type="submit" value='Sign In'/>
      </form>
    )
  }
}

export default LoginForm