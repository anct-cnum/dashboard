
import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import authenticationReducer from './authenticationReducer';
import exportsReducer from './exportsReducer';
import userReducer from './userReducer';
import structureReducer from './structureReducer';
import coordinateurReducer from './coordinateurReducer';

const rootReducer = combineReducers({
  menu: menuReducer,
  authentication: authenticationReducer,
  exports: exportsReducer,
  user: userReducer,
  structure: structureReducer,
  coordinateur: coordinateurReducer
});

export default rootReducer;
