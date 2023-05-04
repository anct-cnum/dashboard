import { renouvellementService } from '../services/renouvellementService.js';

export const renouvellementActions = {
  createContract,
  updateContract,
};


function createContract(typeDeContrat, dateDebut, dateFin, salaire, miseEnrelationId) {
  return dispatch => {
    dispatch(request());

    renouvellementService.createContract(typeDeContrat, dateDebut, dateFin, salaire, miseEnrelationId)
    .then(
      miseEnRelationRelation => dispatch(success(miseEnRelationRelation)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'CREATE_CONTRACT_RENOUVELLEMENT_REQUEST' };
  }
  function success(miseEnRelationRelation) {
    return { type: 'CREATE_CONTRACT_RENOUVELLEMENT_SUCCESS', miseEnRelationRelation };
  }
  function failure(error) {
    return { type: 'CREATE_CONTRACT_RENOUVELLEMENT_FAILURE', error };
  }
}

function updateContract(typeDeContrat, dateDebut, dateFin, salaire, id) {
  return dispatch => {
    dispatch(request());

    renouvellementService.updateContract(typeDeContrat, dateDebut, dateFin, salaire, id)
    .then(
      miseEnRelationRelation => dispatch(success(miseEnRelationRelation)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_CONTRACT_RENOUVELLEMENT_REQUEST' };
  }
  function success(miseEnRelationRelation) {
    return { type: 'UPDATE_CONTRACT_RENOUVELLEMENT_SUCCESS', miseEnRelationRelation };
  }
  function failure(error) {
    return { type: 'UPDATE_CONTRACT_RENOUVELLEMENT_FAILURE', error };
  }
}
