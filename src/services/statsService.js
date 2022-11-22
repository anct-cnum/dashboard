import { userEntityId } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';

export const statsService = {
  getMisesEnRelationStats,
  getConseillersFinalisee
};

function getMisesEnRelationStats(id) {
  return API.get(`${apiUrlRoot}/structures/${id === null ? userEntityId() : id}/misesEnRelation/stats`)
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function getConseillersFinalisee() {
  return API.get(`${apiUrlRoot}/stats/conseillers/finalisees`)
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

