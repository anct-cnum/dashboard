import { roleActivated } from '../helpers/rolesUser.js';
import { contratService } from '../services/contratService.js';

export const contratActions = {
  getAll,
  validationRenouvellement,
  validationRecrutement,
  getAllHistorique,
  createContract,
  updateContractRecrutement,
  updateContract,
};

function getAll(page, statutContrat, filtreSearchBar, filtreDepartement, filtreRegion, filtreStatutDossierRupture, ordreNom = 'dateDemande', ordre = -1) {
  return dispatch => {
    dispatch(request());

    contratService.getAll(page, statutContrat, filtreSearchBar, filtreDepartement, filtreRegion, filtreStatutDossierRupture, ordreNom, ordre)
    .then(
      contrats => dispatch(success(contrats)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GETALL_CONTRAT_REQUEST' };
  }
  function success(contrats) {
    return { type: 'GETALL_CONTRAT_SUCCESS', contrats };
  }
  function failure(error) {
    return { type: 'GETALL_CONTRAT_FAILURE', error };
  }
}

function validationRenouvellement(id) {
  return dispatch => {
    dispatch(request());

    contratService.validationRenouvellement(id)
    .then(
      response => {
        dispatch(success());
        dispatch(updateMiseEnRelation(response.miseEnRelationUpdated));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'VALIDATION_CONTRAT_RENOUVELLEMENT_REQUEST' };
  }
  function success() {
    return { type: 'VALIDATION_CONTRAT_RENOUVELLEMENT_SUCCESS' };
  }
  function failure(error) {
    return { type: 'VALIDATION_CONTRAT_RENOUVELLEMENT_FAILURE', error };
  }
  function updateMiseEnRelation(miseEnRelationUpdated) {
    return { type: 'UPDATE_MISE_EN_RELATION_CONTRAT', miseEnRelationUpdated };
  }
}

function validationRecrutement(id) {
  return dispatch => {
    dispatch(request());

    contratService.validationRecrutement(id)
    .then(
      response => {
        dispatch(success());
        dispatch(updateMiseEnRelation(response.miseEnRelation));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'VALIDATION_CONTRAT_RECRUTEMENT_REQUEST' };
  }
  function success() {
    return { type: 'VALIDATION_CONTRAT_RECRUTEMENT_SUCCESS' };
  }
  function failure(error) {
    return { type: 'VALIDATION_CONTRAT_RECRUTEMENT_FAILURE', error };
  }
  function updateMiseEnRelation(miseEnRelation) {
    return { type: 'UPDATE_STATUS_SUCCESS', miseEnRelation };
  }
}

// eslint-disable-next-line max-len
function getAllHistorique(page, statutContrat, dateDebut, dateFin, filtreSearchBar, filtreDepartement, filtreRegion, ordreNom = 'dateDemande', ordre = -1) {
  return dispatch => {
    dispatch(request());

    contratService.getAllHistorique(page, statutContrat, dateDebut, dateFin, filtreSearchBar, filtreDepartement, filtreRegion, ordreNom, ordre)
    .then(
      contrats => dispatch(success(contrats)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GETALL_HISTORIQUE_CONTRAT_REQUEST' };
  }
  function success(contrats) {
    return { type: 'GETALL_HISTORIQUE_CONTRAT_SUCCESS', contrats };
  }
  function failure(error) {
    return { type: 'GETALL_HISTORIQUE_CONTRAT_FAILURE', error };
  }
}

function createContract(typeDeContrat, dateDebut, dateFin, salaire, miseEnrelationId) {
  return dispatch => {
    dispatch(request());

    contratService.createContract(typeDeContrat, dateDebut, dateFin, salaire, miseEnrelationId)
    .then(() => dispatch(success()),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'CREATE_CONTRAT_RENOUVELLEMENT_REQUEST' };
  }
  function success() {
    return { type: 'CREATE_CONTRAT_RENOUVELLEMENT_SUCCESS' };
  }
  function failure(error) {
    return { type: 'CREATE_CONTRAT_RENOUVELLEMENT_FAILURE', error };
  }
}

function updateContractRecrutement(typeDeContrat, dateDebut, dateFin, salaire, isRecrutementCoordinateur, miseEnrelationId) {
  return dispatch => {
    dispatch(request());

    contratService.updateContractRecrutement(typeDeContrat, dateDebut, dateFin, salaire, isRecrutementCoordinateur, miseEnrelationId)
    .then(response => {
      if (response?.urlDossierDS) {
        dispatch(updateLienDossierDS(response.urlDossierDS));
      }
      dispatch(success(response.message));
      dispatch(updateMiseEnRelation(response.miseEnRelation));
    },
    error => {
      dispatch(failure(error));
    }
    );
  };

  function request() {
    return { type: 'UPDATE_CONTRAT_RECRUTEMENT_REQUEST' };
  }
  function success(message) {
    return { type: 'UPDATE_CONTRAT_RECRUTEMENT_SUCCESS', message };
  }
  function updateMiseEnRelation(miseEnRelation) {
    return { type: 'UPDATE_STATUS_SUCCESS', miseEnRelation };
  }
  function updateLienDossierDS(urlDossierDS) {
    return { type: 'UPDATE_LIEN_DOSSIER_DS', urlDossierDS };
  }
  function failure(error) {
    return { type: 'UPDATE_CONTRAT_RECRUTEMENT_FAILURE', error };
  }
}

function updateContract(typeDeContrat, dateDebut, dateFin, salaire, isRecrutementCoordinateur, id) {
  return dispatch => {
    dispatch(request());

    contratService.updateContract(typeDeContrat, dateDebut, dateFin, salaire, isRecrutementCoordinateur, id)
    .then(
      miseEnRelation => {
        const roleUser = roleActivated();
        if (roleUser === 'admin') {
          dispatch(updateContratConseiller(miseEnRelation));
        }
        dispatch(success());
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_CONTRAT_RENOUVELLEMENT_REQUEST' };
  }
  function success() {
    return { type: 'UPDATE_CONTRAT_RENOUVELLEMENT_SUCCESS' };
  }
  function updateContratConseiller(miseEnRelationUpdated) {
    return { type: 'UPDATE_MISE_EN_RELATION_CONTRAT', miseEnRelationUpdated };
  }
  function failure(error) {
    return { type: 'UPDATE_CONTRAT_RENOUVELLEMENT_FAILURE', error };
  }
}
