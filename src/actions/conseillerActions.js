import { conseillerService } from '../services/conseillerService.js';
import { statsActions, searchActions } from '../actions';
import download from 'downloadjs';

export const conseillerActions = {
  get,
  getCandidat,
  getAllRecruter,
  updateStatus,
  updateDateRecrutement,
  updateDateRupture,
  updateMotifRupture,
  preSelectionner,
  getCurriculumVitae,
  getAllCandidats,
  validationRupture,
  dossierIncompletRupture,
  getAllCandidatsByAdmin,
  resendInvitCandidat,
  suppressionCandidat
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

function getAllCandidats({
  structureId = null,
  misesEnRelation,
  search = '',
  page = 0,
  filter,
  ordreNom,
  persoFilters }) {
  return dispatch => {
    dispatch(request());
    let promises = [];
    if (misesEnRelation) {
      let promise = conseillerService.getAllMisesEnRelation(structureId, search, page, filter, ordreNom, persoFilters);
      promises.push(promise);
    }

    let isSearch = search.length > 0;
    if (!misesEnRelation || isSearch) {
      let promise = conseillerService.getAllCandidats(structureId, search, page, ordreNom, persoFilters);
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
function getAllRecruter(page, dateDebut, dateFin, filtreRupture, filtreCoordinateur, filtreParNomConseiller, filtreParRegion, filtreParNomStructure, nomOrdre = 'prenom', ordre = 1) {
  return dispatch => {
    dispatch(request());
    // eslint-disable-next-line max-len
    conseillerService.getAllRecruter(page, dateDebut, dateFin, filtreRupture, filtreCoordinateur, filtreParNomConseiller, filtreParRegion, filtreParNomStructure, nomOrdre, ordre)
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

function getAllCandidatsByAdmin(page, filtreParNomCandidat, filtreParRegion, filtreParComs, filtreParDepartement) {
  return dispatch => {
    dispatch(request());
    conseillerService.getAllCandidatsByAdmin(page, filtreParNomCandidat, filtreParRegion, filtreParComs, filtreParDepartement)
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

function updateStatus({ id, statut }) {
  return dispatch => {
    dispatch(request());

    conseillerService.updateStatus(id, statut)
    .then(
      miseEnRelation => dispatch(success(miseEnRelation)),
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

function updateDateRecrutement({ id, date }) {
  return dispatch => {
    dispatch(request());

    conseillerService.updateDateRecrutement(id, date)
    .then(
      miseEnRelation => dispatch(success(miseEnRelation)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_DATE_REQUEST' };
  }
  function success(miseEnRelation) {
    return { type: 'UPDATE_DATE_SUCCESS', miseEnRelation };
  }
  function failure(error) {
    return { type: 'UPDATE_DATE_FAILURE', error };
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
        dispatch(searchActions.updateSearch(''));
        dispatch(statsActions.ajoutStatsInteressee());
        dispatch(success(response.message));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'PRESELECTIONNER_CONSEILLER_REQUEST' };
  }
  function success(message) {
    return { type: 'PRESELECTIONNER_CONSEILLER_SUCCESS', message };
  }
  function failure(error) {
    return { type: 'PRESELECTIONNER_CONSEILLER_FAILURE', error };
  }

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
      response => dispatch(success(response)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'VALIDATION_RUPTURE_REQUEST' };
  }
  function success(response) {
    return { type: 'VALIDATION_RUPTURE_SUCCESS', response };
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
      response => dispatch(success(response.dossierIncompletRupture)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'DOSSIER_INCOMPLET_RUPTURE_REQUEST' };
  }
  function success(dossierIncompletRupture) {
    return { type: 'DOSSIER_INCOMPLET_RUPTURE_SUCCESS', dossierIncompletRupture };
  }
  function failure(error) {
    return { type: 'DOSSIER_INCOMPLET_RUPTURE_FAILURE', error };
  }
}
