import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';
import { demandesCoordinateurQueryStringParameters } from '../utils/queryUtils';

export const coordinateurService = {
  getAllDemandesCoordinateur,
  getDemandeCoordinateur,
  confirmationAvisPrefet,
  closeBannerAvisPrefet,
};

function getAllDemandesCoordinateur(page, statutDemande, filtreSearchBar, filtreDepartement, filtreRegion, filtreAvisPrefet, ordreNom, ordre) {
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

function getDemandeCoordinateur(idStructure, idDemandeCoordinateur) {
  return API.get(`${apiUrlRoot}/demandes/coordinateur/${idStructure}?role=${roleActivated()}&idDemande=${idDemandeCoordinateur}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function confirmationAvisPrefet(idStructure, avisPrefet, idDemandeCoordinateur, commentaire) {
  return API.patch(`${apiUrlRoot}/avis/prefet/coordinateur/${idStructure}?role=${roleActivated()}`, { avisPrefet, idDemandeCoordinateur, commentaire })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function closeBannerAvisPrefet(idDemandeCoordinateur) {
  return API.patch(`${apiUrlRoot}/banner/prefet/coordinateur/${idDemandeCoordinateur}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}
