import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';

export const contratService = {
  getAll,
  getAllHistorique,
};

function getAll(page, statutContrat) {
  return API.get(`${apiUrlRoot}/contrats?role=${roleActivated()}&page=${page}&statut=${statutContrat}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getAllHistorique(page, statutContrat, dateDebut, dateFin) {
  const filterDateStart = (dateDebut !== '') ? `&dateDebut=${new Date(dateDebut).toISOString()}` : '';
  const filterDateEnd = (dateFin !== '') ? `&dateFin=${new Date(dateFin).toISOString()}` : '';

  return API.get(`${apiUrlRoot}/historique/contrats?role=${roleActivated()}&page=${page}&statut=${statutContrat}${filterDateStart}${filterDateEnd}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}
