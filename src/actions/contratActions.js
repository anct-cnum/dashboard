import { contratService } from '../services/contratService.js';

export const contratActions = {
  getAll,
  validationRenouvellement,
  getAllHistorique,
  createContract,
  updateContract,
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
    return { type: 'VALIDATION_CONTRAT_RENOUVELLEMENT_REQUEST' };
  }
  function success() {
    return { type: 'VALIDATION_CONTRAT_RENOUVELLEMENT_SUCCESS' };
  }
  function failure(error) {
    return { type: 'VALIDATION_CONTRAT_RENOUVELLEMENT_FAILURE', error };
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

function createContract(typeDeContrat, dateDebut, dateFin, salaire, miseEnrelationId) {
  return dispatch => {
    dispatch(request());

    contratService.createContract(typeDeContrat, dateDebut, dateFin, salaire, miseEnrelationId)
    .then(
      miseEnRelationRelation => dispatch(success(miseEnRelationRelation)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'CREATE_CONTRAT_RENOUVELLEMENT_REQUEST' };
  }
  function success(miseEnRelationRelation) {
    return { type: 'CREATE_CONTRAT_RENOUVELLEMENT_SUCCESS', miseEnRelationRelation };
  }
  function failure(error) {
    return { type: 'CREATE_CONTRAT_RENOUVELLEMENT_FAILURE', error };
  }
}

function updateContract(typeDeContrat, dateDebut, dateFin, salaire, id, role = 'structure') {
  return dispatch => {
    dispatch(request());

    contratService.updateContract(typeDeContrat, dateDebut, dateFin, salaire, id)
    .then(
      miseEnRelation => {
        if (role === 'admin') {
          dispatch(updateContratConseiller(miseEnRelation));
        }
        dispatch(success(miseEnRelation));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_CONTRAT_RENOUVELLEMENT_REQUEST' };
  }
  function success(miseEnRelation) {
    return { type: 'UPDATE_CONTRAT_RENOUVELLEMENT_SUCCESS', miseEnRelation };
  }
  function updateContratConseiller(miseEnRelationUpdated) {
    return { type: 'UPDATE_MISE_EN_RELATION_CONTRAT', miseEnRelationUpdated };
  }
  function failure(error) {
    return { type: 'UPDATE_CONTRAT_RENOUVELLEMENT_FAILURE', error };
  }
}
