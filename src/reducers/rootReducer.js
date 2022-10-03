
import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import authenticationReducer from './authenticationReducer';
import exportsReducer from './exportsReducer';
import userReducer from './userReducer';
import structureReducer from './structureReducer';
import conseillerReducer from './conseillerReducer';

const rootReducer = combineReducers({
  menu: menuReducer,
  authentication: authenticationReducer,
  exports: exportsReducer,
  user: userReducer,
  structure: structureReducer,
  conseiller: conseillerReducer
});

export default rootReducer;
