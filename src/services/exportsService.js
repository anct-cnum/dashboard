import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';

export const exportsService = {
  getFile,
  getExportDonneesTerritoire,
  getStatistiquesCSV,
};

function getFile(name) {
  return API.get(`${apiUrlRoot}/exports/${name}-csv?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error));
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

async function getExportDonneesTerritoire(territoire, dateDebut, dateFin, nomOrdre, ordre) {
  const apiUrlRoot = `${process.env.REACT_APP_API_URL}/exports`;
  const exportTerritoiresRoute = '/territoires-csv';
  // eslint-disable-next-line max-len
  const response = await API.get(`${apiUrlRoot}${exportTerritoiresRoute}${territoireQueryString(nomOrdre, territoire, ordre, dateDebut, dateFin)}&role=${roleActivated()}`);
  return response;
}

function getStatistiquesCSV(dateDebut, dateFin, type, idType, conseillerIds, codePostal) {
  const role = type === 'nationales' ? 'anonyme' : roleActivated();
  // eslint-disable-next-line max-len
  return API.get(`${apiUrlRoot}/exports/statistiques-csv?role=${role}&dateDebut=${dateDebut}&dateFin=${dateFin}&type=${type}&idType=${idType}&codePostal=${codePostal}&conseillerIds=${conseillerIds}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}
