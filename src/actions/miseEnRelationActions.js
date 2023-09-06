import { miseEnRelationService } from '../services/miseEnRelationService.js';

export const miseEnRelationAction = {
  getMisesEnRelationByStructure,
  getMisesEnRelationARenouveller,
  getMisesEnRelationStats
};


function getMisesEnRelationByStructure(id) {
  return dispatch => {
    dispatch(request());

    miseEnRelationService.getMisesEnRelationStructure(id)
    .then(
      candidat => dispatch(success(candidat)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_MISESENRELATION_STRUCTURE_REQUEST' };
  }
  function success(misesEnRelation) {
    return { type: 'GET_MISESENRELATION_STRUCTURE_SUCCESS', misesEnRelation };
  }
  function failure(error) {
    return { type: 'GET_MISESENRELATION_STRUCTURE_FAILURE', error };
  }
}
function getMisesEnRelationARenouveller(id) {
  return dispatch => {
    dispatch(request());

    miseEnRelationService.getMisesEnRelationARenouveller(id)
    .then(
      candidat => dispatch(success(candidat)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_MISESENRELATION_A_RENOUVELLER_STRUCTURE_REQUEST' };
  }
  function success(misesEnRelation) {
    return { type: 'GET_MISESENRELATION_A_RENOUVELLER_STRUCTURE_SUCCESS', misesEnRelation };
  }
  function failure(error) {
    return { type: 'GET_MISESENRELATION_A_RENOUVELLER_STRUCTURE_FAILURE', error };
  }
}

function getMisesEnRelationStats() {
  return dispatch => {
    dispatch(request());

    miseEnRelationService.getMisesEnRelationStats()
    .then(
      stats => dispatch(success(stats)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_MISES_EN_RELATION_STATS_REQUEST' };
  }
  function success(stats) {
    return { type: 'GET_MISES_EN_RELATION_STATS_SUCCESS', stats };
  }
  function failure(error) {
    return { type: 'GET_MISES_EN_RELATION_STATS_FAILURE', error };
  }
}
