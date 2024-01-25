import { roleActivated } from '../helpers/rolesUser.js';
import { contratService } from '../services/contratService.js';

export const contratActions = {
  getAll,
  validationRenouvellement,
  validationRecrutement,
  annulationRecrutement,
  getAllHistorique,
  createContract,
  updateContractRecrutementStructure,
  updateContractRecrutementAdmin,
  updateContract,
  resetAnnulationRecrutement,
  closeBannerAnnulationRecrutement,
};

function getAll(page, statutContrat, filtreSearchBar, filtreDepartement, filtreRegion, filtreStatutDossierRupture, ordreNom = 'dateDemande', ordre) {
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

function updateContractRecrutementStructure(typeDeContrat, dateDebut, dateFin, salaire, isRecrutementCoordinateur, miseEnrelationId) {
  return dispatch => {
    dispatch(request());

    contratService.updateContractRecrutementStructure(typeDeContrat, dateDebut, dateFin, salaire, isRecrutementCoordinateur, miseEnrelationId)
    .then(conseiller => {
      dispatch(success());
      dispatch(updateConseiller(conseiller));
    },
    error => {
      dispatch(failure(error));
    }
    );
  };

  function request() {
    return { type: 'UPDATE_CONTRAT_RECRUTEMENT_REQUEST' };
  }
  function success() {
    return { type: 'UPDATE_CONTRAT_RECRUTEMENT_SUCCESS' };
  }
  function updateConseiller(conseiller) {
    return { type: 'UPDATE_CONSEILLER_SUCCESS', conseiller };
  }
  function failure(error) {
    return { type: 'UPDATE_CONTRAT_RECRUTEMENT_FAILURE', error };
  }
}

function updateContractRecrutementAdmin(typeDeContrat, dateDebut, dateFin, salaire, isRecrutementCoordinateur, miseEnrelationId, conseillerId) {
  return dispatch => {
    dispatch(request());

    contratService.updateContractRecrutementAdmin(typeDeContrat, dateDebut, dateFin, salaire, isRecrutementCoordinateur, miseEnrelationId, conseillerId)
    .then(conseiller => {
      dispatch(success());
      dispatch(updateConseiller(conseiller));
    },
    error => {
      dispatch(failure(error));
    }
    );
  };

  function request() {
    return { type: 'UPDATE_CONTRAT_RECRUTEMENT_REQUEST' };
  }
  function success() {
    return { type: 'UPDATE_CONTRAT_RECRUTEMENT_SUCCESS' };
  }
  function updateConseiller(conseiller) {
    return { type: 'UPDATE_CONSEILLER_SUCCESS', conseiller };
  }
  function failure(error) {
    return { type: 'UPDATE_CONTRAT_RECRUTEMENT_FAILURE', error };
  }
}

function updateContract(typeDeContrat, dateDebut, dateFin, salaire, id) {
  return dispatch => {
    dispatch(request());

    contratService.updateContract(typeDeContrat, dateDebut, dateFin, salaire, id)
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

function annulationRecrutement(idMiseEnRelation, banniereRefusRecrutement = false) {
  return dispatch => {
    dispatch(request());

    contratService.annulationRecrutement(idMiseEnRelation, banniereRefusRecrutement)
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
    return { type: 'ANNULATION_CONTRAT_RECRUTEMENT_REQUEST' };
  }
  function success() {
    return { type: 'ANNULATION_CONTRAT_RECRUTEMENT_SUCCESS' };
  }
  function failure(error) {
    return { type: 'ANNULATION_CONTRAT_RECRUTEMENT_FAILURE', error };
  }
  function updateMiseEnRelation(miseEnRelation) {
    return { type: 'UPDATE_STATUS_SUCCESS', miseEnRelation };
  }
}

function closeBannerAnnulationRecrutement(idMiseEnRelation) {
  return dispatch => {
    dispatch(request());

    contratService.closeBannerAnnulationRecrutement(idMiseEnRelation)
    .then(
      idMiseEnRelation => {
        dispatch(success(idMiseEnRelation));
        dispatch(successCloseBannerPosteCoordinateur(idMiseEnRelation));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_BANNER_ANNULATION_RECRUTEMENT_REQUEST' };
  }
  function success(idMiseEnRelation) {
    return { type: 'UPDATE_BANNER_ANNULATION_RECRUTEMENT_SUCCESS', idMiseEnRelation };
  }
  function successCloseBannerPosteCoordinateur(idMiseEnRelation) {
    return { type: 'CLOSE_BANNER_REFUS_RECRUTEMENT_SUCCESS', idMiseEnRelation };
  }
  function failure(error) {
    return { type: 'UPDATE_BANNER_ANNULATION_RECRUTEMENT_FAILURE', error };
  }
}

function resetAnnulationRecrutement() {
  return { type: 'RESET_ANNULATION_CONTRAT_RECRUTEMENT' };
}
