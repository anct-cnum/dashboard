import { structureService } from '../services/structureService.js';

export const structureActions = {
  get,
  getAll,
  patch,
  hiddenMessageError
};

// eslint-disable-next-line max-len
function getAll(page, dateDebut, dateFin, filtreParNom, filtreParDepartement, filtreParType, filtreParRegion, filtreParStatut, filtreParComs, nomOrdre = 'prenom', ordre = 1) {
  return dispatch => {
    dispatch(request());

    // eslint-disable-next-line max-len
    structureService.getAll(page, dateDebut, dateFin, filtreParNom, filtreParDepartement, filtreParType, filtreParRegion, filtreParStatut, filtreParComs, nomOrdre, ordre)
    .then(
      structures => dispatch(success(structures)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GETALL_STRUCTURE_REQUEST' };
  }
  function success(structures) {
    return { type: 'GETALL_STRUCTURE_SUCCESS', structures };
  }
  function failure(error) {
    return { type: 'GETALL_STRUCTURE_FAILURE', error };
  }
}

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
