import React, { Component } from 'react'

class ShareMenu extends Component {
  onFacebookShare () {
    window.FB.ui({
      method: 'share',
      display: 'popup',
      href: window.location.href
    }, function (response) {})
  }

  render () {
    const url = window.location.href
    return (
      <div className='user-form'>
        <div className='close-form' onClick={this.props.closeMenu}>&#x2715;</div>
        <div className='share-option'>
          <a href={'https://twitter.com/intent/tweet?text=places%20I%27ve%20cried%20in%20public&url=' + url} target='_blank'>
            on twitter
          </a>
        </div>
        <div className='share-option'>
          <a onClick={this.onFacebookShare}>
            on facebook
          </a>
        </div>
        <div className='share-option'>
          {'or just copy '}
          <a href={url}>
            the current url
          </a>
        </div>
      </div>
    )
  }
}

export default ShareMenu
