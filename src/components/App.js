import React, { Component } from 'react';
import '../css/App.css';
import VisibleMap from '../containers/VisibleMap';
import MovableMarker from './MovableMarker';

const emojis = [
  {name: 'cry', hex: '&#x1f62d', description: "Cried in public"},
  {name: 'dancer', hex: '&#x1f483', description: "Danced or sang outside"},
  {name: 'fire', hex: '&#x1f525', description: "Got fired"},
  {name: 'broken', hex: '&#x1f494', description: "Broke up"},
  {name: 'vomit', hex: '&#x1f922', description: "Vomited"},
  {name: 'pee', hex: '&#x1F49B', description: "Peed"},
  {name: 'leave', hex: '&#x1f6ab', description: "Kicked out of a bar"},
  {name: 'love', hex: '&#x1f498', description: "Fell in love"},
  {name: 'sex', hex: '&#x1f346', description: "Sexed"},
  {name: 'socialism', hex: '&#x262d', description: "Adopted a new ideology"},
  {name: 'lollipop', hex: '&#x1f36d', description: "Peak of a trip or high"},
  {name: 'protest', hex: '&#x270a', description: "Protest or march"},
  {name: 'crash', hex: '&#x1f4a5', description: "Crashed or crashed into"},
  {name: 'police', hex: '&#x1f46e', description: "Altercation with police"}
]

class App extends Component {

  render() {
    const markers = emojis.map((e) =>
      <MovableMarker key={e.name} hex={e.hex} description={e.description} />
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
