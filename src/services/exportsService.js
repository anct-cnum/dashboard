/* eslint-disable max-len */
import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';
import { conseillerQueryStringParameters, territoireQueryString, structureQueryStringParameters, gestionnairesQueryStringParameters, statsCsvQueryStringParameters, conventionQueryStringParameters, contratQueryStringParameters } from '../utils/queryUtils';

export const exportsService = {
  getFile,
  getExportDonneesTerritoire,
  getExportDonneesTerritoirePrefet,
  getStatistiquesCSV,
  getExportDonneesConseiller,
  getExportDonneesConseillerRoleStructure,
  getExportDonneesStructure,
  getExportDonneesGestionnaires,
  getExportDonneesHistoriqueDossiersConvention,
  getExportDonneesHistoriqueContrat,
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

async function getExportDonneesTerritoirePrefet(territoire, dateDebut, dateFin, nomOrdre, ordre) {
  const apiUrlRoot = `${process.env.REACT_APP_API_URL}/exports/prefet`;
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

function getExportDonneesConseillerRoleStructure(dateDebut, dateFin, filtreRupture, filtreCoordinateur, filtreParNomConseiller, filtreParRegion, filtreParDepartement, filtreParNomStructure, nomOrdre, ordre) {

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
  return API.get(`${apiUrlRoot}/exports/structure${exportConseillersRoute}?role=${roleActivated()}${filterByNameConseiller}${filterDateStart}${filterDateEnd}${rupture}${ordreColonne}${coordinateur}${filterByRegion}${filterByDepartement}${filterByNameStructure}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getExportDonneesStructure(dateDebut, dateFin, filtreParNom, filtreParDepartement, filtreParType, filtreParRegion, filtreParStatut, nomOrdre, ordre) {
  const exportConseillersRoute = '/liste-structures-csv';
  const {
    ordreColonne,
    filterDateStart,
    filterDateEnd,
    filterByName,
    filterByType,
    filterByStatut,
    filterByRegion,
    filterByDepartement,

  } = structureQueryStringParameters(nomOrdre, ordre, dateDebut, dateFin, filtreParNom, filtreParDepartement, filtreParType, filtreParRegion, filtreParStatut);

  return API.get(`${apiUrlRoot}/exports${exportConseillersRoute}?role=${roleActivated()}${filterByName}${filterDateStart}${filterDateEnd}${filterByType}${ordreColonne}${filterByDepartement}${filterByRegion}${filterByStatut}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getStatistiquesCSV(dateDebut, dateFin, type, idType, conseillerIds, codePostal, ville, codeCommune, nom, prenom, region, departement, structureIds) {
  const role = type === 'nationales' ? 'anonyme' : roleActivated();
  const {
    filterDateStart,
    filterDateEnd,
    filterIdType,
    filterByType,
    filterByVille,
    filterByCodeCommune,
    filterByRegion,
    filterByCodePostal,
    filterByDepartement,
    filterByLastName,
    filterByFirstName,
    filterByConseillerIds,
    filterByStructureIds
  } = statsCsvQueryStringParameters(dateDebut, dateFin, type, idType, conseillerIds, codePostal, ville, codeCommune, nom, prenom, region, departement, structureIds);

  return API.get(`${apiUrlRoot}/exports/statistiques-csv?role=${role}${filterDateStart}${filterDateEnd}${filterIdType}${filterByType}${filterByVille}${filterByCodeCommune}${filterByRegion}${filterByCodePostal}${filterByDepartement}${filterByLastName}${filterByFirstName}${filterByConseillerIds}${filterByStructureIds}`)
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

function getExportDonneesHistoriqueDossiersConvention(typeConvention, dateDebut, dateFin, filtreParNomStructure, filterDepartement, filtreRegion, ordreNom, ordre) {
  const filterDateStart = (dateDebut !== '') ? `&dateDebut=${new Date(dateDebut).toISOString()}` : '';
  const filterDateEnd = (dateFin !== '') ? `&dateFin=${new Date(dateFin).toISOString()}` : '';
  const {
    ordreColonne,
    filterByName,
    filterByRegion,
    filterByDepartement
  } = conventionQueryStringParameters(filtreParNomStructure, filterDepartement, filtreRegion, ordreNom, ordre);
  return API.get(`${apiUrlRoot}/exports/historique-dossiers-convention-csv?role=${roleActivated()}&type=${typeConvention}${filterDateStart}${filterDateEnd}${ordreColonne}${filterByName}${filterByRegion}${filterByDepartement}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getExportDonneesHistoriqueContrat(statutContrat, dateDebut, dateFin, filtreSearchBar, filtreDepartement, filtreRegion, ordreNom, ordre) {
  const filterDateStart = (dateDebut !== '') ? `&dateDebut=${new Date(dateDebut).toISOString()}` : '';
  const filterDateEnd = (dateFin !== '') ? `&dateFin=${new Date(dateFin).toISOString()}` : '';
  const {
    ordreColonne,
    filterByName,
    filterByRegion,
    filterByDepartement
  } = contratQueryStringParameters(filtreSearchBar, filtreDepartement, filtreRegion, ordreNom, ordre);
  return API.get(`${apiUrlRoot}/exports/historique-contrats-csv?role=${roleActivated()}&statut=${statutContrat}${filterDateStart}${filterDateEnd}${ordreColonne}${filterByName}${filterByRegion}${filterByDepartement}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}
