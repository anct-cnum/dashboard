import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';

export const miseEnRelationService = {
  getMisesEnRelationStructure
};

function getMisesEnRelationStructure(id) {
  return API.get(`${apiUrlRoot}/misesEnRelation-structure/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}
