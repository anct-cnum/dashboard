/* eslint-disable max-len */
import { handleApiError, roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';
import {
  conseillerQueryStringParameters,
  territoireQueryString,
  structureQueryStringParameters,
  gestionnairesQueryStringParameters,
  contratQueryStringParameters,
  statsCsvConseillerQueryStringParameters,
  statsCsvStructureQueryStringParameters,
  statsCsvGrandReseauQueryStringParameters,
  historiqueConventionQueryStringParameters,
  demandesQueryStringParameters
} from '../utils/queryUtils';

export const exportsService = {
  getFile,
  getExportDonneesTerritoire,
  getStatistiquesConseillerCSV,
  getStatistiquesStructureCSV,
  getStatistiquesGrandReseauCSV,
  getStatistiquesNationalesCSV,
  getStatistiquesTerritorialesCSV,
  getExportDonneesConseiller,
  getExportDonneesStructure,
  getExportDonneesGestionnaires,
  getExportDonneesHistoriqueDossiersConvention,
  getExportDonneesHistoriqueContrat,
  getExportDemandesCoordinateurs,
};

function getFile(name, collection) {
  return API.get(`${apiUrlRoot}/${collection}/${name}-csv?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(handleApiError);
}

async function getExportDonneesTerritoire(territoire, dateDebut, dateFin, nomOrdre, ordre) {
  const apiUrlRoot = `${process.env.REACT_APP_API_URL}/exports`;
  const exportTerritoiresRoute = '/territoires-csv';
  return API.get(`${apiUrlRoot}${exportTerritoiresRoute}${territoireQueryString(nomOrdre, territoire, ordre, dateDebut, dateFin)}&role=anonyme`)
  .then(response => response.data)
  .catch(handleApiError);
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
  .catch(handleApiError);

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
  .catch(handleApiError);
}

function getStatistiquesConseillerCSV(dateDebut, dateFin, idType, codePostal, ville, codeCommune, nom, prenom, structureId) {
  const {
    filterDateStart,
    filterDateEnd,
    filterIdType,
    filterByVille,
    filterByCodeCommune,
    filterByCodePostal,
    filterByLastName,
    filterByFirstName,
    filterByIdStructure,
  } = statsCsvConseillerQueryStringParameters(dateDebut, dateFin, idType, codePostal, ville, codeCommune, nom, prenom, structureId);
  return API.get(`${apiUrlRoot}/exports/statistiques-csv?role=${roleActivated()}&type=conseiller${filterDateStart}${filterDateEnd}${filterIdType}${filterByVille}${filterByCodeCommune}${filterByCodePostal}${filterByLastName}${filterByFirstName}${filterByIdStructure}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function getStatistiquesStructureCSV(dateDebut, dateFin, idType, codePostal, ville, codeCommune) {
  const {
    filterDateStart,
    filterDateEnd,
    filterIdType,
    filterByVille,
    filterByCodeCommune,
    filterByCodePostal,
  } = statsCsvStructureQueryStringParameters(dateDebut, dateFin, idType, codePostal, ville, codeCommune);
  return API.get(`${apiUrlRoot}/exports/statistiques-csv?role=${roleActivated()}&type=structure${filterDateStart}${filterDateEnd}${filterIdType}${filterByVille}${filterByCodeCommune}${filterByCodePostal}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function getStatistiquesGrandReseauCSV(dateDebut, dateFin, codePostal, ville, codeCommune, structureId, conseillerId, region, departement) {
  const {
    filterDateStart,
    filterDateEnd,
    filterByVille,
    filterByCodeCommune,
    filterByCodePostal,
    filterByRegion,
    filterByDepartement,
    filterByIdStructure,
    filterByIdConseiller
  } = statsCsvGrandReseauQueryStringParameters(dateDebut, dateFin, codePostal, ville, codeCommune, structureId, conseillerId, region, departement);
  return API.get(`${apiUrlRoot}/exports/statistiques-csv?role=${roleActivated()}&type=grandReseau${filterDateStart}${filterDateEnd}${filterByVille}${filterByCodeCommune}${filterByCodePostal}${filterByRegion}${filterByDepartement}${filterByIdStructure}${filterByIdConseiller}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function getStatistiquesNationalesCSV(dateDebut, dateFin) {
  const filterDateStart = (dateDebut !== '') ? `&dateDebut=${new Date(dateDebut).toISOString()}` : '';
  const filterDateEnd = (dateFin !== '') ? `&dateFin=${new Date(dateFin).toISOString()}` : '';
  return API.get(`${apiUrlRoot}/exports/statistiques-csv?role=anonyme&type=nationales${filterDateStart}${filterDateEnd}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function getStatistiquesTerritorialesCSV(dateDebut, dateFin, id, typeTerritoire) {
  const filterDateStart = (dateDebut !== '') ? `&dateDebut=${new Date(dateDebut).toISOString()}` : '';
  const filterDateEnd = (dateFin !== '') ? `&dateFin=${new Date(dateFin).toISOString()}` : '';
  const filterIdType = id ? `&idType=${id}` : '';
  return API.get(`${apiUrlRoot}/exports/statistiques-csv?role=anonyme&type=${typeTerritoire}${filterDateStart}${filterDateEnd}${filterIdType}`)
  .then(response => response.data)
  .catch(handleApiError);
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
  .catch(handleApiError);
}

function getExportDonneesHistoriqueDossiersConvention(typeConvention, dateDebut, dateFin, filtreParNomStructure, filterDepartement, filtreRegion, filtreAvisAdmin, ordreNom, ordre) {
  const {
    filterDateStart,
    filterDateEnd,
    filterByName,
    filterByDepartement,
    filterByRegion,
    filterByAvisAdmin,
    ordreColonne,
  } = historiqueConventionQueryStringParameters(dateDebut, dateFin, filtreParNomStructure, filterDepartement, filtreRegion, filtreAvisAdmin, ordreNom, ordre);

  return API.get(`${apiUrlRoot}/exports/historique-dossiers-convention-csv?role=${roleActivated()}&type=${typeConvention}${filterDateStart}${filterDateEnd}${ordreColonne}${filterByName}${filterByRegion}${filterByDepartement}${filterByAvisAdmin}`)
  .then(response => response.data)
  .catch(handleApiError);
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
  .catch(handleApiError);
}

function getExportDemandesCoordinateurs(statutDemande, filtreSearchBar, filtreDepartement, filtreRegion, filtreAvisPrefet, ordreNom, ordre) {
  const {
    filterByName,
    filterByDepartement,
    filterByRegion,
    filterByAvisPrefet,
    ordreColonne,
  } = demandesQueryStringParameters(filtreSearchBar, filtreDepartement, filtreRegion, filtreAvisPrefet, ordreNom, ordre);
  return API.get(`${apiUrlRoot}/exports/demandes-coordinateurs-csv?role=${roleActivated()}&statut=${statutDemande}${ordreColonne}${filterByName}${filterByRegion}${filterByDepartement}${filterByAvisPrefet}`)
  .then(response => response.data)
  .catch(handleApiError);
}
