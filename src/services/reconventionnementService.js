import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';

export const reconventionnementService = {
  getAll,
};

function getAll(page) {
  return API.post(`${apiUrlRoot}/reconventionnements?role=${roleActivated()}`, { page })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}
