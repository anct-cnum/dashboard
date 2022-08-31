import { authenticationService } from './authenticationService';
import { roleActivated, authHeader } from '../helpers';

export const exportsService = {
  getFile,
};

function getFile(name) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader())
  };

  const apiUrlRoot = process.env.REACT_APP_API_URL;

  return fetch(`${apiUrlRoot}/exports/${name}-csv?role=${roleActivated()}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.blob().then(blob => {
    const data = blob;
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        authenticationService.logout();
        history.push('/');
      }
      const error = (data && data.message) || { 'message': response.statusText, 'statut': response.status };
      return Promise.reject(error);
    }

    return data;
  });
}
