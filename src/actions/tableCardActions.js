import { DEAL_TABLE_CARDS } from './types';
import { flop, turn, river } from '../utils';

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
