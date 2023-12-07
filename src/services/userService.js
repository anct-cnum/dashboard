import { handleApiError, roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';
import signOut from './auth/logout';

export const userService = {
  login,
  verifyToken,
  getUsers,
  validationSuppressionCompteGrandReseau
};

function verifyToken(token) {
  const requestOptions = {
    method: 'GET'
  };

  let uri = `${apiUrlRoot}/users/verifyToken/${token}`;
  return fetch(uri, requestOptions).then(handleResponse);
}

function login(username, password) {

  const strategy = process.env.REACT_APP_STRATEGYAUTH;
  const apiUrlAuth = `${process.env.REACT_APP_API_URL}/authentication`;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'strategy': strategy,
      'name': username,
      'password': password
    })
  };

  return fetch(apiUrlAuth, requestOptions)
  .then(handleResponse)
  .then(user => {
    return user;
  });
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

function getUsers() {
  return API.get(`${apiUrlRoot}/users?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function validationSuppressionCompteGrandReseau(idUser) {
  return API.delete(`${apiUrlRoot}/user/grandReseau/${idUser}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(handleApiError);
}
