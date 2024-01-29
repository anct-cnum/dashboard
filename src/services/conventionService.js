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
};

function getAll(page, typeConvention, filtreParNomStructure, filterDepartement, filtreRegion, filtreAvisPrefet, ordreNom, ordre) {
  const {
    filterByName,
    filterByDepartement,
    filterByRegion,
    filterByAvisPrefet,
    ordreColonne,
  } = conventionQueryStringParameters(filtreParNomStructure, filterDepartement, filtreRegion, filtreAvisPrefet, ordreNom, ordre);

  // eslint-disable-next-line max-len
  return API.get(`${apiUrlRoot}/conventions?role=${roleActivated()}&page=${page}&type=${typeConvention}${ordreColonne}${filterByName}${filterByRegion}${filterByDepartement}${filterByAvisPrefet}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function getAllHistorique(page, typeConvention, dateDebut, dateFin, filtreParNomStructure, filterDepartement, filtreRegion, filtreAvisAdmin, ordreNom, ordre) {
  const {
    filterDateStart,
    filterDateEnd,
    filterByName,
    filterByDepartement,
    filterByRegion,
    filterByAvisAdmin,
    ordreColonne,
  } = historiqueConventionQueryStringParameters(dateDebut, dateFin, filtreParNomStructure, filterDepartement, filtreRegion, filtreAvisAdmin, ordreNom, ordre);

  // eslint-disable-next-line max-len
  return API.get(`${apiUrlRoot}/historique/conventions?role=${roleActivated()}&page=${page}&type=${typeConvention}${filterDateStart}${filterDateEnd}${ordreColonne}${filterByName}${filterByRegion}${filterByDepartement}${filterByAvisAdmin}`)
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
