import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';
import { structureQueryStringParameters } from '../utils/queryUtils';

export const structureService = {
  get,
  getAll,
  getDetails,
  updateContact,
  updateStructureEmail,
  updateStructureSiret,
  verifyStructureSiret,
  demandeCoselec,
  closeBanner,
};

function get(id) {
  return API.get(`${apiUrlRoot}/structure/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getDetails(id) {
  return API.get(`${apiUrlRoot}/structure/details/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getAll(page, dateDebut, dateFin, filtreParNom, filtreParDepartement, filtreParType, filtreParRegion, filtreParStatut, nomOrdre, ordre) {
  const {
    ordreColonne,
    filterDateStart,
    filterDateEnd,
    filterByName,
    filterByType,
    filterByStatut,
    filterByRegion,
    filterByDepartement,
  // eslint-disable-next-line max-len
  } = structureQueryStringParameters(nomOrdre, ordre, dateDebut, dateFin, filtreParNom, filtreParDepartement, filtreParType, filtreParRegion, filtreParStatut);
  // eslint-disable-next-line max-len
  return API.get(`${apiUrlRoot}/structures/?skip=${page}${filterByName}${filterDateStart}${filterDateEnd}${filterByType}${ordreColonne}${filterByDepartement}${filterByRegion}${filterByStatut}&role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function updateContact({ id, contact }) {
  return API.patch(`${apiUrlRoot}/structure/contact/${id}?role=${roleActivated()}`, { contact })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function updateStructureEmail(email, structureId) {
  return API.patch(`${apiUrlRoot}/structure/email/${structureId}?role=${roleActivated()}`, { email })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function verifyStructureSiret(siret) {
  return API.get(`${apiUrlRoot}/structure/verify-siret/${siret}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function updateStructureSiret(siret, structureId) {
  return API.patch(`${apiUrlRoot}/structure/siret/${structureId}?role=${roleActivated()}`, { siret })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function demandeCoselec(type, structureId, nombreDePostes, motif, autreMotif = '') {
  // eslint-disable-next-line max-len
  return API.patch(`${apiUrlRoot}/demande-coselec?role=${roleActivated()}&structureId=${structureId}`, { type, nombreDePostes, motif, autreMotif })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function closeBanner(type, id) {
  return API.patch(`${apiUrlRoot}/reconventionnement/banniere/${id}?type=${type}&role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}
