import { gestionnaireService } from '../services/gestionnaireService.js';

export const gestionnaireActions = {
  get,
  getDetails,
  getAll,
  suppressionGestionnaire,
  resendInvitGestionnaire,
  patch,
  updateStructureEmail,
  updateStructureSiret,
  verifyStructureSiret,
  cancelStructureSiret,
  hiddenMessageError
};

// eslint-disable-next-line max-len
function getAll(page, filtreParNom, filtreParRole, nomOrdre = 'prenom', ordre = 1) {
  return dispatch => {
    dispatch(request());

    // eslint-disable-next-line max-len
    gestionnaireService.getAll(page, filtreParNom, filtreParRole, nomOrdre, ordre)
    .then(
      gestionnaires => dispatch(success(gestionnaires)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GETALL_GESTIONNAIRES_REQUEST' };
  }
  function success(gestionnaires) {
    return { type: 'GETALL_GESTIONNAIRES_SUCCESS', gestionnaires };
  }
  function failure(error) {
    return { type: 'GETALL_GESTIONNAIRES_FAILURE', error };
  }
}

function resendInvitGestionnaire(id) {
  return dispatch => {
    dispatch(request());

    gestionnaireService.resendInvitGestionnaire(id)
    .then(
      successRelanceInvitation => dispatch(success(successRelanceInvitation)),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: 'RESUBMIT_INSCRIPTION_GESTIONNAIRE_REQUEST' };
  }
  function success(successRelanceInvitation) {
    return { type: 'RESUBMIT_INSCRIPTION_GESTIONNAIRE_SUCCESS', successRelanceInvitation };
  }
  function failure(error) {
    return { type: 'RESUBMIT_INSCRIPTION_GESTIONNAIRE_FAILURE', error };
  }
}

function suppressionGestionnaire({ id }) {
  return dispatch => {
    dispatch(request());

    gestionnaireService.suppressionGestionnaire({ id })
    .then(
      gestionnaire => dispatch(success(gestionnaire.deleteSuccess)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'DELETE_GESTIONNAIRE_REQUEST' };
  }
  function success(deleteSuccess) {
    return { type: 'DELETE_GESTIONNAIRE_SUCCESS', deleteSuccess };
  }
  function failure(error) {
    return { type: 'DELETE_GESTIONNAIRE_FAILURE', error };
  }
}

function get(id) {
  return dispatch => {
    dispatch(request());

    gestionnaireService.get(id)
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

    gestionnaireService.getDetails(id)
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

    gestionnaireService.patch(id, info)
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

    gestionnaireService.verifyStructureSiret(siret)
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

    gestionnaireService.updateStructureEmail(email, structureId)
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

    gestionnaireService.updateStructureSiret(siret, structureId)
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
