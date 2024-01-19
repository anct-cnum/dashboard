import { conventionService } from '../services/conventionService.js';

export const conventionActions = {
  getAll,
  getAllHistorique,
  get,
  updateAvenantAjoutPoste,
  updateAvenantRenduPoste,
};

function getAll(page, typeConvention, filtreParNomStructure, filterDepartement, filtreRegion, filtreAvisPrefet, ordreNom = 'dateDemande', ordre = 1) {
  return dispatch => {
    dispatch(request());

    conventionService.getAll(page, typeConvention, filtreParNomStructure, filterDepartement, filtreRegion, filtreAvisPrefet, ordreNom, ordre)
    .then(
      conventions => dispatch(success(conventions)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GETALL_CONVENTION_REQUEST' };
  }
  function success(conventions) {
    return { type: 'GETALL_CONVENTION_SUCCESS', conventions };
  }
  function failure(error) {
    return { type: 'GETALL_CONVENTION_FAILURE', error };
  }
}

// eslint-disable-next-line max-len
function getAllHistorique(page, typeConvention, dateDebut, dateFin, filtreParNomStructure, filterDepartement, filtreRegion, ordreNom = 'dateDemande', ordre = 1) {
  return dispatch => {
    dispatch(request());

    conventionService.getAllHistorique(page, typeConvention, dateDebut, dateFin, filtreParNomStructure, filterDepartement, filtreRegion, ordreNom, ordre)
    .then(
      conventions => dispatch(success(conventions)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GETALL_HISTORIQUE_CONVENTION_REQUEST' };
  }
  function success(conventions) {
    return { type: 'GETALL_HISTORIQUE_CONVENTION_SUCCESS', conventions };
  }
  function failure(error) {
    return { type: 'GETALL_HISTORIQUE_CONVENTION_FAILURE', error };
  }
}

function get(id) {
  return dispatch => {
    dispatch(request());

    conventionService.get(id)
    .then(
      convention => dispatch(success(convention)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_CONVENTION_REQUEST' };
  }
  function success(convention) {
    return { type: 'GET_CONVENTION_SUCCESS', convention };
  }
  function failure(error) {
    return { type: 'GET_CONVENTION_FAILURE', error };
  }
}

function updateAvenantAjoutPoste(id, statut, nbDePosteAccorder = 0, nbDePosteCoselec = 0) {
  return dispatch => {
    dispatch(request());

    conventionService.updateAvenantAjoutPoste(id, statut, nbDePosteAccorder, nbDePosteCoselec)
    .then(
      response => dispatch(success(response)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_AVENANT_AJOUT_POSTE_REQUEST' };
  }
  function success(response) {
    return { type: 'UPDATE_AVENANT_AJOUT_POSTE_SUCCESS', response };
  }
  function failure(error) {
    return { type: 'UPDATE_AVENANT_AJOUT_POSTE_FAILURE', error };
  }
}

function updateAvenantRenduPoste(id, nbDePosteRendu, nbDePosteCoselec) {
  return dispatch => {
    dispatch(request());

    conventionService.updateAvenantRenduPoste(id, nbDePosteRendu, nbDePosteCoselec)
    .then(
      response => dispatch(success(response)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_AVENANT_RENDU_POSTE_REQUEST' };
  }
  function success(response) {
    return { type: 'UPDATE_AVENANT_RENDU_POSTE_SUCCESS', response };
  }
  function failure(error) {
    return { type: 'UPDATE_AVENANT_RENDU_POSTE_FAILURE', error };
  }
}


