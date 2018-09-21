import { RESET_TABLE_CARD_STATUS_TO_DEFAULT, SHOW_FLOP_CARDS, SHOW_TURN_CARDS, SHOW_RIVER_CARD } from './types';

export const resetTableCardStatusToDefault = () => dispatch => {
	dispatch({
		type: RESET_TABLE_CARD_STATUS_TO_DEFAULT,
		payload: {
			flopIsVisible: false,
			turnIsVisible: false,
			riverIsVisible: false
		}
	});
};

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
