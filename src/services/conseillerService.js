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
  getCurriculumVitae,
  validationRupture,
  dossierIncompletRupture
};

function get(id) {
  return API.get(`${apiUrlRoot}/conseiller/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getCandidat(id) {
  return API.get(`${apiUrlRoot}/candidat/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

// eslint-disable-next-line max-len
function getAllRecruter(page, dateDebut, dateFin, filtreRupture, filtreCoordinateur, filtreParNomConseiller, filtreParRegion, filtreParNomStructure, nomOrdre, ordre) {
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
  .catch(error => Promise.reject(error.response.data.message));
}

function getAllCandidats(departement, region, com, search, page, filter, sortData, sortOrder, persoFilters) {
  const filterDepartement = departement !== null ? `&codeDepartement=${departement}` : '';
  const filterRegion = region !== null ? `&codeRegion=${region}` : '';
  const filterCom = com !== null ? `&codeCom=${com}` : '';
  const filterSearch = search !== '' ? `&$search=${search}&$limit=100` : '';
  const filterSort = search === '' ? `&$sort[${sortData}]=${sortOrder}` : '';

  let uri = `${apiUrlRoot}/conseillers?$skip=${page}${filterSort}${filterDepartement}${filterRegion}${filterCom}${filterSearch}?role=${roleActivated()}`;

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
  .catch(error => Promise.reject(error.response.data.message));
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
  .catch(error => Promise.reject(error.response.data.message));
}

function updateStatus(id, statut) {
  return API.patch(`${apiUrlRoot}/misesEnRelation/${id}?role=${roleActivated()}`, {
    statut })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function preSelectionner(conseillerId, structureId) {
  return API.patch(`${apiUrlRoot}/structures/${structureId}/preSelectionner/${conseillerId}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function updateDateRecrutement(id, date) {
  return API.patch(`${apiUrlRoot}/misesEnRelation/${id}?role=${roleActivated()}`, {
    dateRecrutement: date
  })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function updateDateRupture(id, date) {
  return API.patch(`${apiUrlRoot}/misesEnRelation/${id}?role=${roleActivated()}`, {
    dateRupture: date
  })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function updateMotifRupture(id, motif) {
  return API.patch(`${apiUrlRoot}/misesEnRelation/${id}?role=${roleActivated()}`, {
    motifRupture: motif
  })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getCurriculumVitae(id) {
  return API.get(`${apiUrlRoot}/candidat/${id}/cv?role=${roleActivated()}`, { responseType: 'blob' })
  .then(response => response.data)
  .catch(); //rien ici dans le cas blob sinon erreur non affiché
}

function validationRupture(id, dateFinDeContrat) {
  return API.patch(`${apiUrlRoot}/conseiller/rupture/validation/${id}?role=${roleActivated()}`, {
    dateFinDeContrat
  })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function dossierIncompletRupture(id) {
  return API.patch(`${apiUrlRoot}/conseiller/rupture/incomplet/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
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
