import { ADD_TO_POT } from './types';

export const addToPot = (whoAmI, amountToAdd, potInfo) => dispatch => {
	let allDone = false;
	for (let i = 0; i < potInfo.length; i++) {
		if(!potInfo[i].full && !allDone) {
			// Adds the player to the group, if not already present
			if(!potInfo[i].players.includes(whoAmI)) {
				potInfo[i].players.push(whoAmI);
			}

			// Update the pot total
			potInfo[i].total += amountToAdd;

			// Stop the for loop
			allDone = true;
		}		
		if(amountToAdd > 0) {
			potInfo[i].playerCanCheck = false;
		}
	}

	dispatch({
		type: ADD_TO_POT,
		payload: {
			loading: false,
			details: potInfo
		}
	});
};

// export const addToMainPot = (playerInfo, amountOfBet, potInfo) => dispatch => {
// 	let foundPlayer = false;
// 	for (let i = 0; i < potInfo.main.players.length; i++) {
// 		if (playerInfo.playerNumber === potInfo.main.players[i].playerInfo.playerNumber) {
// 			// Calculate how the bet compares with previous bets and update the total
// 			// const differenceBetweenAmounts = 

// 			// Update the player's total bet
// 			foundPlayer = true;
// 			potInfo.main.players[i].totalBet += amountOfBet;
// 		}
// 	}

// 	if(!foundPlayer) {
// 		potInfo.main.players.push({
// 			playerInfo,
// 			thisSingleBet: amountOfBet,
// 			thisRoundBet: amountOfBet,
// 			totalBet: amountOfBet,
// 			allIn: false
// 		});
// 	}

// 	// potInfo.main.total = potInfo.main.players.reduce({}, 0);

// 	potInfo.main.total += amountOfBet;	

// 	dispatch({
// 		type: ADD_TO_POT,
// 		payload: {...potInfo.main}
// 	});
// };
