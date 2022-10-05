import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import authenticationReducer from './authenticationReducer';
import statistiquesReducer from './statistiquesReducer';
import filtresEtTrisReducer from './filtresEtTrisReducer';
import filtresCandidatures from './filtresCandidaturesReducer';
import paginationReducer from './paginationReducer';
import structuresReducer from './structuresReducer';
import exportsReducer from './exportsReducer';
import alerteEtSpinnerReducer from './alerteEtSpinnerReducer';
import userReducer from './userReducer';
import conseillersReducer from './conseillersReducer';
import conseillerReducer from './conseillerReducer';
import searchReducer from './searchReducer';
import statsReducer from './statsReducer';
import structureReducer from './structureReducer';

const rootReducer = combineReducers({
  menu: menuReducer,
  authentication: authenticationReducer,
  statistiques: statistiquesReducer,
  filtresEtTris: filtresEtTrisReducer,
  filtresCandidatures: filtresCandidatures,
  pagination: paginationReducer,
  structures: structuresReducer,
  exports: exportsReducer,
  alerteEtSpinner: alerteEtSpinnerReducer,
  user: userReducer,
  conseillers: conseillersReducer,
  conseiller: conseillerReducer,
  stats: statsReducer,
  search: searchReducer,
  structure: structureReducer
});

export default rootReducer;
