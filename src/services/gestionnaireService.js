import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';
import { gestionnairesQueryStringParameters } from '../utils/queryUtils';

export const gestionnaireService = {
  get,
  getAll,
  getDetails,
  suppressionGestionnaire,
  resendInvitGestionnaire,
  patch,
  updateStructureEmail,
  updateStructureSiret,
  verifyStructureSiret
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

function getAll(page, filtreParNom, filtreParRole, nomOrdre, ordre) {
  const {
    ordreColonne,
    filterByRole,
    filterByName,
  // eslint-disable-next-line max-len
  } = gestionnairesQueryStringParameters(nomOrdre, ordre, filtreParRole, filtreParNom);
  // eslint-disable-next-line max-len
  return API.get(`${apiUrlRoot}/gestionnaires/?skip=${page}${ordreColonne}${filterByRole}${filterByName}&role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function resendInvitGestionnaire(id) {
  return API.post(`${apiUrlRoot}/gestionnaire/relance-invitation/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function suppressionGestionnaire({ id }) {
  return API.delete(`${apiUrlRoot}/user/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function patch({ id, contact }) {
  return API.patch(`${apiUrlRoot}/structure/${id}?role=${roleActivated()}`, { contact })
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
