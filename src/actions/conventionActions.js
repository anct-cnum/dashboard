import { conventionService } from '../services/conventionService.js';

export const conventionActions = {
  getAll,
  getAllHistorique,
  get,
  reset
};

function getAll(page, typeConvention) {
  return dispatch => {
    dispatch(request());

    conventionService.getAll(page, typeConvention)
    .then(
      conventions => dispatch(success(conventions)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GETALL_CONVENTION_REQUEST' };
  }
  function success(conventions) {
    return { type: 'GETALL_CONVENTION_SUCCESS', conventions };
  }
  function failure(error) {
    return { type: 'GETALL_CONVENTION_FAILURE', error };
  }
}

function getAllHistorique(page, typeConvention, dateDebut, dateFin) {
  return dispatch => {
    dispatch(request());

    conventionService.getAllHistorique(page, typeConvention, dateDebut, dateFin)
    .then(
      conventions => dispatch(success(conventions)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GETALL_HISTORIQUE_CONVENTION_REQUEST' };
  }
  function success(conventions) {
    return { type: 'GETALL_HISTORIQUE_CONVENTION_SUCCESS', conventions };
  }
  function failure(error) {
    return { type: 'GETALL_HISTORIQUE_CONVENTION_FAILURE', error };
  }
}

function get(id) {
  return dispatch => {
    dispatch(request());

    conventionService.get(id)
    .then(
      convention => dispatch(success(convention)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_CONVENTION_REQUEST' };
  }
  function success(convention) {
    return { type: 'GET_CONVENTION_SUCCESS', convention };
  }
  function failure(error) {
    return { type: 'GET_CONVENTION_FAILURE', error };
  }
}

function reset() {
  return { type: 'RESET_CONVENTION' };
}
