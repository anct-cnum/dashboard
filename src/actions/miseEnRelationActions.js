import { miseEnRelationService } from '../services/miseEnRelationService.js';

export const miseEnRelationAction = {
  getMisesEnRelationStructure
};


function getMisesEnRelationStructure(id) {
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


