import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';

export const contratService = {
  getAll,
  get,
};

function getAll(page, statutContrat) {
  return API.get(`${apiUrlRoot}/contrats?role=${roleActivated()}&page=${page}&statut=${statutContrat}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function get(id) {
  return API.get(`${apiUrlRoot}/contrat/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}
