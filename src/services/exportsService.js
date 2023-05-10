/* eslint-disable max-len */
import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';
import { conseillerQueryStringParameters, territoireQueryString, structureQueryStringParameters, gestionnairesQueryStringParameters, statsCsvQueryStringParameters } from '../utils/queryUtils';

export const exportsService = {
  getFile,
  getExportDonneesTerritoire,
  getStatistiquesCSV,
  getExportDonneesConseiller,
  getExportDonneesStructure,
  getExportDonneesGestionnaires,
  getExportDonneesHistoriqueDossiersConvention,
};

function getFile(name, collection) {
  return API.get(`${apiUrlRoot}/${collection}/${name}-csv?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

async function getExportDonneesTerritoire(territoire, dateDebut, dateFin, nomOrdre, ordre) {
  const apiUrlRoot = `${process.env.REACT_APP_API_URL}/exports`;
  const exportTerritoiresRoute = '/territoires-csv';
  return API.get(`${apiUrlRoot}${exportTerritoiresRoute}${territoireQueryString(nomOrdre, territoire, ordre, dateDebut, dateFin)}&role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getExportDonneesConseiller(dateDebut, dateFin, filtreRupture, filtreCoordinateur, filtreParNomConseiller, filtreParRegion, filtreParDepartement, filtreParNomStructure, nomOrdre, ordre) {

  const exportConseillersRoute = '/conseillers-csv';
  let {
    ordreColonne,
    filterDateStart,
    filterDateEnd,
    filterByNameConseiller,
    rupture,
    coordinateur,
    filterByRegion,
    filterByDepartement,
    filterByNameStructure,
  } = conseillerQueryStringParameters(nomOrdre, ordre, dateDebut, dateFin, filtreParNomConseiller, filtreRupture, filtreCoordinateur, filtreParRegion, filtreParDepartement, filtreParNomStructure);
  return API.get(`${apiUrlRoot}/exports${exportConseillersRoute}?role=${roleActivated()}${filterByNameConseiller}${filterDateStart}${filterDateEnd}${rupture}${ordreColonne}${coordinateur}${filterByRegion}${filterByDepartement}${filterByNameStructure}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
  
}

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
  
  } = structureQueryStringParameters(nomOrdre, ordre, dateDebut, dateFin, filtreParNom, filtreParDepartement, filtreParType, filtreParRegion, filtreParStatut, filtreParComs);
  
  return API.get(`${apiUrlRoot}/exports${exportConseillersRoute}?role=${roleActivated()}${filterByName}${filterDateStart}${filterDateEnd}${filterByType}${ordreColonne}${filterByDepartement}${filterByRegion}${filterByStatut}${filterByComs}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getStatistiquesCSV(dateDebut, dateFin, type, idType, conseillerIds, codePostal, ville, nom, prenom, region, departement, structureIds) {
  const role = type === 'nationales' ? 'anonyme' : roleActivated();
  const {
    filterDateStart,
    filterDateEnd,
    filterIdType,
    filterByType,
    filterByVille,
    filterByRegion,
    filterByCodePostal,
    filterByDepartement,
    filterByLastName,
    filterByFirstName,
    filterByConseillerIds,
    filterByStructureIds
  } = statsCsvQueryStringParameters(dateDebut, dateFin, type, idType, conseillerIds, codePostal, ville, nom, prenom, region, departement, structureIds);
  
  return API.get(`${apiUrlRoot}/exports/statistiques-csv?role=${role}${filterDateStart}${filterDateEnd}${filterIdType}${filterByType}${filterByVille}${filterByRegion}${filterByCodePostal}${filterByDepartement}${filterByLastName}${filterByFirstName}${filterByConseillerIds}${filterByStructureIds}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getExportDonneesGestionnaires(filtreRole, filtreParNom, nomOrdre, ordre) {
  const exportGestionnairesRoute = '/liste-gestionnaires-csv';
  const {
    ordreColonne,
    filterByName,
    filterByRole,
  } = gestionnairesQueryStringParameters(nomOrdre, ordre, filtreRole, filtreParNom);
  return API.get(`${apiUrlRoot}/exports${exportGestionnairesRoute}?role=${roleActivated()}${filterByRole}${filterByName}${ordreColonne}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getExportDonneesHistoriqueDossiersConvention(typeConvention, dateDebut, dateFin) {
  const filterDateStart = (dateDebut !== '') ? `&dateDebut=${new Date(dateDebut).toISOString()}` : '';
  const filterDateEnd = (dateFin !== '') ? `&dateFin=${new Date(dateFin).toISOString()}` : '';
  return API.get(`${apiUrlRoot}/exports/historique-dossiers-convention-csv?role=${roleActivated()}&type=${typeConvention}${filterDateStart}${filterDateEnd}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}
