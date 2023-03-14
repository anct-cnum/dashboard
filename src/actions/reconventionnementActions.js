import { reconventionnementService } from '../services/reconventionnementService.js';

export const reconventionnementActions = {
  getAll,
  getAllHistorique,
  get,
  reset
};

function getAll(page, typeConvention) {
  return dispatch => {
    dispatch(request());

    reconventionnementService.getAll(page, typeConvention)
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

function getAllHistorique(page, typeConvention, dateDebut, dateFin) {
  return dispatch => {
    dispatch(request());

    reconventionnementService.getAllHistorique(page, typeConvention, dateDebut, dateFin)
    .then(
      reconventionnements => dispatch(success(reconventionnements)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GETALL_HISTORIQUE_RECONVENTIONNEMENT_REQUEST' };
  }
  function success(reconventionnements) {
    return { type: 'GETALL_HISTORIQUE_RECONVENTIONNEMENT_SUCCESS', reconventionnements };
  }
  function failure(error) {
    return { type: 'GETALL_HISTORIQUE_RECONVENTIONNEMENT_FAILURE', error };
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

function reset() {
  return { type: 'RESET_RECONVENTIONNEMENT' };
}
