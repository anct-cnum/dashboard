import { conseillerService } from '../services/conseillerService.js';
import download from 'downloadjs';

export const conseillerActions = {
  get,
  getConseillerContrat,
  getCandidat,
  getCandidatRecrutement,
  getAllRecruter,
  updateStatus,
  updateDateRupture,
  updateMotifRupture,
  preSelectionner,
  getCurriculumVitae,
  getAllCandidats,
  validationRupture,
  dossierIncompletRupture,
  getAllCandidatsByAdmin,
  resendInvitCandidat,
  suppressionCandidat,
  getCandidatStructure,
  getCandidatureConseillerStructure,
  resendInvitConseiller,
  resetSuccessPreselection
};

function get(id) {
  return dispatch => {
    dispatch(request());

    conseillerService.get(id)
    .then(
      conseiller => dispatch(success(conseiller)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_CONSEILLER_REQUEST' };
  }
  function success(conseiller) {
    return { type: 'GET_CONSEILLER_SUCCESS', conseiller };
  }
  function failure(error) {
    return { type: 'GET_CONSEILLER_FAILURE', error };
  }
}

function getConseillerContrat(id, idMiseEnRelation) {
  return dispatch => {
    dispatch(request());

    conseillerService.getConseillerContrat(id, idMiseEnRelation)
    .then(
      conseiller => dispatch(success(conseiller)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_CONSEILLER_CONTRAT_REQUEST' };
  }
  function success(conseiller) {
    return { type: 'GET_CONSEILLER_CONTRAT_SUCCESS', conseiller };
  }
  function failure(error) {
    return { type: 'GET_CONSEILLER_CONTRAT_FAILURE', error };
  }
}

function getCandidat(id) {
  return dispatch => {
    dispatch(request());

    conseillerService.getCandidat(id)
    .then(
      candidat => dispatch(success(candidat)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_CANDIDAT_REQUEST' };
  }
  function success(candidat) {
    return { type: 'GET_CANDIDAT_SUCCESS', candidat };
  }
  function failure(error) {
    return { type: 'GET_CANDIDAT_FAILURE', error };
  }
}

function getCandidatRecrutement(id, idMiseEnRelation) {
  return dispatch => {
    dispatch(request());

    conseillerService.getCandidatRecrutement(id, idMiseEnRelation)
    .then(
      candidat => dispatch(success(candidat)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_CANDIDAT_REQUEST' };
  }
  function success(candidat) {
    return { type: 'GET_CANDIDAT_SUCCESS', candidat };
  }
  function failure(error) {
    return { type: 'GET_CANDIDAT_FAILURE', error };
  }
}

function getCandidatStructure(id) {
  return dispatch => {
    dispatch(request());

    conseillerService.getCandidatStructure(id)
    .then(
      candidat => dispatch(success(candidat)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_CANDIDAT_STRUCTURE_REQUEST' };
  }
  function success(candidat) {
    return { type: 'GET_CANDIDAT_STRUCTURE_SUCCESS', candidat };
  }
  function failure(error) {
    return { type: 'GET_CANDIDAT_STRUCTURE_FAILURE', error };
  }
}

function getCandidatureConseillerStructure(id) {
  return dispatch => {
    dispatch(request());

    conseillerService.getCandidatureConseillerStructure(id)
    .then(
      candidat => dispatch(success(candidat)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_CANDIDAT_STRUCTURE_REQUEST' };
  }
  function success(candidat) {
    return { type: 'GET_CANDIDAT_STRUCTURE_SUCCESS', candidat };
  }
  function failure(error) {
    return { type: 'GET_CANDIDAT_STRUCTURE_FAILURE', error };
  }
}

function getAllCandidats({
  misesEnRelation,
  search = '',
  page = 0,
  filter,
  ordreNom,
  ordre,
  persoFilters }) {
  return dispatch => {
    dispatch(request());
    let promises = [];
    if (misesEnRelation) {
      let promise = conseillerService.getAllMisesEnRelation(search, page, filter, ordreNom, ordre, persoFilters);
      promises.push(promise);
    }

    let isSearch = search.length > 0;
    if (!misesEnRelation || isSearch) {
      let promise = conseillerService.getAllCandidats(search, page, ordreNom, ordre, persoFilters);
      promises.push(promise);
    }
    let conseillers = null;
    Promise.all(promises).then(items => {
      conseillers = items[0];
      if (items.length > 1) {
        conseillers.data = [...items[0].data, ...items[1].data];
        conseillers.total = items[0].total + items[1].total;
        conseillers.limit = items[0].limit === 0 ? items[1].limit : items[0].limit;
        conseillers.skip = items[0].skip === 0 ? items[1].limit : items[0].limit;
        conseillers.coselec = Object.entries(items[0].coselec).length === 0 ? items[1].coselec : items[0].coselec;
      }
      dispatch(success(conseillers));
    }).catch(error => {
      dispatch(failure(error));
    });
  };
  function request() {
    return { type: 'GETALL_CANDIDATS_REQUEST' };
  }
  function success(conseillers) {
    return { type: 'GETALL_CANDIDATS_SUCCESS', conseillers };
  }
  function failure(error) {
    return { type: 'GETALL_CANDIDATS_FAILURE', error };
  }
}

// eslint-disable-next-line max-len
function getAllRecruter(page, dateDebut, dateFin, filtreRupture, filtreCoordinateur, filtreParNomConseiller, filtreParRegion, filtreParDepartement, filtreParNomStructure, nomOrdre = 'prenom', ordre = 1) {
  return dispatch => {
    dispatch(request());
    // eslint-disable-next-line max-len
    conseillerService.getAllRecruter(page, dateDebut, dateFin, filtreRupture, filtreCoordinateur, filtreParNomConseiller, filtreParRegion, filtreParDepartement, filtreParNomStructure, nomOrdre, ordre)
    .then(
      conseillers => {
        dispatch(success(conseillers));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GETALL_RECRUTER_REQUEST' };
  }
  function success(conseillers) {
    return { type: 'GETALL_RECRUTER_SUCCESS', conseillers };
  }
  function failure(error) {
    return { type: 'GETALL_RECRUTER_FAILURE', error };
  }
}

function getAllCandidatsByAdmin(page, filtreParNomCandidat, filtreParRegion, filtreParDepartement) {
  return dispatch => {
    dispatch(request());
    conseillerService.getAllCandidatsByAdmin(page, filtreParNomCandidat, filtreParRegion, filtreParDepartement)
    .then(
      candidats => {
        dispatch(success(candidats));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GETALL_CANDIDATS_ADMIN_REQUEST' };
  }
  function success(candidats) {
    return { type: 'GETALL_CANDIDATS_ADMIN_SUCCESS', candidats };
  }
  function failure(error) {
    return { type: 'GETALL_CANDIDATS_ADMIN_FAILURE', error };
  }
}

function resendInvitCandidat(id) {
  return dispatch => {
    dispatch(request());

    conseillerService.resendInvitCandidat(id)
    .then(
      successRelanceInvitation => dispatch(success(successRelanceInvitation)),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: 'RESUBMIT_INSCRIPTION_CANDIDAT_REQUEST' };
  }
  function success(successRelanceInvitation) {
    return { type: 'RESUBMIT_INSCRIPTION_CANDIDAT_SUCCESS', successRelanceInvitation };
  }
  function failure(error) {
    return { type: 'RESUBMIT_INSCRIPTION_CANDIDAT_FAILURE', error };
  }
}

function suppressionCandidat({ id, motif }) {
  return dispatch => {
    dispatch(request());

    conseillerService.suppressionCandidat({ id, motif })
    .then(
      candidat => dispatch(success(candidat.deleteSuccess)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'DELETE_CANDIDAT_REQUEST' };
  }
  function success(deleteSuccess) {
    return { type: 'DELETE_CANDIDAT_SUCCESS', deleteSuccess };
  }
  function failure(error) {
    return { type: 'DELETE_CANDIDAT_FAILURE', error };
  }
}

function updateStatus(id, statut, motifRupture, dateRupture) {
  return dispatch => {
    dispatch(request());
    conseillerService.updateStatus(id, statut, motifRupture, dateRupture)
    .then(
      response => dispatch(success(response.miseEnRelation)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_STATUS_REQUEST' };
  }
  function success(miseEnRelation) {
    return { type: 'UPDATE_STATUS_SUCCESS', miseEnRelation };
  }
  function failure(error) {
    return { type: 'UPDATE_STATUS_FAILURE', error };
  }
}

function updateDateRupture({ id, date }) {
  return dispatch => {
    dispatch(request());

    conseillerService.updateDateRupture(id, date)
    .then(
      miseEnRelation => dispatch(success(miseEnRelation)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_DATE_RUPTURE_REQUEST' };
  }
  function success(miseEnRelation) {
    return { type: 'UPDATE_DATE_RUPTURE_SUCCESS', miseEnRelation };
  }
  function failure(error) {
    return { type: 'UPDATE_DATE_RUPTURE_FAILURE', error };
  }
}

function updateMotifRupture({ id, motif }) {
  return dispatch => {
    dispatch(request());

    conseillerService.updateMotifRupture(id, motif)
    .then(
      miseEnRelation => dispatch(success(miseEnRelation)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_MOTIF_RUPTURE_REQUEST' };
  }
  function success(miseEnRelation) {
    return { type: 'UPDATE_MOTIF_RUPTURE_SUCCESS', miseEnRelation };
  }
  function failure(error) {
    return { type: 'UPDATE_MOTIF_RUPTURE_FAILURE', error };
  }
}

function preSelectionner(conseillerId) {
  return dispatch => {
    dispatch(request());

    conseillerService.preSelectionner(conseillerId)
    .then(
      response => {
        dispatch(success(response.success));
        dispatch(updateMiseEnRelation(response.miseEnRelation));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'PRESELECTIONNER_CONSEILLER_REQUEST' };
  }
  function success(success) {
    return { type: 'PRESELECTIONNER_CONSEILLER_SUCCESS', success };
  }
  function failure(error) {
    return { type: 'PRESELECTIONNER_CONSEILLER_FAILURE', error };
  }
  function updateMiseEnRelation(miseEnRelation) {
    return { type: 'UPDATE_STATUS_SUCCESS', miseEnRelation };
  }
}

function resetSuccessPreselection() {
  return { type: 'RESET_SUCCESS_PRESELECTION' };
}

function getCurriculumVitae(id, candidat) {
  return dispatch => {
    dispatch(request());

    conseillerService.getCurriculumVitae(id)
    .then(
      data => dispatch(success(data, download(data, candidat?.nom + '_' + candidat?.prenom + '.' + candidat?.cv?.extension))),
      error => dispatch(failure(error))
    );
  };
  function request() {
    return { type: 'GET_CURRICULUM_VITAE_REQUEST' };
  }
  function success(data, download) {
    return { type: 'GET_CURRICULUM_VITAE_SUCCESS', data, download };
  }
  function failure(error) {
    return { type: 'GET_CURRICULUM_VITAE_FAILURE', error };
  }
}

function validationRupture(id, dateFinDeContrat) {
  return dispatch => {
    dispatch(request());

    conseillerService.validationRupture(id, dateFinDeContrat)
    .then(
      miseEnRelationUpdated => dispatch(success(miseEnRelationUpdated)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'VALIDATION_RUPTURE_REQUEST' };
  }
  function success(miseEnRelationUpdated) {
    return { type: 'VALIDATION_RUPTURE_SUCCESS', miseEnRelationUpdated };
  }
  function failure(error) {
    return { type: 'VALIDATION_RUPTURE_FAILURE', error };
  }
}

function dossierIncompletRupture(id, dateFinDeContrat) {
  return dispatch => {
    dispatch(request());

    conseillerService.dossierIncompletRupture(id, dateFinDeContrat)
    .then(
      miseEnRelationUpdated => {
        dispatch(success());
        dispatch(updateMiseEnRelation(miseEnRelationUpdated));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'DOSSIER_INCOMPLET_RUPTURE_REQUEST' };
  }
  function success() {
    return { type: 'DOSSIER_INCOMPLET_RUPTURE_SUCCESS' };
  }
  function updateMiseEnRelation(miseEnRelationUpdated) {
    return { type: 'UPDATE_MISE_EN_RELATION_CONTRAT', miseEnRelationUpdated };
  }
  function failure(error) {
    return { type: 'DOSSIER_INCOMPLET_RUPTURE_FAILURE', error };
  }
}

function resendInvitConseiller(id) {
  return dispatch => {
    dispatch(request());

    conseillerService.resendInvitConseiller(id)
    .then(
      successRelanceInvitation => dispatch(success(successRelanceInvitation)),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: 'RESUBMIT_INVITATION_CONSEILLER_REQUEST' };
  }
  function success(successRelanceInvitation) {
    return { type: 'RESUBMIT_INVITATION_CONSEILLER_SUCCESS', successRelanceInvitation };
  }
  function failure(error) {
    return { type: 'RESUBMIT_INVITATION_CONSEILLER_FAILURE', error };
  }
}
