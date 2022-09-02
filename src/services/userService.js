import { authenticationService } from './authenticationService';
import { roleActivated, authHeader } from '../helpers';

export const userService = {
  confirmeUserEmail,
  updateUserEmail
};

function confirmeUserEmail(token) {
  const apiUrlRoot = process.env.REACT_APP_API_URL;
  const requestOptions = {
    method: 'PATCH',
    headers: authHeader(),
  };
  let uri = `${apiUrlRoot}/confirmation-email/${token}`;
  return fetch(uri, requestOptions).then(handleResponse);
}

function updateUserEmail(id, newEmail) {
  const apiUrlRoot = process.env.REACT_APP_API_URL;
  const requestOptions = {
    method: 'PATCH',
    headers: Object.assign({ 'Content-Type': 'application/json' }, authHeader()),
    body: JSON.stringify({ name: newEmail })
  };
  
  let uri = `${apiUrlRoot}/users/sendEmailUpdate/${id}`;
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
