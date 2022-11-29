import { roleActivated, userEntityId } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';

export const statsService = {
  getMisesEnRelationStats,
  getConseillersFinalisee
};

function getMisesEnRelationStats(id) {
  return API.get(`${apiUrlRoot}/structures/${id === null ? userEntityId() : id}/misesEnRelation/stats?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => error.response.data.message);
}

function getConseillersFinalisee() {
  return API.get(`${apiUrlRoot}/stats/conseillers/finalisees?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => error.response.data.message);
}

