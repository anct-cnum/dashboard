import { authHeader } from '../helpers';
import { authenticationService } from './authentificationService';

export const statistiquesService = {
  getStatistiquesNationale,
};

function getStatistiquesNationale(dateDebut, dateFin) {
 
  const apiUrlRoot = `${process.env.REACT_APP_API_URL}/stats`;
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${apiUrlRoot}/nationales/cra?dateDebut=${dateDebut}&dateFin=${dateFin}`,
    requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        authenticationService.logout();
        return Promise.reject({ error: 'Identifiants incorrects' });
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
