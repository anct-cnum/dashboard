/* eslint-disable max-len */
import { handleApiError, roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';
import { conseillerQueryStringParameters, territoireQueryString, structureQueryStringParameters, gestionnairesQueryStringParameters, statsCsvQueryStringParameters, conventionQueryStringParameters, contratQueryStringParameters, demandesCoordinateurQueryStringParameters } from '../utils/queryUtils';

export const exportsService = {
  getFile,
  getExportDonneesTerritoire,
  getStatistiquesCSV,
  getExportDonneesConseiller,
  getExportDonneesStructure,
  getExportDonneesGestionnaires,
  getExportDonneesHistoriqueDossiersConvention,
  getExportDonneesHistoriqueContrat,
  getExportCandidaturesCoordinateurs,
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

function getStatistiquesCSV(dateDebut, dateFin, type, idType, codePostal, ville, codeCommune, nom, prenom, region, departement, conseillerIds, structureIds, typeStats) {
  const role = (type === 'nationales' || typeStats === 'territoire') ? 'anonyme' : roleActivated();
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
    filterByStructureIds,
  } = statsCsvQueryStringParameters(dateDebut, dateFin, type, idType, codePostal, ville, codeCommune, nom, prenom, region, departement, conseillerIds, structureIds);

  return API.get(`${apiUrlRoot}/exports/statistiques-csv?role=${role}${filterDateStart}${filterDateEnd}${filterIdType}${filterByType}${filterByVille}${filterByCodeCommune}${filterByRegion}${filterByCodePostal}${filterByDepartement}${filterByLastName}${filterByFirstName}${filterByStructureIds}${filterByConseillerIds}`)
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

function getExportCandidaturesCoordinateurs(statutDemande, filtreSearchBar, filtreDepartement, filtreRegion, filtreAvisPrefet, ordreNom, ordre) {
  const {
    ordreColonne,
    filterByName,
    filterByRegion,
    filterByDepartement,
    filterByAvisPrefet,
  } = demandesCoordinateurQueryStringParameters(filtreSearchBar, filtreDepartement, filtreRegion, filtreAvisPrefet, ordreNom, ordre);
  return API.get(`${apiUrlRoot}/exports/candidatures-coordinateurs-csv?role=${roleActivated()}&statut=${statutDemande}${ordreColonne}${filterByName}${filterByRegion}${filterByDepartement}${filterByAvisPrefet}`)
  .then(response => response.data)
  .catch(handleApiError);
}
