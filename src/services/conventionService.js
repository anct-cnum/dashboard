import { handleApiError, roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { conventionQueryStringParameters, historiqueConventionQueryStringParameters } from '../utils/queryUtils';
import { API } from './api';

export const conventionService = {
  getAll,
  getAllHistorique,
  get,
  updateAvenantAjoutPoste,
  updateAvenantRenduPoste,
  confirmationRefusCoselecAdmin,
  closeBanner,
};

function getAll(page, typeConvention, filtreParNomStructure, filterDepartement, filtreRegion, filtreAvisPrefet, ordreNom, ordre) {
  const {
    ordreColonne,
    filterByName,
    filterByRegion,
    filterByDepartement,
    filterByAvisPrefet
  } = conventionQueryStringParameters(filtreParNomStructure, filterDepartement, filtreRegion, filtreAvisPrefet, ordreNom, ordre);

  // eslint-disable-next-line max-len
  return API.get(`${apiUrlRoot}/conventions?role=${roleActivated()}&page=${page}&type=${typeConvention}${ordreColonne}${filterByName}${filterByRegion}${filterByDepartement}${filterByAvisPrefet}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function getAllHistorique(page, typeConvention, dateDebut, dateFin, filtreParNomStructure, filterDepartement, filtreRegion, ordreNom, ordre) {
  const {
    ordreColonne,
    filterByName,
    filterByRegion,
    filterByDepartement,
    filterDateStart,
    filterDateEnd
  } = historiqueConventionQueryStringParameters(filtreParNomStructure, filterDepartement, filtreRegion, ordreNom, ordre, dateDebut, dateFin);

  // eslint-disable-next-line max-len
  return API.get(`${apiUrlRoot}/historique/conventions?role=${roleActivated()}&page=${page}&type=${typeConvention}${filterDateStart}${filterDateEnd}${ordreColonne}${filterByName}${filterByRegion}${filterByDepartement}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function get(id) {
  return API.get(`${apiUrlRoot}/convention/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function updateAvenantAjoutPoste(id, statut, nbDePosteAccorder, nbDePosteCoselec) {
  return API.patch(`${apiUrlRoot}/avenant/ajout-poste/${id}?role=${roleActivated()}`, { statut, nbDePosteAccorder, nbDePosteCoselec })
  .then(response => response.data)
  .catch(handleApiError);
}

function updateAvenantRenduPoste(id, nbDePosteRendu, nbDePosteCoselec) {
  return API.patch(`${apiUrlRoot}/avenant/rendu-poste/${id}?role=${roleActivated()}`, { nbDePosteRendu, nbDePosteCoselec })
  .then(response => response.data)
  .catch(handleApiError);
}

function confirmationRefusCoselecAdmin(id) {
  return API.patch(`${apiUrlRoot}/conventions/admin/refus/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function closeBanner(type, id) {
  return API.patch(`${apiUrlRoot}/banniere/${id}?type=${type}&role=${roleActivated()}`)
  .then(response => response.data)
  .catch(handleApiError);
}
