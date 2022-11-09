import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';

export const structureService = {
  get,
  patch,
};

function get(id) {
  return API.get(`${apiUrlRoot}/structure/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function patch({ id, contact }) {
  return API.patch(`${apiUrlRoot}/structure/${id}?role=${roleActivated()}`, JSON.stringify({ contact }))
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}
