import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';
import { conseillerQueryStringParameters, territoireQueryString, structureQueryStringParameters } from '../utils/queryUtils';

export const exportsService = {
  getFile,
  getExportDonneesTerritoire,
  getStatistiquesCSV,
  getExportDonneesConseiller,
  getExportDonneesStructure
};

function getFile(name) {
  return API.get(`${apiUrlRoot}/exports/${name}-csv?role=${roleActivated()}`)
  // eslint-disable-next-line max-statements-per-line
  .then(response => response.data)
  .catch(error => error.response.data.message);
}

async function getExportDonneesTerritoire(territoire, dateDebut, dateFin, nomOrdre, ordre) {
  const apiUrlRoot = `${process.env.REACT_APP_API_URL}/exports`;
  const exportTerritoiresRoute = '/territoires-csv';
  // eslint-disable-next-line max-len
  return API.get(`${apiUrlRoot}${exportTerritoiresRoute}${territoireQueryString(nomOrdre, territoire, ordre, dateDebut, dateFin)}&role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => error.response.data.message);
}

// eslint-disable-next-line max-len
function getExportDonneesConseiller(dateDebut, dateFin, filtreRupture, filtreCoordinateur, filtreParNomConseiller, filtreParRegion, filtreParNomStructure, nomOrdre, ordre) {

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
  
  // eslint-disable-next-line max-len
  return API.get(`${apiUrlRoot}/exports${exportConseillersRoute}?role=${roleActivated()}${filterByNameConseiller}${filterDateStart}${filterDateEnd}${rupture}${ordreColonne}${coordinateur}${filterByRegion}${filterByNameStructure}`)
  .then(response => response.data)
  .catch(error => error.response.data.message);
  
}

// eslint-disable-next-line max-len
function getExportDonneesStructure(dateDebut, dateFin, filtreParNom, filtreParDepartement, filtreParType, filtreParRegion, filtreParStatut, filtreParComs, nomOrdre, ordre) {
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
  // eslint-disable-next-line max-len
  return API.get(`${apiUrlRoot}/exports${exportConseillersRoute}?role=${roleActivated()}${filterByName}${filterDateStart}${filterDateEnd}${filterByType}${ordreColonne}${filterByDepartement}${filterByRegion}${filterByStatut}${filterByComs}`)
  .then(response => response.data)
  .catch(error => error.response.data.message);
}

function getStatistiquesCSV(dateDebut, dateFin, type, idType, conseillerIds, codePostal) {
  const role = type === 'nationales' ? 'anonyme' : roleActivated();
  // eslint-disable-next-line max-len
  return API.get(`${apiUrlRoot}/exports/statistiques-csv?role=${role}&dateDebut=${dateDebut}&dateFin=${dateFin}&type=${type}&idType=${idType}&codePostal=${codePostal}&conseillerIds=${conseillerIds}`)
  .then(response => response.data)
  .catch(error => error.response.data.message);
}
