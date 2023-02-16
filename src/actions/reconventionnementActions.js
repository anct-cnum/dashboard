import { reconventionnementService } from '../services/reconventionnementService.js';

export const reconventionnementActions = {
  getAll,
};

function getAll(page) {
  return dispatch => {
    dispatch(request());

    reconventionnementService.getAll(page)
    .then(
      reconventionnements => dispatch(success(reconventionnements)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GETALL_RECONVENTIONNEMENT_REQUEST' };
  }
  function success(reconventionnements) {
    return { type: 'GETALL_RECONVENTIONNEMENT_SUCCESS', reconventionnements };
  }
  function failure(error) {
    return { type: 'GETALL_RECONVENTIONNEMENT_FAILURE', error };
  }
}
