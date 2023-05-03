import { contratService } from '../services/contratService.js';

export const contratActions = {
  getAll,
  get,
};

function getAll(page, statutContrat) {
  return dispatch => {
    dispatch(request());

    contratService.getAll(page, statutContrat)
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
