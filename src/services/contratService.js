import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';

export const contratService = {
  getAll,
  validationRenouvellement,
  getAllHistorique,
  createContract,
  updateContract,
};

function getAll(page, statutContrat) {
  return API.get(`${apiUrlRoot}/contrats?role=${roleActivated()}&page=${page}&statut=${statutContrat}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function validationRenouvellement(id) {
  return API.patch(`${apiUrlRoot}/contrat/validation-renouvellement/${id}?role=${roleActivated()}`)
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

function createContract(typeDeContrat, dateDebutDeContrat, dateFinDeContrat, salaire, miseEnrelationId, structureId) {
  // eslint-disable-next-line max-len
  return API.post(`${apiUrlRoot}/contrat?role=${roleActivated()}`, { typeDeContrat, dateDebutDeContrat, dateFinDeContrat, salaire, miseEnrelationId, structureId })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function updateContract(typeDeContrat, dateDebutDeContrat, dateFinDeContrat, salaire, id) {
  return API.patch(`${apiUrlRoot}/contrat/${id}?role=${roleActivated()}`, { typeDeContrat, dateDebutDeContrat, dateFinDeContrat, salaire })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}
