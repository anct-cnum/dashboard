import { authenticationService } from './authenticationService';
import { authHeader, history, roleActivated } from '../helpers';

export const invitationsService = {
  inviteAccountPrefet,
  inviteAccountAdmin,
  inviteStructure,
};

function inviteAccountPrefet(emails, maille) {
  const apiUrl = `${process.env.REACT_APP_API_URL}/inviteAccountPrefet?role=${roleActivated()}`;

  const requestOptions = {
    method: 'POST',
    headers: Object.assign(
      { 'Content-Type': 'application/json' },
      authHeader()
    ),
    body: JSON.stringify({ emails, maille }),
  };

  return fetch(apiUrl, requestOptions).then(handleResponse);
}

function inviteAccountAdmin(email) {
  const apiUrl = `${process.env.REACT_APP_API_URL}/inviteAccountAdmin?role=${roleActivated()}`;

  const requestOptions = {
    method: 'POST',
    headers: Object.assign(
      { 'Content-Type': 'application/json' },
      authHeader()
    ),
    body: JSON.stringify({ email }),
  };

  return fetch(apiUrl, requestOptions).then(handleResponse);
}
function inviteStructure({ email, structureId }) {
  const apiUrl = `${process.env.REACT_APP_API_URL}/inviteStructure?role=${roleActivated()}`;

  const requestOptions = {
    method: 'POST',
    headers: Object.assign(
      { 'Content-Type': 'application/json' },
      authHeader()
    ),
    body: JSON.stringify({ email, structureId }),
  };

  return fetch(apiUrl, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        authenticationService.logout();
        history.push('/');
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
