import signOut from '../services/auth/logout';
import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';

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
  return response.text().then(async text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        await signOut();
        return Promise.reject({ error: 'Identifiants incorrects' });
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function usersByStructure(idStructure) {
  return API.get(`${apiUrlRoot}/users/listByIdStructure/${idStructure}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}
