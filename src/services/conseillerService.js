import { authHeader, roleActivated } from '../helpers';
import { authenticationService } from './authenticationService';
import apiUrlRoot from '../helpers/apiUrl';

export const conseillerService = {
  get,
};

function get(id) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader())
  };
  return fetch(`${apiUrlRoot}/conseiller/${id}?role=${roleActivated()}`, requestOptions).then(handleResponse);
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
