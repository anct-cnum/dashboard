import { conventionService } from '../services/conventionService.js';

export const conventionActions = {
  getAll,
  getAllHistorique,
  get,
  updateAvenantAjoutPoste,
  reset
};

function getAll(page, typeConvention) {
  return dispatch => {
    dispatch(request());

    conventionService.getAll(page, typeConvention)
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

function getAllHistorique(page, typeConvention, dateDebut, dateFin) {
  return dispatch => {
    dispatch(request());

    conventionService.getAllHistorique(page, typeConvention, dateDebut, dateFin)
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

function reset() {
  return { type: 'RESET_CONVENTION' };
}
