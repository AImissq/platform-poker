import { SHOW_FLOP_CARDS, SHOW_TURN_CARDS, SHOW_RIVER_CARD } from './types';

export const showFlopCards = () => dispatch => {
	dispatch({
		type: SHOW_FLOP_CARDS,
		payload: true
	});
};

export const showTurnCard = () => dispatch => {
	dispatch({
		type: SHOW_TURN_CARDS,
		payload: true
	});
};

export const showRiverCard = () => dispatch => {
	dispatch({
		type: SHOW_RIVER_CARD,
		payload: true
	});
};
