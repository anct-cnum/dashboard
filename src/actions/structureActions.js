import { structureService } from '../services/structureService.js';

export const structureActions = {
  get,
  getDetails,
  getAll,
  patch,
  updateStructureEmail,
  updateStructureSiret,
  verifyStructureSiret,
  cancelStructureSiret,
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

function getDetails(id) {
  return dispatch => {
    dispatch(request());

    structureService.getDetails(id)
    .then(
      structure => dispatch(success(structure)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_STRUCTURE_DETAILS_REQUEST' };
  }
  function success(structure) {
    return { type: 'GET_STRUCTURE_DETAILS_SUCCESS', structure };
  }
  function failure(error) {
    return { type: 'GET_STRUCTURE_DETAILS_FAILURE', error };
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

function verifyStructureSiret(siret) {

  return dispatch => {
    dispatch(request());

    structureService.verifyStructureSiret(siret)
    .then(
      structure => dispatch(success(structure.nomStructure)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'VERIFY_STRUCTURE_SIRET_REQUEST' };
  }
  function success(nomStructure) {
    return { type: 'VERIFY_STRUCTURE_SIRET_SUCCESS', nomStructure };
  }
  function failure(error) {
    return { type: 'VERIFY_STRUCTURE_SIRET_FAILURE', error };
  }
}

function updateStructureEmail(email, structureId) {

  return dispatch => {
    dispatch(request());

    structureService.updateStructureEmail(email, structureId)
    .then(
      structure => dispatch(success(structure.emailUpdated)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_STRUCTURE_EMAIL_REQUEST' };
  }
  function success(emailUpdated) {
    return { type: 'UPDATE_STRUCTURE_EMAIL_SUCCESS', emailUpdated };
  }
  function failure(error) {
    return { type: 'UPDATE_STRUCTURE_EMAIL_FAILURE', error };
  }
}

function updateStructureSiret(siret, structureId) {

  return dispatch => {
    dispatch(request());

    structureService.updateStructureSiret(siret, structureId)
    .then(
      structure => dispatch(success(structure.siretUpdated)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_STRUCTURE_SIRET_REQUEST' };
  }
  function success(siretUpdated) {
    return { type: 'UPDATE_STRUCTURE_SIRET_SUCCESS', siretUpdated };
  }
  function failure(error) {
    return { type: 'UPDATE_STRUCTURE_SIRET_FAILURE', error };
  }
}

function cancelStructureSiret() {
  return dispatch => {
    dispatch(request());
  };

  function request() {
    return { type: 'CANCEL_STRUCTURE_SIRET_REQUEST' };
  }
}

function hiddenMessageError() {
  return { type: 'ERROR_MESSAGE_HIDDEN' };
}
