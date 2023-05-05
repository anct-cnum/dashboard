import { contratService } from '../services/contratService.js';

export const contratActions = {
  getAll,
  get,
  validationRenouvellement
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

function validationRenouvellement(id) {
  return dispatch => {
    dispatch(request());

    contratService.validationRenouvellement(id)
    .then(
      response => {
        dispatch(success());
        dispatch(updateMiseEnRelation(response.miseEnRelationUpdated));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_CONTRAT_REQUEST' };
  }
  function success() {
    return { type: 'UPDATE_CONTRAT_SUCCESS' };
  }
  function updateMiseEnRelation(miseEnRelationUpdated) {
    return { type: 'UPDATE_MISE_EN_RELATION_RENOUVELLEMENT_CONTRAT', miseEnRelationUpdated };
  }
  function failure(error) {
    return { type: 'UPDATE_CONTRAT_FAILURE', error };
  }
}
