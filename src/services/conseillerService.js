import { userEntityId, roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';
import { conseillerQueryStringParameters } from '../utils/queryUtils';

export const conseillerService = {
  get,
  getCandidat,
  getAllRecruter,
  getAllCandidats,
  getAllMisesEnRelation,
  updateStatus,
  updateDateRecrutement,
  updateDateRupture,
  updateMotifRupture,
  preSelectionner,
  getCurriculumVitae
};

function get(id) {

  return API.get(`${apiUrlRoot}/conseiller/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function getCandidat(id) {
  
  return API.get(`${apiUrlRoot}/candidat/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

// eslint-disable-next-line max-len
function getAllRecruter(page, dateDebut, dateFin, filtreCoordinateur, filtreRupture, filtreParNomConseiller, filtreParRegion, filtreParNomStructure, nomOrdre, ordre) {

  let {
    ordreColonne,
    filterDateStart,
    filterDateEnd,
    filterByNameConseiller,
    rupture,
    coordinateur,
    filterByRegion,
    filterByNameStructure,
  // eslint-disable-next-line max-len
  } = conseillerQueryStringParameters(nomOrdre, ordre, dateDebut, dateFin, filtreParNomConseiller, filtreRupture, filtreCoordinateur, filtreParRegion, filtreParNomStructure);

  // eslint-disable-next-line max-len
  let uri = `${apiUrlRoot}/conseillers-recruter?skip=${page}${filterByNameConseiller}${filterDateStart}${filterDateEnd}${rupture}${ordreColonne}${coordinateur}${filterByRegion}${filterByNameStructure}&role=${roleActivated()}`;

  return API.get(uri)
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function getAllCandidats(departement, region, com, search, page, filter, sortData, sortOrder, persoFilters) {

  const filterDepartement = departement !== null ? `&codeDepartement=${departement}` : '';
  const filterRegion = region !== null ? `&codeRegion=${region}` : '';
  const filterCom = com !== null ? `&codeCom=${com}` : '';
  const filterSearch = search !== '' ? `&$search=${search}&$limit=100` : '';
  const filterSort = search === '' ? `&$sort[${sortData}]=${sortOrder}` : '';

  let uri = `${apiUrlRoot}/conseillers?$skip=${page}${filterSort}${filterDepartement}${filterRegion}${filterCom}${filterSearch}`;

  if (persoFilters) {
    //Recrutés ?
    if (persoFilters?.recrutes !== undefined && persoFilters?.recrutes !== '') {
      uri += `&statut=${persoFilters?.recrutes}`;
    }
  }

  if (filter) {
    uri += `&filter=${filter}`;
  }

  return API.get(uri)
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function getAllMisesEnRelation(departement, region, com, structureId, search, page, filter, sortData, sortOrder, persoFilters) {
 
  const filterDepartement = departement !== null ? `&codeDepartement=${departement}` : '';
  const filterRegion = region !== null ? `&codeRegion=${region}` : '';
  const filterCom = com !== null ? `&codeCom=${com}` : '';
  const filterSearch = search !== '' ? `&$search=${search}` : '';
  const filterSort = search === '' ? `&$sort[${sortData}]=${sortOrder}` : '';
  let uri = `${apiUrlRoot}/structures/${structureId ? structureId : userEntityId()}/misesEnRelation?\
$skip=${page}${filterSort}${filterDepartement}${filterRegion}${filterCom}${filterSearch}&role=${roleActivated()}`;

  if (filter) {
    uri += `&filter=${filter}`;
  }
  if (persoFilters) {
    if (havePix(persoFilters)) {
      uri += `&pix=${persoFilters?.pix}`;
    }
    if (haveDiplome(persoFilters)) {
      uri += `&diplome=${persoFilters?.diplome}`;
    }
    if (haveCV(persoFilters)) {
      uri += `&cv=${persoFilters?.cv}`;
    }
  }

  return API.get(uri)
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function updateStatus(id, statut) {
  return API.patch(`${apiUrlRoot}/misesEnRelation/${id}`, JSON.stringify({
    statut }))
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function preSelectionner(conseillerId, structureId) {
  return fetch(`${apiUrlRoot}/structures/${structureId}/preSelectionner/${conseillerId}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function updateDateRecrutement(id, date) {
  return API.patch(`${apiUrlRoot}/misesEnRelation/${id}`, JSON.stringify({
    dateRecrutement: date
  }))
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function updateDateRupture(id, date) {
  return API.patch(`${apiUrlRoot}/misesEnRelation/${id}`, JSON.stringify({
    dateRupture: date
  }))
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function updateMotifRupture(id, motif) {
  return API.patch(`${apiUrlRoot}/misesEnRelation/${id}`, JSON.stringify({
    motifRupture: motif
  }))
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function getCurriculumVitae(id) {
  return API.get(`${apiUrlRoot}/conseillers/${id}/cv`)
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function haveCV(persoFilters) {
  return persoFilters?.cv !== undefined && persoFilters?.cv !== null;
}
function haveDiplome(persoFilters) {
  return persoFilters?.diplome !== undefined && persoFilters?.diplome !== null;
}
function havePix(persoFilters) {
  return persoFilters?.pix !== undefined && persoFilters?.pix.length > 0;
}
