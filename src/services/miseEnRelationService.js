import { handleApiError, roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';

export const miseEnRelationService = {
  getMisesEnRelationStructure,
  getMisesEnRelationARenouveller,
  getMisesEnRelationStats
};

function getMisesEnRelationStructure(id) {
  return API.get(`${apiUrlRoot}/misesEnRelation-structure/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(handleApiError);
}
function getMisesEnRelationARenouveller(id) {
  return API.get(`${apiUrlRoot}/misesEnRelation-renouvellement-structure/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function getMisesEnRelationStats() {
  return API.get(`${apiUrlRoot}/structures/misesEnRelation/stats?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(handleApiError);
}
