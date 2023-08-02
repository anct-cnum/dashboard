/* eslint-disable max-len */
import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';
import { statsGrandReseauQueryStringParameters, statsQueryStringParameters, territoireQueryString } from '../utils/queryUtils';

export const statistiquesService = {
  getTerritoire,
  getDatasStructures,
  getDatasTerritoires,
  getDatasTerritoiresPrefet,
  getStatistiquesTerritoire,
  getStatistiquesStructure,
  getStatistiquesConseiller,
  getStatistiquesNationale,
  getStatistiquesNationaleGrandReseau,
  getCodesPostauxCrasConseillerStructure,
  getCodesPostauxCrasConseiller
};

function getTerritoire(typeTerritoire, idTerritoire, date) {
  return API.get(
    `${apiUrlRoot}/stats/territoire?typeTerritoire=${typeTerritoire}&idTerritoire=${idTerritoire}&dateFin=${date}&role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getDatasStructures(dateDebut, dateFin, page) {
  return API.get(
    `${apiUrlRoot}/stats/datas/structures?role=${roleActivated()}&dateDebut=${dateDebut}&dateFin=${dateFin}&page=${page}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getDatasTerritoires(territoire, dateDebut, dateFin, page, nomOrdre, ordre) {
  return API.get(
    `${apiUrlRoot}/stats/territoires${territoireQueryString(nomOrdre, territoire, ordre, dateDebut, dateFin, page)}&role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getDatasTerritoiresPrefet(territoire, dateDebut, dateFin, nomOrdre, ordre) {
  return API.get(
    `${apiUrlRoot}/stats/prefet/territoires${territoireQueryString(nomOrdre, territoire, ordre, dateDebut, dateFin)}&role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getStatistiquesTerritoire(dateDebut, dateFin, typeTerritoire, conseillerIds) {
  conseillerIds = JSON.stringify(conseillerIds);
  return API.get(`${apiUrlRoot}/stats/territoire/cra?dateDebut=${dateDebut}&dateFin=${dateFin}&conseillerIds=${conseillerIds}&role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getStatistiquesStructure(dateDebut, dateFin, idStructure, codePostal, codeCommune) {
  const { filterDateStart, filterDateEnd, filterByCodePostal, filterByCodeCommune } = statsQueryStringParameters(dateDebut, dateFin, codePostal, codeCommune);
  return API.get(
    `${apiUrlRoot}/stats/structure/cras?role=${roleActivated()}${filterDateStart}${filterDateEnd}${filterByCodePostal}${filterByCodeCommune}&idStructure=${idStructure}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getStatistiquesConseiller(dateDebut, dateFin, idConseiller, codePostal, codeCommune) {
  const { filterDateStart, filterDateEnd, filterByCodePostal, filterByCodeCommune } = statsQueryStringParameters(dateDebut, dateFin, codePostal, codeCommune);
  return API.get(
    `${apiUrlRoot}/stats/conseiller/cras?role=${roleActivated()}${filterDateStart}${filterDateEnd}${filterByCodePostal}${filterByCodeCommune}&idConseiller=${idConseiller}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getStatistiquesNationale(dateDebut, dateFin) {
  const { filterDateStart, filterDateEnd } = statsQueryStringParameters(dateDebut, dateFin);

  return API.get(`stats/nationales/cras?role=anonyme${filterDateStart}${filterDateEnd}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getStatistiquesNationaleGrandReseau(dateDebut, dateFin, codeCommune, codePostal, region, departement, structureIds, conseillerIds) {
  const {
    filterDateStart,
    filterDateEnd,
    filterByCodeCommune,
    filterByRegion,
    filterByCodePostal,
    filterByDepartement,
    filterByConseillerIds,
    filterByStructureIds
  } = statsGrandReseauQueryStringParameters(dateDebut, dateFin, conseillerIds, codePostal, codeCommune, region, departement, structureIds);
  return API.get(`stats/nationales/cras/grand-reseau?role=${roleActivated()}${filterDateStart}${filterDateEnd}${filterByCodePostal}${filterByCodeCommune}${filterByRegion}${filterByDepartement}${filterByStructureIds}${filterByConseillerIds}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getCodesPostauxCrasConseillerStructure(idStructure) {
  return API.get(`${apiUrlRoot}/cras/codesPostaux/structure?role=${roleActivated()}&id=${idStructure}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getCodesPostauxCrasConseiller(idConseiller) {
  return API.get(`${apiUrlRoot}/cras/codesPostaux/conseiller?role=${roleActivated()}&id=${idConseiller}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}
