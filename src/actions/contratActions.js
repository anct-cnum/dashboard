import { contratService } from '../services/contratService.js';

export const contratActions = {
  getAll,
  getAllHistorique,
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

function getAllHistorique(page, statutContrat, dateDebut, dateFin) {
  return dispatch => {
    dispatch(request());

    contratService.getAllHistorique(page, statutContrat, dateDebut, dateFin)
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
