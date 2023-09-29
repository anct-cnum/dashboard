import { coordinateurService } from '../services/coordinateurService.js';

export const coordinateurActions = {
  getDemandeCoordinateur,
  getAllDemandesCoordinateur,
  confirmationAvisPrefet,
  closeBanner,
  confirmationRefusAvisAdmin,
};

// eslint-disable-next-line max-len
function getAllDemandesCoordinateur(page, statutDemande, filtreSearchBar, filtreDepartement, filtreRegion, filtreAvisPrefet, ordreNom = 'dateCandidature', ordre = -1) {
  return dispatch => {
    dispatch(request());

    coordinateurService.getAllDemandesCoordinateur(page, statutDemande, filtreSearchBar, filtreDepartement, filtreRegion, filtreAvisPrefet, ordreNom, ordre)
    .then(
      demandesCoordinateur => dispatch(success(demandesCoordinateur)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GETALL_DEMANDES_COORDINATEUR_REQUEST' };
  }
  function success(demandesCoordinateur) {
    return { type: 'GETALL_DEMANDES_COORDINATEUR_SUCCESS', demandesCoordinateur };
  }
  function failure(error) {
    return { type: 'GETALL_DEMANDES_COORDINATEUR_FAILURE', error };
  }
}

function getDemandeCoordinateur(idStructure, idDemandeCoordinateur) {
  return dispatch => {
    dispatch(request());

    coordinateurService.getDemandeCoordinateur(idStructure, idDemandeCoordinateur)
    .then(
      coordinateur => dispatch(success(coordinateur)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_DEMANDE_COORDINATEUR_REQUEST' };
  }
  function success(coordinateur) {
    return { type: 'GET_DEMANDE_COORDINATEUR_SUCCESS', coordinateur };
  }
  function failure(error) {
    return { type: 'GET_DEMANDE_COORDINATEUR_FAILURE', error };
  }
}

function confirmationAvisPrefet(idStructure, avisPrefet, idDemandeCoordinateur, commentaire) {
  return dispatch => {
    dispatch(request());

    coordinateurService.confirmationAvisPrefet(idStructure, avisPrefet, idDemandeCoordinateur, commentaire)
    .then(
      response => dispatch(success(response.success)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_AVIS_PREFET_REQUEST' };
  }
  function success(success) {
    return { type: 'UPDATE_AVIS_PREFET_SUCCESS', success };
  }
  function failure(error) {
    return { type: 'UPDATE_AVIS_PREFET_FAILURE', error };
  }
}

function confirmationRefusAvisAdmin(idStructure, idDemandeCoordinateur) {
  return dispatch => {
    dispatch(request());

    coordinateurService.confirmationRefusAvisAdmin(idStructure, idDemandeCoordinateur)
    .then(
      response => dispatch(success(response.success)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_AVIS_ADMIN_REQUEST' };
  }
  function success(success) {
    return { type: 'UPDATE_AVIS_ADMIN_SUCCESS', success };
  }
  function failure(error) {
    return { type: 'UPDATE_AVIS_ADMIN_FAILURE', error };
  }
}

function closeBanner(idDemandeCoordinateur, idStructure, typeBanner) {
  return dispatch => {
    dispatch(request());

    coordinateurService.closeBanner(idDemandeCoordinateur, idStructure, typeBanner)
    .then(
      idDemandeCoordinateur => {
        switch (typeBanner) {
          case 'banniereValidationAvisPrefet':
            dispatch(successBannerAvisPrefet(idDemandeCoordinateur));
            break;
          case 'banniereValidationAvisAdmin':
            dispatch(successBannerAvisAdmin(idDemandeCoordinateur));
            break;
          case 'banniereInformationAvisStructure':
            dispatch(successBannerAvisStructure(idDemandeCoordinateur));
            break;
          default:
            break;
        }
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_BANNER_REQUEST' };
  }
  function successBannerAvisPrefet(idDemandeCoordinateur) {
    return { type: 'UPDATE_BANNER_PREFET_SUCCESS', idDemandeCoordinateur };
  }
  function successBannerAvisAdmin(idDemandeCoordinateur) {
    return { type: 'UPDATE_BANNER_ADMIN_SUCCESS', idDemandeCoordinateur };
  }
  function successBannerAvisStructure(idDemandeCoordinateur) {
    return { type: 'UPDATE_BANNER_STRUCTURE_SUCCESS', idDemandeCoordinateur };
  }
  function failure(error) {
    return { type: 'UPDATE_BANNER_FAILURE', error };
  }
}
