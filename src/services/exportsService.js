import { authenticationService } from './authenticationService';
import { roleActivated, authHeader } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { conseillerQueryStringParameters, territoireQueryString, structureQueryStringParameters } from '../utils/queryUtils';

export const exportsService = {
  getFile,
  getExportDonneesTerritoire,
  getStatistiquesCSV,
  getExportDonneesConseiller,
  getExportDonneesStructure
};

function getFile(name) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader())
  };

  return fetch(`${apiUrlRoot}/exports/${name}-csv?role=${roleActivated()}`, requestOptions).then(handleResponse);
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

// eslint-disable-next-line max-len
async function getExportDonneesConseiller(dateDebut, dateFin, filtreRupture, filtreCoordinateur, filtreParNomConseiller, filtreParRegion, filtreParNomStructure, nomOrdre, ordre) {
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
    filterByNameConseiller,
    filterByRegion,
    filterByNameStructure
  // eslint-disable-next-line max-len
  } = conseillerQueryStringParameters(nomOrdre, ordre, dateDebut, dateFin, filtreCoordinateur, filtreRupture, filtreParNomConseiller, filtreParRegion, filtreParNomStructure);
  return handleResponse(
    // eslint-disable-next-line max-len
    await fetch(`${apiUrlRoot}${exportConseillersRoute}?role=${roleActivated()}${filterByNameConseiller}${filterDateStart}${filterDateEnd}${rupture}${ordreColonne}${coordinateur}${filterByRegion}${filterByNameStructure}`, requestOptions)
  );
}

// eslint-disable-next-line max-len
async function getExportDonneesStructure(dateDebut, dateFin, filtreParNom, filtreParDepartement, filtreParType, filtreParRegion, filtreParStatut, filtreParComs, nomOrdre, ordre) {
  const apiUrlRoot = `${process.env.REACT_APP_API_URL}/exports`;
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(
      authHeader(), {
        'Accept': 'text/plain',
        'Content-Type': 'text/plain'
      })
  };

  const exportConseillersRoute = '/liste-structures-csv';
  const {
    ordreColonne,
    filterDateStart,
    filterDateEnd,
    filterByName,
    filterByType,
    filterByStatut,
    filterByRegion,
    filterByComs,
    filterByDepartement,
  // eslint-disable-next-line max-len
  } = structureQueryStringParameters(nomOrdre, ordre, dateDebut, dateFin, filtreParNom, filtreParDepartement, filtreParType, filtreParRegion, filtreParStatut, filtreParComs);
  return handleResponse(
    // eslint-disable-next-line max-len
    await fetch(`${apiUrlRoot}${exportConseillersRoute}?role=${roleActivated()}${filterByName}${filterDateStart}${filterDateEnd}${filterByType}${ordreColonne}${filterByDepartement}${filterByRegion}${filterByStatut}${filterByComs}`, requestOptions)
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
