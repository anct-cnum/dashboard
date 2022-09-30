import { structureService } from '../services/structureService.js';

export const structureActions = {
  get,
  patch,
  hiddenMessageError
};

function get(id) {
  return dispatch => {
    dispatch(request());

    structureService.get(id)
    .then(
      structure => dispatch(success(structure)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_STRUCTURE_REQUEST' };
  }
  function success(structure) {
    return { type: 'GET_STRUCTURE_SUCCESS', structure };
  }
  function failure(error) {
    return { type: 'GET_STRUCTURE_FAILURE', error };
  }
}

function patch(id, info) {
  return dispatch => {
    dispatch(request());

    structureService.patch(id, info)
    .then(
      structure => dispatch(success(structure)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'PATCH_STRUCTURE_REQUEST' };
  }
  function success(structure) {
    return { type: 'PATCH_STRUCTURE_SUCCESS', structure };
  }
  function failure(error) {
    return { type: 'PATCH_STRUCTURE_FAILURE', error };
  }
}

function hiddenMessageError() {
  return { type: 'ERROR_MESSAGE_HIDDEN' };
}
