import { authHeader, history, userEntityId } from '../helpers';
import { userService } from './userService';

export const statsService = {
  getMisesEnRelationStats,
  getConseillersFinalisee
};

function getMisesEnRelationStats(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  const apiUrlRoot = process.env.REACT_APP_API_URL;

  return fetch(`${apiUrlRoot}/structures/${id === null ? userEntityId() : id}/misesEnRelation/stats`, requestOptions).then(handleResponse);
}

function getConseillersFinalisee() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  const apiUrlRoot = process.env.REACT_APP_API_URL;

  return fetch(`${apiUrlRoot}/stats/conseillers/finalisees`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        userService.logout();
        history.push('/');
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
