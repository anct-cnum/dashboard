import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import authenticationReducer from './authenticationReducer';
import statistiquesReducer from './statistiquesReducer';
import filtresEtTrisReducer from './filtresEtTrisReducer';
import filtresCandidatures from './filtresCandidaturesReducer';
import paginationReducer from './paginationReducer';
import exportsReducer from './exportsReducer';
import invitationsReducer from './invitationsReducer';
import alerteEtSpinnerReducer from './alerteEtSpinnerReducer';
import userReducer from './userReducer';
import conseillerReducer from './conseillerReducer';
import statsReducer from './statsReducer';
import structureReducer from './structureReducer';
import gestionnaireReducer from './gestionnaireReducer';
import reconventionnementReducer from './reconventionnementReducer';
import filtresConseillers from './filtresConseillersReducer';
import filtresStructuresReducer from './filtresStructuresReducer';
import filtresGestionnairesReducer from './filtresGestionnairesReducer';
import miseEnRelationReducer from './miseEnRelationReducer';
import conventionReducer from './conventionReducer';
import filtresHistoriqueConventionReducer from './filtresHistoriqueConventionReducer';

const rootReducer = combineReducers({
  menu: menuReducer,
  authentication: authenticationReducer,
  statistiques: statistiquesReducer,
  filtresEtTris: filtresEtTrisReducer,
  filtresCandidatures: filtresCandidatures,
  filtresConseillers: filtresConseillers,
  pagination: paginationReducer,
  exports: exportsReducer,
  alerteEtSpinner: alerteEtSpinnerReducer,
  user: userReducer,
  conseiller: conseillerReducer,
  misesEnRelation: miseEnRelationReducer,
  stats: statsReducer,
  structure: structureReducer,
  gestionnaire: gestionnaireReducer,
  reconventionnement: reconventionnementReducer,
  convention: conventionReducer,
  invitations: invitationsReducer,
  filtresStructures: filtresStructuresReducer,
  filtresGestionnaires: filtresGestionnairesReducer,
  filtresHistoriqueConvention: filtresHistoriqueConventionReducer,
});

export default rootReducer;
