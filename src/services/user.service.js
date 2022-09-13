import { authHeader } from '../helpers';

export const userService = {
  login,
  logout,
  verifyToken,
  inviteStructure,
  usersByStructure,
  choosePassword,
  sendForgottenPasswordEmail,
  inviteAccountsPrefet,
  updateUserEmail,
  confirmeUserEmail
};

function login(username, password) {

  const strategy = process.env.REACT_APP_STRATEGYAUTH;
  const apiUrlAuth = `${process.env.REACT_APP_API}/authentication`;

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

function inviteAccountsPrefet(emails, niveau) {
  const apiUrl = `${process.env.REACT_APP_API}/users/inviteAccountsPrefet`;

  const requestOptions = {
    method: 'POST',
    headers: Object.assign({ 'Content-Type': 'application/json' }, authHeader()),
    body: JSON.stringify({
      emails,
      niveau
    })
  };

  return fetch(apiUrl, requestOptions)
  .then(handleResponse);
}

function verifyToken(token) {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'GET'
  };

  let uri = `${apiUrlRoot}/users/verifyToken/${token}`;
  return fetch(uri, requestOptions).then(handleResponse);
}

function inviteStructure(email, structureId) {

  const apiUrl = `${process.env.REACT_APP_API}/users/inviteStructure`;
  const user = { email, structureId };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };

  return fetch(apiUrl, requestOptions)
  .then(handleResponse);
}

function usersByStructure(idStructure) {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'GET'
  };

  let uri = `${apiUrlRoot}/users/listByIdStructure/${idStructure}`;
  return fetch(uri, requestOptions).then(handleResponse);
}

function choosePassword(token, password, typeEmail) {
  const apiUrlRoot = process.env.REACT_APP_API;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'password': password,
      'typeEmail': typeEmail
    })
  };

  let uri = `${apiUrlRoot}/users/choosePassword/${token}`;
  return fetch(uri, requestOptions).then(handleResponse);
}

function sendForgottenPasswordEmail(username) {
  const apiUrlRoot = process.env.REACT_APP_API;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'username': username
    })
  };

  let uri = `${apiUrlRoot}/users/sendForgottenPasswordEmail`;
  return fetch(uri, requestOptions).then(handleResponse);
}


function updateUserEmail(id, newEmail) {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'PATCH',
    headers: Object.assign({ 'Content-Type': 'application/json' }, authHeader()),
    body: JSON.stringify({ name: newEmail })
  };

  let uri = `${apiUrlRoot}/users/sendEmailUpdate/${id}`;
  return fetch(uri, requestOptions).then(handleResponse);
}

function confirmeUserEmail(token) {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'PATCH',
    headers: authHeader(),
  };
  let uri = `${apiUrlRoot}/confirmation-email/${token}`;
  return fetch(uri, requestOptions).then(handleResponse);
}

function logout() {
  localStorage.removeItem('user');
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
        return Promise.reject({ error: 'Identifiants incorrects' });
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
