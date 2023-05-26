import { contratService } from '../services/contratService.js';

export const contratActions = {
  getAll,
  validationRenouvellement,
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
  function failure(error) {
    return { type: 'UPDATE_CONTRAT_FAILURE', error };
  }
  function updateMiseEnRelation(miseEnRelationUpdated) {
    return { type: 'UPDATE_MISE_EN_RELATION_CONTRAT', miseEnRelationUpdated };
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
