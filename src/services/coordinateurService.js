import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { demandesCoordinateurQueryStringParameters } from '../utils/queryUtils';
import { API } from './api';

export const coordinateurService = {
  getDemandesCoordinateur,
};

function getDemandesCoordinateur(page, statutDemande, filtreSearchBar, filtreDepartement, filtreRegion, filtreAvisPrefet, ordreNom, ordre) {
  const {
    ordreColonne,
    filterByName,
    filterByRegion,
    filterByDepartement,
    filterByAvisPrefet,
  } = demandesCoordinateurQueryStringParameters(filtreSearchBar, filtreDepartement, filtreRegion, filtreAvisPrefet, ordreNom, ordre);

  // eslint-disable-next-line max-len
  return API.get(`${apiUrlRoot}/demandes/coordinateurs?role=${roleActivated()}&page=${page}&statut=${statutDemande}${ordreColonne}${filterByName}${filterByRegion}${filterByDepartement}${filterByAvisPrefet}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}
