import React, { Component } from "react";
import { Provider } from "react-redux";

import "./App.css";
import PlayArea from './components/game/playArea/PlayArea.js';

import store from './store';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<div className="App">
					<PlayArea />
				</div>
			</Provider>
		);
	}
}

export default App;
