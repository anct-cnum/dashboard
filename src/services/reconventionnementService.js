import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';

export const reconventionnementService = {
  getAll,
  getAllHistorique,
  get
};

function getAll(page, typeConvention) {
  return API.get(`${apiUrlRoot}/reconventionnements?role=${roleActivated()}&page=${page}&type=${typeConvention}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getAllHistorique(page, typeConvention, dateDebut, dateFin) {
  const filterDateStart = (dateDebut !== '') ? `&dateDebut=${new Date(dateDebut).toISOString()}` : '';
  const filterDateEnd = (dateFin !== '') ? `&dateFin=${new Date(dateFin).toISOString()}` : '';
  // eslint-disable-next-line max-len
  return API.get(`${apiUrlRoot}/historique/reconventionnements?role=${roleActivated()}&page=${page}&type=${typeConvention}${filterDateStart}${filterDateEnd}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function get(id) {
  return API.get(`${apiUrlRoot}/reconventionnement/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}
