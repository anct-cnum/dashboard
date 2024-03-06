import { reconventionnementService } from '../services/reconventionnementService.js';

export const reconventionnementActions = {
  update,
};

function update(structureId, etat, conseillersIds = [], nombreDePostes = null, motif = null) {
  return dispatch => {
    dispatch(request());

    reconventionnementService.update(structureId, etat, conseillersIds, nombreDePostes, motif)
    .then(
      reconventionnement => dispatch(success(reconventionnement)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_RECONVENTIONNEMENT_REQUEST' };
  }
  function success(reconventionnement) {
    return { type: 'UPDATE_RECONVENTIONNEMENT_SUCCESS', reconventionnement };
  }
  function failure(error) {
    return { type: 'UPDATE_RECONVENTIONNEMENT_FAILURE', error };
  }
}
