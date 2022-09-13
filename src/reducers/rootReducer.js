
import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import authenticationReducer from './authenticationReducer';
import exportsReducer from './exportsReducer';
import userReducer from './userReducer';
import conseillersReducer from './conseillersReducer';
import conseillerReducer from './conseillerReducer';
import searchReducer from './searchReducer';
import statsReducer from './statsReducer';

const rootReducer = combineReducers({
  menu: menuReducer,
  authentication: authenticationReducer,
  exports: exportsReducer,
  user: userReducer,
  conseillers: conseillersReducer,
  conseiller: conseillerReducer,
  stats: statsReducer,
  search: searchReducer
});

export default rootReducer;
