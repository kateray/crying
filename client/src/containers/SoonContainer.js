import React, { PureComponent } from 'react'
require('../css/soon.scss')

export class SoonContainer extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      email: ''
    }
  }

  componentDidMount () {
    let e = document.createElement('script');
    e.type = 'text/javascript';
    e.async = true;
    e.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://btn.createsend1.com/js/sb.min.js?v=3';
    e.className = 'createsend-script';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(e, s);
  }

  render () {
    return (
      <div id="soon-container">
        <div className="first-text">Coming Soon!</div>
        <div className="second-text">
          Cry in a City Near YOU
        </div>
        <div className="createsend-button" data-listid="j/50/3BC/724/5A236BEBE04A9E40">
        </div>
      </div>
    )
  }
}
