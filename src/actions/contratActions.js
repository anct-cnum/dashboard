import { contratService } from '../services/contratService.js';

export const contratActions = {
  getAll,
  getAllHistorique,
  get,
  reset
};

function getAll(page, typeContrat) {
  return dispatch => {
    dispatch(request());

    contratService.getAll(page, typeContrat)
    .then(
      contrats => dispatch(success(contrats)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GETALL_CONTRAT_REQUEST' };
  }
  function success(contrats) {
    return { type: 'GETALL_CONTRAT_SUCCESS', contrats };
  }
  function failure(error) {
    return { type: 'GETALL_CONTRAT_FAILURE', error };
  }
}

function getAllHistorique(page, typeContrat, dateDebut, dateFin) {
  return dispatch => {
    dispatch(request());

    contratService.getAllHistorique(page, typeContrat, dateDebut, dateFin)
    .then(
      contrats => dispatch(success(contrats)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GETALL_HISTORIQUE_CONTRAT_REQUEST' };
  }
  function success(contrats) {
    return { type: 'GETALL_HISTORIQUE_CONTRAT_SUCCESS', contrats };
  }
  function failure(error) {
    return { type: 'GETALL_HISTORIQUE_CONTRAT_FAILURE', error };
  }
}

function get(id) {
  return dispatch => {
    dispatch(request());

    contratService.get(id)
    .then(
      contrat => dispatch(success(contrat)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_CONTRAT_REQUEST' };
  }
  function success(contrat) {
    return { type: 'GET_CONTRAT_SUCCESS', contrat };
  }
  function failure(error) {
    return { type: 'GET_CONTRAT_FAILURE', error };
  }
}

function reset() {
  return { type: 'RESET_CONTRAT' };
}
