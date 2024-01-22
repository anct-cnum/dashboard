import { handleApiError, roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';
import { demandesQueryStringParameters } from '../utils/queryUtils';

export const coordinateurService = {
  getAllDemandesCoordinateur,
  getDemandeCoordinateur,
  confirmationAvisPrefet,
  confirmationRefusAvisAdmin,
  confirmationValidAvisAdmin,
  closeBanner,
};

function getAllDemandesCoordinateur(page, statutDemande, filtreSearchBar, filtreDepartement, filtreRegion, filtreAvisPrefet, ordreNom, ordre) {
  const {
    filterByName,
    filterByDepartement,
    filterByRegion,
    filterByAvisPrefet,
    ordreColonne,
  } = demandesQueryStringParameters(filtreSearchBar, filtreDepartement, filtreRegion, filtreAvisPrefet, ordreNom, ordre);

  // eslint-disable-next-line max-len
  return API.get(`${apiUrlRoot}/demandes/coordinateurs?role=${roleActivated()}&page=${page}&statut=${statutDemande}${ordreColonne}${filterByName}${filterByRegion}${filterByDepartement}${filterByAvisPrefet}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function getDemandeCoordinateur(idStructure, idDemandeCoordinateur) {
  return API.get(`${apiUrlRoot}/demandes/coordinateur/${idStructure}?role=${roleActivated()}&idDemande=${idDemandeCoordinateur}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function confirmationAvisPrefet(idStructure, avisPrefet, idDemandeCoordinateur, commentaire) {
  return API.patch(`${apiUrlRoot}/avis/prefet/coordinateur/${idStructure}?role=${roleActivated()}`, { avisPrefet, idDemandeCoordinateur, commentaire })
  .then(response => response.data)
  .catch(handleApiError);
}

function confirmationRefusAvisAdmin(idStructure, idDemandeCoordinateur) {
  return API.patch(`${apiUrlRoot}/avis/admin/refus/coordinateur/${idStructure}?role=${roleActivated()}`, { idDemandeCoordinateur })
  .then(response => response.data)
  .catch(handleApiError);
}

function confirmationValidAvisAdmin(idStructure, idDemandeCoordinateur) {
  return API.patch(`${apiUrlRoot}/avis/admin/valid/coordinateur/${idStructure}?role=${roleActivated()}`, { idDemandeCoordinateur })
  .then(response => response.data)
  .catch(handleApiError);
}

function closeBanner(idDemandeCoordinateur, idStructure, typeBanner) {
  return API.patch(`${apiUrlRoot}/banner/coordinateur/${idStructure}?role=${roleActivated()}`, { idDemandeCoordinateur, typeBanner })
  .then(response => response.data)
  .catch(handleApiError);
}
