import { combineReducers } from 'redux';
import tableCardReducer from './tableCardReducer';
import tableCardStatusReducer from './tableCardStatusReducer';
import createPlayersReducer from './playersReducer';
import potReducer from './potReducer';

export default combineReducers({
	tableCards: tableCardReducer,
	tableCardStatus: tableCardStatusReducer,
	players: createPlayersReducer,
	pot: potReducer
});
