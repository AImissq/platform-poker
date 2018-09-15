import { ADD_TO_MAIN_POT, ADD_TO_SIDEPOT_ONE, ADD_TO_SIDEPOT_TWO, ADD_TO_SIDEPOT_THREE } from './types';

export const addToMainPot = (playerInfo, amountOfBet, potInfo) => dispatch => {
	let foundPlayer = false;
	for (let i = 0; i < potInfo.main.players.length; i++) {
		if (playerInfo.playerNumber === potInfo.main.players[i].playerInfo.playerNumber) {
			foundPlayer = true;
			potInfo.main.players[i].totalBet += amountOfBet;
		}
	}

	if(!foundPlayer) {
		potInfo.main.players.push({
			playerInfo,
			totalBet: amountOfBet,
			allIn: false
		});
	}

	potInfo.main.total += amountOfBet;	

	dispatch({
		type: ADD_TO_MAIN_POT,
		payload: {...potInfo.main}
	});
};

export const addToSidepotOne = (playerInfo, amountOfBet, potInfo) => dispatch => {
	let foundPlayer = false;
	for (let i = 0; i < potInfo.sidepotOne.players.length; i++) {
		if (playerInfo.playerNumber === potInfo.sidepotOne.players[i].playerInfo.playerNumber) {
			foundPlayer = true;
			potInfo.sidepotOne.players[i].totalBet += amountOfBet;
		}
	}

	if(!foundPlayer) {
		potInfo.sidepotOne.players.push({
			playerInfo,
			totalBet: amountOfBet,
			allIn: false
		});
	}

	potInfo.sidepotOne.total += amountOfBet;	

	dispatch({
		type: ADD_TO_SIDEPOT_ONE,
		payload: {...potInfo.sidepotOne}
	});
};

export const addToSidepotTwo = (playerInfo, amountOfBet, potInfo) => dispatch => {
	let foundPlayer = false;
	for (let i = 0; i < potInfo.sidepotTwo.players.length; i++) {
		if (playerInfo.playerNumber === potInfo.sidepotTwo.players[i].playerInfo.playerNumber) {
			foundPlayer = true;
			potInfo.sidepotTwo.players[i].totalBet += amountOfBet;
		}
	}

	if(!foundPlayer) {
		potInfo.sidepotTwo.players.push({
			playerInfo,
			totalBet: amountOfBet,
			allIn: false
		});
	}

	potInfo.sidepotTwo.total += amountOfBet;	

	dispatch({
		type: ADD_TO_SIDEPOT_TWO,
		payload: {...potInfo.sidepotTwo}
	});
};

export const addToSidepotThree = (playerInfo, amountOfBet, potInfo) => dispatch => {
	let foundPlayer = false;
	for (let i = 0; i < potInfo.sidepotThree.players.length; i++) {
		if (playerInfo.playerNumber === potInfo.sidepotThree.players[i].playerInfo.playerNumber) {
			foundPlayer = true;
			potInfo.sidepotThree.players[i].totalBet += amountOfBet;
		}
	}

	if(!foundPlayer) {
		potInfo.sidepotThree.players.push({
			playerInfo,
			totalBet: amountOfBet,
			allIn: false
		});
	}

	potInfo.sidepotThree.total += amountOfBet;	

	dispatch({
		type: ADD_TO_SIDEPOT_THREE,
		payload: {...potInfo.sidepotThree}
	});
};

