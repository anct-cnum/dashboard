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
import structureReducer from './structureReducer';
import gestionnaireReducer from './gestionnaireReducer';
import reconventionnementReducer from './reconventionnementReducer';
import filtresConseillers from './filtresConseillersReducer';
import filtresStructuresReducer from './filtresStructuresReducer';
import filtresGestionnairesReducer from './filtresGestionnairesReducer';
import miseEnRelationReducer from './miseEnRelationReducer';
import conventionReducer from './conventionReducer';
import contratReducer from './contratReducer';
import datePickerReducer from './datePickerReducer';
import filtresConventionsReducer from './filtresConventionsReducer';
import filtresDemandesCoordinateurReducer from './filtresDemandesCoordinateurReducer';
import coordinateurReducer from './coordinateurReducer';

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
  structure: structureReducer,
  gestionnaire: gestionnaireReducer,
  reconventionnement: reconventionnementReducer,
  convention: conventionReducer,
  contrat: contratReducer,
  invitations: invitationsReducer,
  filtresStructures: filtresStructuresReducer,
  filtresGestionnaires: filtresGestionnairesReducer,
  datePicker: datePickerReducer,
  filtresConventions: filtresConventionsReducer,
  filtresDemandesCoordinateur: filtresDemandesCoordinateurReducer,
  coordinateur: coordinateurReducer
});

export default rootReducer;
