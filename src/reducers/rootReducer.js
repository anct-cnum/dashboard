
import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import authenticationReducer from './authenticationReducer';
import statistiquesReducer from './statistiquesReducer';

const rootReducer = combineReducers({
  menu: menuReducer,
  authentication: authenticationReducer,
  statistiques: statistiquesReducer
});

export default rootReducer;
