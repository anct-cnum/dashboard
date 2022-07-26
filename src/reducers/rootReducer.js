
import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import authenticationReducer from './authenticationReducer';

const rootReducer = combineReducers({
  menu: menuReducer,
  authentication: authenticationReducer
});

export default rootReducer;
