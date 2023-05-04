import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';

export const reconventionnementService = {
  getAll,
  get,
  update,
  validation
};

function getAll(page) {
  return API.get(`${apiUrlRoot}/reconventionnements?role=${roleActivated()}&page=${page}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function get(id) {
  return API.get(`${apiUrlRoot}/reconventionnement/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}
function update(structureId, action, misesEnRelations, nombreDePostes, motif) {
  return API.patch(`${apiUrlRoot}/reconventionnement?structureId=${structureId}&action=${action}
  &nombreDePostes=${nombreDePostes}&motif=${motif}&role=${roleActivated()}`, { misesEnRelations })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function validation(id) {
  return API.patch(`${apiUrlRoot}/validation/reconventionnement/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}
