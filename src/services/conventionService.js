import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';

export const conventionService = {
  getAll,
  getAllHistorique,
  get,
  updateAvenantAjoutPoste,
  validationAvenantRenduPoste,
};

function getAll(page, typeConvention) {
  return API.get(`${apiUrlRoot}/conventions?role=${roleActivated()}&page=${page}&type=${typeConvention}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getAllHistorique(page, typeConvention, dateDebut, dateFin) {
  const filterDateStart = (dateDebut !== '') ? `&dateDebut=${new Date(dateDebut).toISOString()}` : '';
  const filterDateEnd = (dateFin !== '') ? `&dateFin=${new Date(dateFin).toISOString()}` : '';
  // eslint-disable-next-line max-len
  return API.get(`${apiUrlRoot}/historique/conventions?role=${roleActivated()}&page=${page}&type=${typeConvention}${filterDateStart}${filterDateEnd}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function get(id) {
  return API.get(`${apiUrlRoot}/convention/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function updateAvenantAjoutPoste(id, statut, nbDePosteAccorder, nbDePosteCoselec) {
  return API.patch(`${apiUrlRoot}/avenant/ajout-poste/${id}?role=${roleActivated()}`, { statut, nbDePosteAccorder, nbDePosteCoselec })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function validationAvenantRenduPoste(id, nbDePosteAccorder, nbDePosteCoselec) {
  return API.patch(`${apiUrlRoot}/avenant/rendu-poste/${id}?role=${roleActivated()}`, { nbDePosteAccorder, nbDePosteCoselec })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}
