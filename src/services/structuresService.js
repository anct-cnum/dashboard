import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';

export const structuresService = {
  getStructure,
};

function getStructure(idStructure) {
  return API.get(
    `${apiUrlRoot}/structure?role=${roleActivated()}&id=${idStructure}`
  )
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

