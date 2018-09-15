import { ADD_TO_MAIN_POT, ADD_TO_SIDEPOT_ONE, ADD_TO_SIDEPOT_TWO, ADD_TO_SIDEPOT_THREE } from './types';

export const addToMainPot = (playerInfo, amount, currentPot) => dispatch => {
	let foundPlayer = false;
	for (let i = 0; i < currentPot.players.length; i++) {
		if(playerInfo.playerNumber === currentPot.players[i].playerInfo.playerNumber) {
			currentPot.players[i].amount = currentPot.players[i].amount + amount;
			foundPlayer = true;
		}
	}

	if(!foundPlayer) {
		currentPot.players.push({
			playerInfo,
			amount,
			allIn: false
		});
	}

	dispatch({
		type: ADD_TO_MAIN_POT,
		payload: {...currentPot}
	});
};

export const addToSidepotOne = (playerInfo, amount, currentPot) => dispatch => {
	let foundPlayer = false;
	for (let i = 0; i < currentPot.players.length; i++) {
		if(playerInfo.playerNumber === currentPot.players[i].playerInfo.playerNumber) {
			currentPot.players[i].amount = currentPot.players[i].amount + amount;
			foundPlayer = true;
		}
	}

	if(!foundPlayer) {
		currentPot.players.push({
			playerInfo,
			amount,
			allIn: false
		});
	}

	dispatch({
		type: ADD_TO_SIDEPOT_ONE,
		payload: {...currentPot}
	});
};

export const addToSidepotTwo = (playerInfo, amount, currentPot) => dispatch => {
	let foundPlayer = false;
	for (let i = 0; i < currentPot.players.length; i++) {
		if(playerInfo.playerNumber === currentPot.players[i].playerInfo.playerNumber) {
			currentPot.players[i].amount = currentPot.players[i].amount + amount;
			foundPlayer = true;
		}
	}

	if(!foundPlayer) {
		currentPot.players.push({
			playerInfo,
			amount,
			allIn: false
		});
	}

	dispatch({
		type: ADD_TO_SIDEPOT_TWO,
		payload: {...currentPot}
	});
};

export const addToSidepotThree = (playerInfo, amount, currentPot) => dispatch => {
	let foundPlayer = false;
	for (let i = 0; i < currentPot.players.length; i++) {
		if(playerInfo.playerNumber === currentPot.players[i].playerInfo.playerNumber) {
			currentPot.players[i].amount = currentPot.players[i].amount + amount;
			foundPlayer = true;
		}
	}

	if(!foundPlayer) {
		currentPot.players.push({
			playerInfo,
			amount,
			allIn: false
		});
	}

	dispatch({
		type: ADD_TO_SIDEPOT_THREE,
		payload: {...currentPot}
	});
};

