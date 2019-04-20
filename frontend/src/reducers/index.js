import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import restReducer from './restReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    rest: restReducer
});