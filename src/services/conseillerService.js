import { userEntityId, roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';
import { conseillerQueryStringParameters, candidatQueryStringParameters } from '../utils/queryUtils';

export const conseillerService = {
  get,
  getCandidat,
  getAllRecruter,
  getAllCandidats,
  getAllCandidatsByAdmin,
  getAllMisesEnRelation,
  updateStatus,
  updateDateRecrutement,
  updateDateRupture,
  updateMotifRupture,
  preSelectionner,
  getCurriculumVitae,
  validationRupture,
  dossierIncompletRupture,
  resendInvitCandidat,
  suppressionCandidat
};

function get(id) {
  return API.get(`${apiUrlRoot}/conseiller/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getCandidat(id) {
  return API.get(`${apiUrlRoot}/candidat/${id}?role=${roleActivated()}`)
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
function getAllRecruter(page, dateDebut, dateFin, filtreRupture, filtreCoordinateur, filtreParNomConseiller, filtreParRegion, filtreParNomStructure, nomOrdre, ordre) {
  let {
    ordreColonne,
    filterDateStart,
    filterDateEnd,
    filterByNameConseiller,
    rupture,
    coordinateur,
    filterByRegion,
    filterByNameStructure,
  // eslint-disable-next-line max-len
  } = conseillerQueryStringParameters(nomOrdre, ordre, dateDebut, dateFin, filtreParNomConseiller, filtreRupture, filtreCoordinateur, filtreParRegion, filtreParNomStructure);

  // eslint-disable-next-line max-len
  let uri = `${apiUrlRoot}/conseillers-recruter?skip=${page}${filterByNameConseiller}${filterDateStart}${filterDateEnd}${rupture}${ordreColonne}${coordinateur}${filterByRegion}${filterByNameStructure}&role=${roleActivated()}`;

  return API.get(uri)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getAllCandidatsByAdmin(page, filtreParNomCandidat, filtreParRegion, filtreParComs, filtreParDepartement) {
  let {
    filterByNameCandidat,
    filterByRegion,
    filterByComs,
    filterByDepartement,
  // eslint-disable-next-line max-len
  } = candidatQueryStringParameters(filtreParNomCandidat, filtreParRegion, filtreParComs, filtreParDepartement);

  // eslint-disable-next-line max-len
  let uri = `${apiUrlRoot}/candidats?skip=${page}${filterByNameCandidat}${filterByComs}${filterByDepartement}${filterByRegion}&role=${roleActivated()}`;

  return API.get(uri)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getAllCandidats(structureId, search, page, nomOrdre, persoFilters) {
  const filterSearch = search !== '' ? `&search=${search}` : '';
  const filterSort = nomOrdre ? '&nomOrdre=' + nomOrdre : '';

  let uri = `${apiUrlRoot}/candidats/structure/${structureId ? structureId : userEntityId()}?skip=${page}${filterSearch}${filterSort}&role=${roleActivated()}`;

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
  }

  return API.get(uri)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getAllMisesEnRelation(structureId, search, page, filter, nomOrdre, persoFilters) {
  const filterSearch = search !== '' ? `&search=${search}` : '';
  const filterSort = nomOrdre ? '&nomOrdre=' + nomOrdre : '';

  let uri = `${apiUrlRoot}/structures/${structureId ? structureId : userEntityId()}/misesEnRelation?\
skip=${page}${filterSort}${filterSearch}&role=${roleActivated()}`;

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
  }

  return API.get(uri)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function updateStatus(id, statut) {
  return API.patch(`${apiUrlRoot}/misesEnRelation/${id}?role=${roleActivated()}`, {
    statut })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function preSelectionner(conseillerId) {
  return API.patch(`${apiUrlRoot}/structure/pre-selectionner/${conseillerId}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function updateDateRecrutement(id, date) {
  return API.patch(`${apiUrlRoot}/misesEnRelation/${id}?role=${roleActivated()}`, {
    dateRecrutement: date
  })
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
