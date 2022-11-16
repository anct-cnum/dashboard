import { authenticationService } from './authenticationService';
import { roleActivated, authHeader } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';

export const userService = {
  usersByStructure
};

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
