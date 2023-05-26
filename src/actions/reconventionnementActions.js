import { reconventionnementService } from '../services/reconventionnementService.js';

export const reconventionnementActions = {
  getAll,
  get,
  update,
  validation,
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

function update(structureId, action, conseillersIds = [], nombreDePostes = null, motif = null) {
  return dispatch => {
    dispatch(request());

    reconventionnementService.update(structureId, action, conseillersIds, nombreDePostes, motif)
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

function validation(id) {
  return dispatch => {
    dispatch(request());
    reconventionnementService.validation(id)
    .then(
      response => {
        dispatch(success());
        dispatch(updateStatutConventionnement(response.statutReconventionnementUpdated));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'VALIDATION_RECONVENTIONNEMENT_REQUEST' };
  }
  function success() {
    return { type: 'VALIDATION_RECONVENTIONNEMENT_SUCCESS' };
  }
  function updateStatutConventionnement(statutReconventionnementUpdated) {
    return { type: 'UPDATE_STATUT_CONVENTIONNEMENT', statutReconventionnementUpdated };
  }
  function failure(error) {
    return { type: 'VALIDATION_RECONVENTIONNEMENT_FAILURE', error };
  }
}
