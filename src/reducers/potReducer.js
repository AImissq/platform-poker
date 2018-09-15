import { ADD_TO_MAIN_POT, ADD_TO_SIDEPOT_ONE, ADD_TO_SIDEPOT_TWO, ADD_TO_SIDEPOT_THREE  } from '../actions/types';

const initialState = {
	main: {
		amount: 0,
		players: [],
		full: false
	},
	sidepotOne: {
		amount: 0,
		players: [],
		full: false
	},
	sidepotTwo: {
		amount: 0,
		players: [],
		full: false
	},
	sidepotThree: {
		amount: 0,
		players: [],
		full: false
	}
};

export default function(state = initialState, action) {
	switch(action.type) {
	case ADD_TO_MAIN_POT:
		return {
			...state,
			main: {...action.payload}
		};
	case ADD_TO_SIDEPOT_ONE:
		return {
			...state,
			sidepotOne: {...action.payload}
		};
	case ADD_TO_SIDEPOT_TWO:
		return {
			...state,
			sidepotTwo: {...action.payload}
		};
	case ADD_TO_SIDEPOT_THREE:
		return {
			...state,
			sidepotThree: {...action.payload}
		};
	default:
		return state;
	}
}
