import { structureService } from '../services/structureService.js';

export const structureActions = {
  get,
  getDetails,
  getAll,
  updateContact,
  updateStructureEmail,
  updateStructureSiret,
  verifyStructureSiret,
  cancelStructureSiret,
  hiddenMessageError,
  createAvenant,
  closeBanner,
  addRoleCoordinateur,
  getAllDemandesConseiller,
  getDemandeConseiller,
};

// eslint-disable-next-line max-len
function getAll(page, dateDebut, dateFin, filtreParNom, filtreParDepartement, filtreParType, filtreParRegion, filtreParStatut, nomOrdre = 'nom', ordre = 1) {
  return dispatch => {
    dispatch(request());

    // eslint-disable-next-line max-len
    structureService.getAll(page, dateDebut, dateFin, filtreParNom, filtreParDepartement, filtreParType, filtreParRegion, filtreParStatut, nomOrdre, ordre)
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

function updateContact(id, info) {
  return dispatch => {
    dispatch(request());

    structureService.updateContact(id, info)
    .then(
      structure => dispatch(success(structure)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'PATCH_STRUCTURE_CONTACT_REQUEST' };
  }
  function success(structure) {
    return { type: 'PATCH_STRUCTURE_CONTACT_SUCCESS', structure };
  }
  function failure(error) {
    return { type: 'PATCH_STRUCTURE_CONTACT_FAILURE', error };
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

function createAvenant(type, structureId, nombreDePostes, motif, autreMotif) {
  return dispatch => {
    dispatch(request());

    structureService.createAvenant(type, structureId, nombreDePostes, motif, autreMotif)
    .then(
      structure => dispatch(success(structure)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'CREATE_AVENANT_REQUEST' };
  }
  function success(structure) {
    return { type: 'CREATE_AVENANT_SUCCESS', structure };
  }
  function failure(error) {
    return { type: 'CREATE_AVENANT_FAILURE', error };
  }
}

function closeBanner(type, id, conseillerId) {
  return dispatch => {
    dispatch(request());

    structureService.closeBanner(type, id, conseillerId)
    .then(
      structure => dispatch(success(structure)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'CLOSE_BANNER_REQUEST' };
  }
  function success(structure) {
    return { type: 'CLOSE_BANNER_SUCCESS', structure };
  }
  function failure(error) {
    return { type: 'CLOSE_BANNER_FAILURE', error };
  }
}

function addRoleCoordinateur(structureId, conseillerId) {
  return dispatch => {
    dispatch(request());

    structureService.addRoleCoordinateur(structureId, conseillerId)
    .then(
      conseillerId => dispatch(success(conseillerId)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'ADD_ROLE_COORDINATEUR_REQUEST' };
  }
  function success(conseillerId) {
    return { type: 'ADD_ROLE_COORDINATEUR_SUCCESS', conseillerId };
  }
  function failure(error) {
    return { type: 'ADD_ROLE_COORDINATEUR_FAILURE', error };
  }
}

function getAllDemandesConseiller(page, statutDemande, filtreSearchBar, filtreDepartement, filtreRegion, filtreAvisPrefet, ordreNom = 'codePostal', ordre) {
  return dispatch => {
    dispatch(request());

    structureService.getAllDemandesConseiller(page, statutDemande, filtreSearchBar, filtreDepartement, filtreRegion, filtreAvisPrefet, ordreNom, ordre)
    .then(
      structures => dispatch(success(structures)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GETALL_DEMANDES_CONSEILLER_REQUEST' };
  }
  function success(structures) {
    return { type: 'GETALL_DEMANDES_CONSEILLER_SUCCESS', structures };
  }
  function failure(error) {
    return { type: 'GETALL_DEMANDES_CONSEILLER_FAILURE', error };
  }
}

function getDemandeConseiller(idStructure) {
  return dispatch => {
    dispatch(request());

    structureService.getDemandeConseiller(idStructure)
    .then(
      structure => dispatch(success(structure)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_DEMANDE_CONSEILLER_REQUEST' };
  }
  function success(structure) {
    return { type: 'GET_DEMANDE_CONSEILLER_SUCCESS', structure };
  }
  function failure(error) {
    return { type: 'GET_DEMANDE_CONSEILLER_FAILURE', error };
  }
}
