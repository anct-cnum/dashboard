import { roleActivated, authHeader } from '../helpers';
import { authenticationService } from './authenticationService';
import apiUrlRoot from '../helpers/apiUrl';
import { territoireQueryString } from '../utils/queryUtils';

export const statistiquesService = {
  getTerritoire,
  getDatasStructures,
  getDatasTerritoires,
  getStatistiquesTerritoire,
  getStatistiquesStructure,
  getStatistiquesNationale,
  getCodesPostauxCrasConseillerStructure,
};

function getTerritoire(typeTerritoire, idTerritoire, date) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };
  return fetch(
    `${apiUrlRoot}/stats/territoire?typeTerritoire=${typeTerritoire}&idTerritoire=${idTerritoire}&dateFin=${date}&role=${roleActivated()}`,
    requestOptions
  ).then(handleResponse);
}

function getDatasStructures(dateDebut, dateFin, page) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' })
  };

  return fetch(
    `${apiUrlRoot}/stats/datas/structures?role=${roleActivated()}&dateDebut=${dateDebut}&dateFin=${dateFin}&page=${page}`,
    requestOptions
  ).then(handleResponse);
}

function getDatasTerritoires(territoire, dateDebut, dateFin, page, nomOrdre, ordre) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };

  return fetch(
    `${apiUrlRoot}/stats/territoires${territoireQueryString(nomOrdre, territoire, ordre, dateDebut, dateFin, page)}&role=${roleActivated()}`,
    requestOptions
  ).then(handleResponse);
}

function getStatistiquesTerritoire(dateDebut, dateFin, typeTerritoire, conseillerIds) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };
  conseillerIds = JSON.stringify(conseillerIds);
  return fetch(`${apiUrlRoot}/stats/territoire/cra?dateDebut=${dateDebut}&dateFin=${dateFin}&conseillerIds=${conseillerIds}&role=${roleActivated()}`,
    requestOptions).then(handleResponse);
}

function getStatistiquesStructure(dateDebut, dateFin, idStructure, codePostal) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };
  return fetch(
    `${apiUrlRoot}/stats/structure/cras?role=${roleActivated()}&dateDebut=${dateDebut}&dateFin=${dateFin}&idStructure=${idStructure}&codePostal=${codePostal}`,
    requestOptions).then(handleResponse);
}

function getStatistiquesNationale(dateDebut, dateFin) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${apiUrlRoot}/stats/nationales/cras?role=anonyme&dateDebut=${dateDebut}&dateFin=${dateFin}`,
    requestOptions).then(handleResponse);
}

function getCodesPostauxCrasConseillerStructure(idStructure) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${apiUrlRoot}/cras/codesPostaux/structure?role=${roleActivated()}&&id=${idStructure}`, requestOptions).then(handleResponse);
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


