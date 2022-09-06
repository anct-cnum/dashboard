
import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import authenticationReducer from './authenticationReducer';
import statistiquesReducer from './statistiquesReducer';
import filtresEtTrisReducer from './filtresEtTrisReducer';
import paginationReducer from './paginationReducer';
import structuresReducer from './structuresReducer';
import exportsReducer from './exportsReducer';

const rootReducer = combineReducers({
  menu: menuReducer,
  authentication: authenticationReducer,
  statistiques: statistiquesReducer,
  filtresEtTris: filtresEtTrisReducer,
  pagination: paginationReducer,
  structures: structuresReducer,
  exports: exportsReducer
});

export default rootReducer;
