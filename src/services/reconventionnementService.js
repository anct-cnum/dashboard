import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';

export const reconventionnementService = {
  getAll,
  get
};

function getAll(page, typeConvention) {
  return API.get(`${apiUrlRoot}/reconventionnements?role=${roleActivated()}&page=${page}&type=${typeConvention}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function get(id) {
  return API.get(`${apiUrlRoot}/reconventionnement/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}
