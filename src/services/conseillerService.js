import { authHeader, history, userEntityId, roleActivated } from '../helpers';
import { authenticationService } from './authenticationService';
import apiUrlRoot from '../helpers/apiUrl';
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
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${apiUrlRoot}/conseiller/${id}?role=${roleActivated()}`, requestOptions).then(handleResponse);
}

function getCandidat(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${apiUrlRoot}/candidat/${id}?role=${roleActivated()}`, requestOptions).then(handleResponse);
}

// eslint-disable-next-line max-len
function getAllRecruter(page, dateDebut, dateFin, filtreCoordinateur, filtreRupture, filtreParNomConseiller, filtreParRegion, filtreParNomStructure, nomOrdre, ordre) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
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

  return fetch(uri, requestOptions).then(handleResponse);
}

function getAllCandidats(departement, region, com, search, page, filter, sortData, sortOrder, persoFilters) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
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
  return fetch(uri, requestOptions).then(handleResponse);
}

function getAllMisesEnRelation(departement, region, com, structureId, search, page, filter, sortData, sortOrder, persoFilters) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
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

  return fetch(uri, requestOptions).then(handleResponse);
}

function updateStatus(id, statut) {
  const requestOptions = {
    method: 'PATCH',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      statut: statut
    })
  };

  return fetch(`${apiUrlRoot}/misesEnRelation/${id}`, requestOptions).then(handleResponse);
}

function preSelectionner(conseillerId, structureId) {
  const requestOptions = {
    method: 'POST',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' })
  };

  return fetch(`${apiUrlRoot}/structures/${structureId}/preSelectionner/${conseillerId}`, requestOptions).then(handleResponse);
}

function updateDateRecrutement(id, date) {
  const requestOptions = {
    method: 'PATCH',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      dateRecrutement: date
    })
  };

  return fetch(`${apiUrlRoot}/misesEnRelation/${id}`, requestOptions).then(handleResponse);
}

function updateDateRupture(id, date) {
  const requestOptions = {
    method: 'PATCH',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      dateRupture: date
    })
  };

  return fetch(`${apiUrlRoot}/misesEnRelation/${id}`, requestOptions).then(handleResponse);
}

function updateMotifRupture(id, motif) {
  const requestOptions = {
    method: 'PATCH',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      motifRupture: motif
    })
  };

  return fetch(`${apiUrlRoot}/misesEnRelation/${id}`, requestOptions).then(handleResponse);
}

function getCurriculumVitae(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${apiUrlRoot}/candidat/${id}/cv`, requestOptions).then(handleFileResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        authenticationService.logout();
        return Promise.reject({ error: 'Identifiants incorrects' });
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
  
    return data;
  });
}

function handleFileResponse(response) {
  return response.blob().then(blob => {
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        authenticationService.logout();
        history.push('/');
      }
      const error = (blob && blob.message) || response.statusText;
      return Promise.reject(error);
    }
    return blob;
  });
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
