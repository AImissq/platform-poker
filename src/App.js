import React, { Component } from "react";
import { Provider } from "react-redux";

import "./App.css";
import PlayerContainer from "./components/game/player2/Container/PlayerContainer";

import store from './store';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <PlayerContainer 
                        name='My Name'
						playerNumber={3}
						type='me' // Possible values are 'me', 'human', or 'npc'
						avatar={{}}
                    />
                </div>
            </Provider>
        );
    }
}

export default App;
