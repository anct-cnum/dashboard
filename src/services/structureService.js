import { authHeader, roleActivated } from '../helpers';
import { authenticationService } from './authenticationService';
import apiUrlRoot from '../helpers/apiUrl';

export const structureService = {
  get,
  getAll,
  patch,
};

function get(id) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader())
  };

  return fetch(`${apiUrlRoot}/structure/${id}?role=${roleActivated()}`, requestOptions).then(handleResponse);
}

function getAll(page, dateDebut, dateFin, nomOrdre, ordre) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader())
  };

  return fetch(`${apiUrlRoot}/structure/${page}?role=${roleActivated()}`, requestOptions).then(handleResponse);
}

function patch({ id, contact }) {
  const requestOptions = {
    method: 'PATCH',
    headers: Object.assign({ 'Content-Type': 'application/json' }, authHeader()),
    body: JSON.stringify({ contact })
  };

  return fetch(`${apiUrlRoot}/structure/${id}?role=${roleActivated()}`, requestOptions).then(handleResponse);
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
