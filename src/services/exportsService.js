import { authenticationService } from './authenticationService';
import { roleActivated, authHeader } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';

export const exportsService = {
  getFile,
  getExportDonneesTerritoire,
  getStatistiquesCSV,
  getExportDonneesConseiller
};

function getFile(name) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader())
  };

  return fetch(`${apiUrlRoot}/exports/${name}-csv?role=${roleActivated()}`, requestOptions).then(handleResponse);
}

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

function conseillerQueryStringParameters(nomOrdre, ordre, dateDebut, dateFin, filtreCoordinateur, filtreRupture, filtreParNom, filtreParRegion) {
  const filterDateStart = (dateDebut !== '') ? `&dateDebut=${new Date(dateDebut).toISOString()}` : '';
  const filterDateEnd = (dateFin !== '') ? `&dateFin=${new Date(dateFin).toISOString()}` : '';
  const filterByName = filtreParNom ? `&search=${filtreParNom}` : '';
  const filterByRegion = filtreParRegion !== 'tous' ? `&region=${filtreParRegion}` : '';
  const ordreColonne = nomOrdre ? '&nomOrdre=' + nomOrdre + '&ordre=' + ordre : '';

  let coordinateur = '';
  switch (filtreCoordinateur) {
    case 'tous':
      coordinateur = '';
      break;
    case 'true':
      coordinateur = `&coordinateur=true`;
      break;
    case 'false':
      coordinateur = `&coordinateur=false`;
      break;
    default:
      break;
  }
  let rupture = '';
  switch (filtreRupture) {
    case 'tous':
      rupture = '';
      break;
    case 'true':
      rupture = `&rupture=true`;
      break;
    case 'false':
      rupture = `&rupture=false`;
      break;
    default:
      break;
  }

  return { ordreColonne, filterDateStart, filterDateEnd, rupture, coordinateur, filterByName, filterByRegion };
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

  const exportTerritoiresRoute = '/territoires-csv';
  return handleResponse(
    // eslint-disable-next-line max-len
    await fetch(`${apiUrlRoot}${exportTerritoiresRoute}${territoireQueryString(nomOrdre, territoire, ordre, dateDebut, dateFin)}&role=${roleActivated()}`, requestOptions)
  );
}

async function getExportDonneesConseiller(dateDebut, dateFin, filtreRupture, filtreCoordinateur, filtreParNom, filtreParRegion, nomOrdre, ordre) {
  const apiUrlRoot = `${process.env.REACT_APP_API_URL}/exports`;
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(
      authHeader(), {
        'Accept': 'text/plain',
        'Content-Type': 'text/plain'
      })
  };

  const exportConseillersRoute = '/conseillers-csv';
  let {
    ordreColonne,
    filterDateStart,
    filterDateEnd,
    rupture,
    coordinateur,
    filterByName,
    filterByRegion
  } = conseillerQueryStringParameters(nomOrdre, ordre, dateDebut, dateFin, filtreCoordinateur, filtreRupture, filtreParNom, filtreParRegion);
  return handleResponse(
    // eslint-disable-next-line max-len
    await fetch(`${apiUrlRoot}${exportConseillersRoute}?role=${roleActivated()}${filterByName}${filterDateStart}${filterDateEnd}${rupture}${ordreColonne}${coordinateur}${filterByRegion}`, requestOptions)
  );
}

function getStatistiquesCSV(dateDebut, dateFin, type, idType, conseillerIds, codePostal) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };
  const role = type === 'nationales' ? 'anonyme' : roleActivated();
  // eslint-disable-next-line max-len
  return fetch(`${apiUrlRoot}/exports/statistiques-csv?role=${role}&dateDebut=${dateDebut}&dateFin=${dateFin}&type=${type}&idType=${idType}&codePostal=${codePostal}&conseillerIds=${conseillerIds}`,
    requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.blob().then(blob => {
    const data = blob;
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        authenticationService.logout();
        history.push('/');
      }
      const error = (data && data.message) || { 'message': response.statusText, 'statut': response.status };
      return Promise.reject(error);
    }

    return data;
  });
}
