import { combineReducers } from 'redux';
import tableCardReducer from './tableCardReducer';
import tableCardStatusReducer from './tableCardStatusReducer';

export default combineReducers({
	tableCards: tableCardReducer,
	tableCardStatus: tableCardStatusReducer
});
