import { reconventionnementService } from '../services/reconventionnementService.js';

export const reconventionnementActions = {
  getAll,
  get,
};

function getAll(page) {
  return dispatch => {
    dispatch(request());

    reconventionnementService.getAll(page)
    .then(
      response => dispatch(success(response)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GETALL_RECONVENTIONNEMENT_REQUEST' };
  }
  function success(response) {
    return { type: 'GETALL_RECONVENTIONNEMENT_SUCCESS', response };
  }
  function failure(error) {
    return { type: 'GETALL_RECONVENTIONNEMENT_FAILURE', error };
  }
}

function get(id) {
  return dispatch => {
    dispatch(request());

    reconventionnementService.get(id)
    .then(
      reconventionnement => dispatch(success(reconventionnement)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_RECONVENTIONNEMENT_REQUEST' };
  }
  function success(reconventionnement) {
    return { type: 'GET_RECONVENTIONNEMENT_SUCCESS', reconventionnement };
  }
  function failure(error) {
    return { type: 'GET_RECONVENTIONNEMENT_FAILURE', error };
  }
}
