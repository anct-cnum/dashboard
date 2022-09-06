import { authHeader } from '../helpers';
import { authenticationService } from './authenticationService';

export const statistiquesService = {
  getTerritoire,
  getDatasStructures,
  getDatasTerritoires,
  getStatistiquesTerritoire,
  getStatistiquesStructure,
  getStatistiquesNationale,
  getCodesPostauxCrasConseillerStructure,
  getExportDonneesTerritoire,
  getStatistiquesPDF,
  getStatistiquesCSV,
};

function territoireQueryString(nomOrdre, territoire, ordre, dateDebut, dateFin, page) {
  if (nomOrdre === 'code') {
    nomOrdre = territoire;
  } else if (nomOrdre === 'nom') {
    //Afin d'obtenir nomDepartemement ou nomRegion
    nomOrdre += territoire.slice(4);
  }
  const ordreColonne = nomOrdre ? '&nomOrdre=' + nomOrdre + '&ordre=' + ordre : '';
  const pageIfDefined = page ? '&page=' + page : '';

  return `?territoire=${territoire}&dateDebut=${dateDebut}&dateFin=${dateFin}${pageIfDefined}${ordreColonne}`;
}

function getTerritoire(typeTerritoire, idTerritoire, date) {
  const apiUrlRoot = `${process.env.REACT_APP_API_URL}/stats`;
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };
  return fetch(
    `${apiUrlRoot}/admincoop/territoire?typeTerritoire=${typeTerritoire}&idTerritoire=${idTerritoire}&dateFin=${date}`,
    requestOptions
  ).then(handleResponse);
}

function getDatasStructures(dateDebut, dateFin, page) {
  const apiUrlRoot = `${process.env.REACT_APP_API_URL}/stats`;
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };

  return fetch(
    `${apiUrlRoot}/prefet/structures?dateDebut=${dateDebut}&dateFin=${dateFin}&page=${page}`,
    requestOptions
  ).then(handleResponse);
}

function getDatasTerritoires(territoire, dateDebut, dateFin, page, nomOrdre, ordre) {
  const apiUrlRoot = `${process.env.REACT_APP_API_URL}/stats`;
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };

  return fetch(
    `${apiUrlRoot}/admincoop/territoires${territoireQueryString(nomOrdre, territoire, ordre, dateDebut, dateFin, page)}`,
    requestOptions
  ).then(handleResponse);
}

function getStatistiquesTerritoire(dateDebut, dateFin, typeTerritoire, conseillerIds) {
  const apiUrlRoot = `${process.env.REACT_APP_API_URL}/stats`;
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };
  conseillerIds = JSON.stringify(conseillerIds);
  return fetch(`${apiUrlRoot}/territoire/cra?dateDebut=${dateDebut}&dateFin=${dateFin}&typeTerritoire=${typeTerritoire}&conseillerIds=${conseillerIds}`,
    requestOptions).then(handleResponse);
}

function getStatistiquesStructure(dateDebut, dateFin, idStructure, codePostal) {
  const apiUrlRoot = `${process.env.REACT_APP_API_URL}/stats`;
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };
  return fetch(`${apiUrlRoot}/structure/cra?dateDebut=${dateDebut}&dateFin=${dateFin}&idStructure=${idStructure}&codePostal=${codePostal}`,
    requestOptions).then(handleResponse);
}

function getStatistiquesNationale(dateDebut, dateFin) {
  const apiUrlRoot = `${process.env.REACT_APP_API_URL}/stats`;
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${apiUrlRoot}/nationales/cra?dateDebut=${dateDebut}&dateFin=${dateFin}`,
    requestOptions).then(handleResponse);
}

function getCodesPostauxCrasConseillerStructure(idStructure) {
  const apiUrlRoot = `${process.env.REACT_APP_API_URL}/stats`;
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${apiUrlRoot}/cra/codesPostaux/structure/${idStructure}`, requestOptions).then(handleResponse);
}

async function getExportDonneesTerritoire(territoire, dateDebut, dateFin, nomOrdre, ordre) {
  const apiUrlRoot = `${process.env.REACT_APP_API_URL}/exports`;
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(
      authHeader(), {
        'Accept': 'text/plain',
        'Content-Type': 'text/plain'
      })
  };

  const exportTerritoiresRoute = '/territoires.csv/';
  return handleFileResponse(
    await fetch(`${apiUrlRoot}${exportTerritoiresRoute}${territoireQueryString(nomOrdre, territoire, ordre, dateDebut, dateFin)}`, requestOptions)
  );
}

function getStatistiquesPDF(dateDebut, dateFin, type, idType, codePostal) {
  const apiUrlRoot = `${process.env.REACT_APP_API_URL}/stats`;
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };
  
  // eslint-disable-next-line max-len
  return fetch(`${apiUrlRoot}/admincoop/statistiques.pdf?dateDebut=${dateDebut}&dateFin=${dateFin}&type=${type}&idType=${idType}&codePostal=${codePostal}`,
    requestOptions).then(response => !response.ok ? handleResponse(response) : handleFileResponse(response));
}

function getStatistiquesCSV(dateDebut, dateFin, type, idType, conseillerIds, codePostal) {
  const apiUrlRoot = `${process.env.REACT_APP_API_URL}/stats`;
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };

  // eslint-disable-next-line max-len
  return fetch(`${apiUrlRoot}/statistiques.csv?dateDebut=${dateDebut}&dateFin=${dateFin}&type=${type}&idType=${idType}&codePostal=${codePostal}&conseillerIds=${conseillerIds}`,
    requestOptions).then(handleFileResponse);
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

