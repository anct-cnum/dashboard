import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';

export const userService = {
  verifyToken,
  getUsers
};

function verifyToken(token) {
  return API.get(`${apiUrlRoot}/users/verifyToken/${token}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function getUsers() {
  return API.get(`${apiUrlRoot}/users?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}
