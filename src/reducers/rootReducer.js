
import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import authenticationReducer from './authenticationReducer';
import exportsReducer from './exportsReducer';

const rootReducer = combineReducers({
  menu: menuReducer,
  authentication: authenticationReducer,
  exports: exportsReducer
});

export default rootReducer;
