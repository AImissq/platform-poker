import React, { Component } from 'react';
import './App.css';
import PlayerContainer from './components/game/player/Container/PlayerContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PlayerContainer />
      </div>
    );
  }
}

export default App;
