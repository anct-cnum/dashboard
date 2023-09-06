import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';
import { conseillerQueryStringParameters, candidatQueryStringParameters } from '../utils/queryUtils';

export const conseillerService = {
  get,
  getConseillerContrat,
  getCandidat,
  getCandidatRecrutement,
  getAllRecruter,
  getAllCandidats,
  getAllCandidatsByAdmin,
  getAllMisesEnRelation,
  updateStatus,
  updateDateRupture,
  updateMotifRupture,
  preSelectionner,
  getCurriculumVitae,
  validationRupture,
  dossierIncompletRupture,
  resendInvitCandidat,
  suppressionCandidat,
  getCandidatStructure,
  getCandidatureConseillerStructure,
};

function get(id) {
  return API.get(`${apiUrlRoot}/conseiller/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getConseillerContrat(idConseiller, idMiseEnRelation) {
  return API.get(`${apiUrlRoot}/conseiller/contrat/${idConseiller}/${idMiseEnRelation}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getCandidat(id) {
  return API.get(`${apiUrlRoot}/candidat/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getCandidatRecrutement(idConseiller, idMiseEnRelation) {
  return API.get(`${apiUrlRoot}/candidat/contrat/${idConseiller}/${idMiseEnRelation}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getCandidatStructure(id) {
  return API.get(`${apiUrlRoot}/misesEnRelation/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getCandidatureConseillerStructure(id) {
  return API.get(`${apiUrlRoot}/misesEnRelation-conseiller/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function resendInvitCandidat(id) {
  return API.post(`${apiUrlRoot}/candidat/relance-invitation/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function suppressionCandidat({ id, motif }) {
  return API.delete(`${apiUrlRoot}/candidat/${id}?motif=${motif}&role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

// eslint-disable-next-line max-len
function getAllRecruter(page, dateDebut, dateFin, filtreRupture, filtreCoordinateur, filtreParNomConseiller, filtreParRegion, filtreParDepartement, filtreParNomStructure, nomOrdre, ordre) {
  let {
    ordreColonne,
    filterDateStart,
    filterDateEnd,
    filterByNameConseiller,
    rupture,
    coordinateur,
    filterByRegion,
    filterByDepartement,
    filterByNameStructure,
  // eslint-disable-next-line max-len
  } = conseillerQueryStringParameters(nomOrdre, ordre, dateDebut, dateFin, filtreParNomConseiller, filtreRupture, filtreCoordinateur, filtreParRegion, filtreParDepartement, filtreParNomStructure);

  // eslint-disable-next-line max-len
  let uri = `${apiUrlRoot}/conseillers-recruter?skip=${page}${filterByNameConseiller}${filterDateStart}${filterDateEnd}${rupture}${ordreColonne}${coordinateur}${filterByRegion}${filterByDepartement}${filterByNameStructure}&role=${roleActivated()}`;

  return API.get(uri)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getAllCandidatsByAdmin(page, filtreParNomCandidat, filtreParRegion, filtreParDepartement) {
  let {
    filterByNameCandidat,
    filterByRegion,
    filterByDepartement,
  // eslint-disable-next-line max-len
  } = candidatQueryStringParameters(filtreParNomCandidat, filtreParRegion, filtreParDepartement);

  // eslint-disable-next-line max-len
  let uri = `${apiUrlRoot}/candidats?skip=${page}${filterByNameCandidat}${filterByDepartement}${filterByRegion}&role=${roleActivated()}`;

  return API.get(uri)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getAllCandidats(structureId, search, page, nomOrdre, ordre, persoFilters) {
  const filterSearch = search !== '' ? `&search=${search}` : '';
  const ordreColonne = nomOrdre ? '&nomOrdre=' + nomOrdre + '&ordre=' + ordre : '';

  // eslint-disable-next-line max-len
  let uri = `${apiUrlRoot}/candidats/structure?skip=${page}${filterSearch}${ordreColonne}&role=${roleActivated()}`;

  if (persoFilters) {
    if (havePix(persoFilters)) {
      uri += `&pix=${persoFilters?.pix}`;
    }
    if (haveDiplome(persoFilters)) {
      uri += `&diplome=${persoFilters?.diplome}`;
    }
    if (haveCV(persoFilters)) {
      uri += `&cv=${persoFilters?.cv}`;
    }
    if (haveCCP1(persoFilters)) {
      uri += `&ccp1=${persoFilters?.ccp1}`;
    }
  }

  return API.get(uri)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getAllMisesEnRelation(structureId, search, page, filter, nomOrdre, ordre, persoFilters) {
  const filterSearch = search !== '' ? `&search=${search}` : '';
  const ordreColonne = nomOrdre ? '&nomOrdre=' + nomOrdre + '&ordre=' + ordre : '';

  // eslint-disable-next-line max-len
  let uri = `${apiUrlRoot}/structures/misesEnRelation?skip=${page}${ordreColonne}${filterSearch}&role=${roleActivated()}`;

  if (filter) {
    uri += `&filter=${filter}`;
  }
  if (persoFilters) {
    if (havePix(persoFilters)) {
      uri += `&pix=${persoFilters?.pix}`;
    }
    if (haveDiplome(persoFilters)) {
      uri += `&diplome=${persoFilters?.diplome}`;
    }
    if (haveCV(persoFilters)) {
      uri += `&cv=${persoFilters?.cv}`;
    }
    if (haveCCP1(persoFilters)) {
      uri += `&ccp1=${persoFilters?.ccp1}`;
    }
  }

  return API.get(uri)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function updateStatus(id, statut, motifRupture, dateRupture) {
  return API.patch(`${apiUrlRoot}/misesEnRelation/${id}?role=${roleActivated()}`, {
    statut, motifRupture, dateRupture })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function preSelectionner(conseillerId) {
  return API.patch(`${apiUrlRoot}/structure/pre-selectionner/${conseillerId}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function updateDateRupture(id, date) {
  return API.patch(`${apiUrlRoot}/misesEnRelation/${id}?role=${roleActivated()}`, {
    dateRupture: date
  })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function updateMotifRupture(id, motif) {
  return API.patch(`${apiUrlRoot}/misesEnRelation/${id}?role=${roleActivated()}`, {
    motifRupture: motif
  })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getCurriculumVitae(id) {
  return API.get(`${apiUrlRoot}/candidat/${id}/cv?role=${roleActivated()}`, { responseType: 'blob' })
  .then(response => response.data)
  .catch(); //rien ici dans le cas blob sinon erreur non affiché
}

function validationRupture(id, dateFinDeContrat) {
  return API.patch(`${apiUrlRoot}/conseiller/rupture/validation/${id}?role=${roleActivated()}`, { dateFinDeContrat })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function dossierIncompletRupture(id, dateFinDeContrat) {
  return API.patch(`${apiUrlRoot}/conseiller/rupture/incomplet/${id}?role=${roleActivated()}`, { dateFinDeContrat })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function haveCV(persoFilters) {
  return persoFilters?.cv !== undefined && persoFilters?.cv !== null;
}
function haveDiplome(persoFilters) {
  return persoFilters?.diplome !== undefined && persoFilters?.diplome !== null;
}
function havePix(persoFilters) {
  return persoFilters?.pix !== undefined && persoFilters?.pix.length > 0;
}
function haveCCP1(persoFilters) {
  return persoFilters?.ccp1 !== undefined && persoFilters?.ccp1 !== null;
}
