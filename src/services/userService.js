import signOut from '../services/auth/logout';
import { roleActivated, authHeader } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';

export const userService = {
  confirmeUserEmail,
  updateUserEmail,
  verifyToken
};

function confirmeUserEmail(token) {
  const requestOptions = {
    method: 'PATCH',
    headers: authHeader(),
  };
  let uri = `${apiUrlRoot}/confirmation-email/${token}`;
  return fetch(uri, requestOptions).then(handleResponse);
}

function updateUserEmail(id, newEmail) {
  const requestOptions = {
    method: 'PATCH',
    headers: Object.assign({ 'Content-Type': 'application/json' }, authHeader()),
    body: JSON.stringify({ name: newEmail })
  };
  
  let uri = `${apiUrlRoot}/users/sendEmailUpdate/${id}?role=${roleActivated()}`;
  return fetch(uri, requestOptions).then(handleResponse);
}

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
        signOut();
        return Promise.reject({ error: 'Identifiants incorrects' });
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
