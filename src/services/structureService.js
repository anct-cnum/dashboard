import { authHeader, roleActivated } from '../helpers';
import { authenticationService } from './authenticationService';
import apiUrlRoot from '../helpers/apiUrl';
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
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader())
  };

  return fetch(`${apiUrlRoot}/structure/${id}?role=${roleActivated()}`, requestOptions).then(handleResponse);
}

function getAll(page, dateDebut, dateFin, filtreParNom, filtreParDepartement, filtreParType, filtreParRegion, filtreParStatut, filtreParComs, nomOrdre, ordre) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader())
  };

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
  return fetch(`${apiUrlRoot}/structures/?skip=${page}${filterByName}${filterDateStart}${filterDateEnd}${filterByType}${ordreColonne}${filterByDepartement}${filterByRegion}${filterByStatut}${filterByComs}&role=${roleActivated()}`, requestOptions).then(handleResponse);
}

function patch({ id, contact }) {
  const requestOptions = {
    method: 'PATCH',
    headers: Object.assign({ 'Content-Type': 'application/json' }, authHeader()),
    body: JSON.stringify({ contact })
  };

  return fetch(`${apiUrlRoot}/structure/${id}?role=${roleActivated()}`, requestOptions).then(handleResponse);
}

function updateStructureEmail(email, structureId) {

  const requestOptions = {
    method: 'PATCH',
    headers: Object.assign({ 'Content-Type': 'application/json' }, authHeader()),
    body: JSON.stringify({ email })
  };

  return fetch(`${apiUrlRoot}/structure/email/${structureId}?role=${roleActivated()}`, requestOptions).then(handleResponse);
}

function verifyStructureSiret(siret) {

  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader())
  };

  return fetch(`${apiUrlRoot}/structure/verify-siret/${siret}`, requestOptions).then(handleResponse);
}

function updateStructureSiret(siret, structureId) {

  const requestOptions = {
    method: 'PATCH',
    headers: Object.assign({ 'Content-Type': 'application/json' }, authHeader()),
    body: JSON.stringify({ siret })
  };

  return fetch(`${apiUrlRoot}/structure/siret/${structureId}?role=${roleActivated()}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        authenticationService.logout();
        return Promise.reject({ error: 'Identifiants incorrects' });
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
  
    return data;
  });
}
