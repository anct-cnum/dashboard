import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { contratQueryStringParameters } from '../utils/queryUtils';
import { API } from './api';

export const contratService = {
  getAll,
  validationRenouvellement,
  validationRecrutement,
  getAllHistorique,
  createContract,
  updateContractRecrutement,
  updateContract,
};

function getAll(page, statutContrat, filtreSearchBar, filtreDepartement, filtreRegion, filtreStatutDossierRupture, ordreNom, ordre) {
  // eslint-disable-next-line max-len
  const filterByStatutDossierRupture = filtreStatutDossierRupture !== 'tous' && filtreStatutDossierRupture !== undefined ? `&statutDossierRupture=${filtreStatutDossierRupture}` : '';
  const {
    ordreColonne,
    filterByName,
    filterByRegion,
    filterByDepartement,
  } = contratQueryStringParameters(filtreSearchBar, filtreDepartement, filtreRegion, ordreNom, ordre);

  // eslint-disable-next-line max-len
  return API.get(`${apiUrlRoot}/contrats?role=${roleActivated()}&page=${page}&statut=${statutContrat}${ordreColonne}${filterByName}${filterByRegion}${filterByDepartement}${filterByStatutDossierRupture}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function validationRenouvellement(id) {
  return API.patch(`${apiUrlRoot}/contrat/validation-renouvellement/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function validationRecrutement(id) {
  return API.patch(`${apiUrlRoot}/contrat/validation-recrutement/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getAllHistorique(page, statutContrat, dateDebut, dateFin, filtreSearchBar, filtreDepartement, filtreRegion, ordreNom, ordre) {
  const filterDateStart = (dateDebut !== '') ? `&dateDebut=${new Date(dateDebut).toISOString()}` : '';
  const filterDateEnd = (dateFin !== '') ? `&dateFin=${new Date(dateFin).toISOString()}` : '';
  const {
    ordreColonne,
    filterByName,
    filterByRegion,
    filterByDepartement
  } = contratQueryStringParameters(filtreSearchBar, filtreDepartement, filtreRegion, ordreNom, ordre);

  // eslint-disable-next-line max-len
  return API.get(`${apiUrlRoot}/historique/contrats?role=${roleActivated()}&page=${page}&statut=${statutContrat}${filterDateStart}${filterDateEnd}${ordreColonne}${filterByName}${filterByRegion}${filterByDepartement}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function createContract(typeDeContrat, dateDebutDeContrat, dateFinDeContrat, salaire, miseEnrelationId) {
  // eslint-disable-next-line max-len
  return API.post(`${apiUrlRoot}/renouvellement/contrat?role=${roleActivated()}`, { typeDeContrat, dateDebutDeContrat, dateFinDeContrat, salaire, miseEnrelationId })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function updateContractRecrutement(typeDeContrat, dateDebutDeContrat, dateFinDeContrat, salaire, miseEnrelationId) {
  // eslint-disable-next-line max-len
  return API.patch(`${apiUrlRoot}/recrutement/contrat/${miseEnrelationId}?role=${roleActivated()}`, { typeDeContrat, dateDebutDeContrat, dateFinDeContrat, salaire })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function updateContract(typeDeContrat, dateDebutDeContrat, dateFinDeContrat, salaire, id) {
  return API.patch(`${apiUrlRoot}/contrat/${id}?role=${roleActivated()}`, { typeDeContrat, dateDebutDeContrat, dateFinDeContrat, salaire })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}
