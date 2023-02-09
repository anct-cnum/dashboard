import { gestionnaireService } from '../services/gestionnaireService.js';

export const gestionnaireActions = {
  getAll,
  suppressionGestionnaire,
  resendInvitGestionnaire,
};

function getAll(page, filtreParNom, filtreParRole, nomOrdre = 'prenom', ordre = 1) {
  return dispatch => {
    dispatch(request());

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

function suppressionGestionnaire(id, action = 'tous') {
  return dispatch => {
    dispatch(request());

    gestionnaireService.suppressionGestionnaire(id, action)
    .then(
      response => dispatch(success(response)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'DELETE_GESTIONNAIRE_REQUEST' };
  }
  function success(response) {
    if (response.user) {
      return { type: 'DELETE_ROLE_GESTIONNAIRE_SUCCESS', response };
    }
    return { type: 'DELETE_GESTIONNAIRE_SUCCESS', response };
  }
  function failure(error) {
    return { type: 'DELETE_GESTIONNAIRE_FAILURE', error };
  }
}
