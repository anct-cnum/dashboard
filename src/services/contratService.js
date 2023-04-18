import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';

export const contratService = {
  getAll,
  getAllHistorique,
  get
};

function getAll(page, typeContrat) {
  return API.get(`${apiUrlRoot}/contrats?role=${roleActivated()}&page=${page}&type=${typeContrat}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getAllHistorique(page, typeContrat, dateDebut, dateFin) {
  const filterDateStart = (dateDebut !== '') ? `&dateDebut=${new Date(dateDebut).toISOString()}` : '';
  const filterDateEnd = (dateFin !== '') ? `&dateFin=${new Date(dateFin).toISOString()}` : '';

  return API.get(`${apiUrlRoot}/historique/contrats?role=${roleActivated()}&page=${page}&type=${typeContrat}${filterDateStart}${filterDateEnd}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function get(id) {
  return API.get(`${apiUrlRoot}/contrat/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}
