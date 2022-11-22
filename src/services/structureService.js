import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';
import { structureQueryStringParameters } from '../utils/queryUtils';

export const structureService = {
  get,
  getAll,
  patch,
  updateStructureEmail,
  updateStructureSiret,
  verifyStructureSiret
};

function get(id) {
  return API.get(`${apiUrlRoot}/structure/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function getAll(page, dateDebut, dateFin, filtreParNom, filtreParDepartement, filtreParType, filtreParRegion, filtreParStatut, filtreParComs, nomOrdre, ordre) {
  const {
    ordreColonne,
    filterDateStart,
    filterDateEnd,
    filterByName,
    filterByType,
    filterByStatut,
    filterByRegion,
    filterByComs,
    filterByDepartement,
  // eslint-disable-next-line max-len
  } = structureQueryStringParameters(nomOrdre, ordre, dateDebut, dateFin, filtreParNom, filtreParDepartement, filtreParType, filtreParRegion, filtreParStatut, filtreParComs);
  // eslint-disable-next-line max-len
  API.get(`${apiUrlRoot}/structures/?skip=${page}${filterByName}${filterDateStart}${filterDateEnd}${filterByType}${ordreColonne}${filterByDepartement}${filterByRegion}${filterByStatut}${filterByComs}&role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function patch({ id, contact }) {
  API.patch(`${apiUrlRoot}/structure/${id}?role=${roleActivated()}`, JSON.stringify({ contact }))
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function updateStructureEmail(email, structureId) {
  API.patch(`${apiUrlRoot}/structure/email/${structureId}?role=${roleActivated()}`, JSON.stringify({ email }))
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function verifyStructureSiret(siret) {
  API.get(`${apiUrlRoot}/structure/verify-siret/${siret}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function updateStructureSiret(siret, structureId) {
  API.patch(`${apiUrlRoot}/structure/siret/${structureId}?role=${roleActivated()}`, JSON.stringify({ siret }))
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}
