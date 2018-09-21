import { RESET_TABLE_CARDS_TO_DEFAULT, DEAL_TABLE_CARDS } from './types';
import { flop, turn, river } from '../utils';

export const resetTableCardsToDefault = () => dispatch => {
	dispatch({
		type: RESET_TABLE_CARDS_TO_DEFAULT,
		payload: {
			flop: [],
			turn: [],
			river: []
		}
	});
};

export const dealTableCards = deck => dispatch => {
	const tableCards = {
		flop: flop(deck),
		turn: turn(deck),
		river: river(deck)
	};
	dispatch({
		type: DEAL_TABLE_CARDS,
		payload: {...tableCards}
	});
};
