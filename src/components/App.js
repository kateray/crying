import React, { Component } from 'react';
import '../css/App.css';
import MapContainer from '../containers/MapContainer';
import TrashContainer from '../containers/TrashContainer';
import EmojiToolContainer from '../containers/EmojiToolContainer';
import emojis from '../emojis.json'

class App extends Component {

  render() {
    const markers = emojis.icons.map((e) =>
      <EmojiToolContainer key={e.name} name={e.name} hex={e.hex} title={e.title} />
    );
    return (
      <div>
        <div className="map-container">
          <MapContainer />
        </div>
        <div className="marker-container">
          {markers}
        </div>
        <TrashContainer />
      </div>
    );
  }
}

export default App;
