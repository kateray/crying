import React, { Component } from 'react';
import '../css/App.css';
import VisibleMap from '../containers/VisibleMap';
import MovableMarker from './MovableMarker';

const emojis = [
  {name: 'dancer', hex: '&#x1f483'},
  {name: 'fire', hex: '&#x1f525'},
  {name: 'broken', hex: '&#x1f494'},
  {name: 'poo', hex: '&#x1f4a9'},
  {name: 'pee', hex: '&#x1F49B'},
  {name: 'leave', hex: '&#x1f6ab'},
  {name: 'protest', hex: '&#x270a'},
  {name: 'cry', hex: '&#x1f62d'},
  {name: 'socialism', hex: '&#x262d'},
  {name: 'lollipop', hex: '&#x1f36d'},
  {name: 'kiss', hex: '&#x1f48b'},
  {name: 'crash', hex: '&#x1f4a5'},
  {name: 'police', hex: '&#x1f46e'}
]

class App extends Component {

  render() {
    const markers = emojis.map((e) =>
      <MovableMarker key={e.name} hex={e.hex} />
    );
    return (
      <div>
        <div className="map-container">
          <VisibleMap />
        </div>
        <div className="marker-container">
          {markers}
        </div>
      </div>
    );
  }
}

export default App;
