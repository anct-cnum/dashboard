import { authenticationService } from './authenticationService';
import { roleActivated, authHeader } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';

export const userService = {
  verifyToken,
  usersByStructure
};

function verifyToken(token) {
  const requestOptions = {
    method: 'GET'
  };

  let uri = `${apiUrlRoot}/users/verifyToken/${token}`;
  return fetch(uri, requestOptions).then(handleResponse);
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

function usersByStructure(idStructure) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  let uri = `${apiUrlRoot}/users/listByIdStructure/${idStructure}?role=${roleActivated()}`;
  return fetch(uri, requestOptions).then(handleResponse);
}
