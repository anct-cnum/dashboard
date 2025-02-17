import { handleApiError, roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';
import { statsGrandReseauQueryStringParameters, statsQueryStringParameters, territoireQueryString } from '../utils/queryUtils';
import signOut from './auth/logout';

export const statistiquesService = {
  getTerritoire,
  getDatasStructures,
  getDatasTerritoires,
  getStatistiquesTerritoire,
  getStatistiquesStructure,
  getStatistiquesConseiller,
  getStatistiquesConseillerParcoursRecrutement,
  getStatistiquesNationale,
  getStatistiquesNationaleNouvelleCoop,
  getStatistiquesNationaleGrandReseau,
  getCodesPostauxCrasConseillerStructure,
  getFiltresCrasConseiller,
  getFiltresCrasConseillerParcoursRecrutement
};

function getTerritoire(typeTerritoire, idTerritoire, dateFin) {
  return API.get(
    `${apiUrlRoot}/stats/territoire?typeTerritoire=${typeTerritoire}&idTerritoire=${idTerritoire}&dateFin=${dateFin}&role=anonyme`)
  .then(response => response.data)
  .catch(handleApiError);
}

function getDatasStructures(dateDebut, dateFin, page) {
  return API.get(
    `${apiUrlRoot}/stats/datas/structures?role=${roleActivated()}&dateDebut=${dateDebut}&dateFin=${dateFin}&page=${page}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function getDatasTerritoires(territoire, dateDebut, dateFin, page, nomOrdre, ordre) {
  return API.get(
    `${apiUrlRoot}/stats/territoires${territoireQueryString(nomOrdre, territoire, ordre, dateDebut, dateFin, page)}&role=anonyme`)
  .then(response => response.data)
  .catch(handleApiError);
}

function getStatistiquesTerritoire(dateDebut, dateFin, typeTerritoire, idTerritoire) {
  return API.get(
    `${apiUrlRoot}/stats/territoire/cra?dateDebut=${dateDebut}&dateFin=${dateFin}&typeTerritoire=${typeTerritoire}&idTerritoire=${idTerritoire}&role=anonyme`
  )
  .then(response => response.data)
  .catch(handleApiError);
}

function getStatistiquesStructure(dateDebut, dateFin, idStructure, codePostal, codeCommune) {
  const { filterDateStart, filterDateEnd, filterByCodePostal, filterByCodeCommune } = statsQueryStringParameters(dateDebut, dateFin, codePostal, codeCommune);
  // eslint-disable-next-line max-len
  return API.get(`${apiUrlRoot}/stats/structure/cras?role=${roleActivated()}${filterDateStart}${filterDateEnd}${filterByCodePostal}${filterByCodeCommune}&idStructure=${idStructure}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function getStatistiquesConseiller(dateDebut, dateFin, idConseiller, codePostal, codeCommune, idStructure) {
  const { filterDateStart, filterDateEnd, filterByCodePostal, filterByCodeCommune, filterByIdStructure } =
    statsQueryStringParameters(dateDebut, dateFin, codePostal, codeCommune, idStructure);

  // eslint-disable-next-line max-len
  return API.get(`${apiUrlRoot}/stats/conseiller/cras?role=${roleActivated()}${filterDateStart}${filterDateEnd}${filterByCodePostal}${filterByCodeCommune}${filterByIdStructure}&idConseiller=${idConseiller}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function getStatistiquesConseillerParcoursRecrutement(dateDebut, dateFin, idConseiller, codePostal, codeCommune, idStructure) {
  const { filterDateStart, filterDateEnd, filterByCodePostal, filterByCodeCommune, filterByIdStructure } =
    statsQueryStringParameters(dateDebut, dateFin, codePostal, codeCommune, idStructure);

  // eslint-disable-next-line max-len
  return API.get(`${apiUrlRoot}/stats/recrutement/conseiller/cras?role=anonyme${filterDateStart}${filterDateEnd}${filterByCodePostal}${filterByCodeCommune}${filterByIdStructure}&idConseiller=${idConseiller}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function getStatistiquesNationale(dateDebut, dateFin) {
  const { filterDateStart, filterDateEnd } = statsQueryStringParameters(dateDebut, dateFin);

  return API.get(`stats/nationales/cras?role=anonyme${filterDateStart}${filterDateEnd}`)
  .then(response => response.data)
  .catch(error => {
    if (error.response.status === 403) {
      signOut();
    }
    Promise.reject(error.response.data.message);
  });
}

function getStatistiquesNationaleNouvelleCoop(dateDebut, dateFin) {
  const { filterDateStart, filterDateEnd } = statsQueryStringParameters(dateDebut, dateFin);

  return API.get(`stats/nationales/cras/nouvelle-coop?role=${roleActivated()}${filterDateStart}${filterDateEnd}`)
  .then(response => response.data)
  .catch(error => {
    if (error.response.status === 403) {
      signOut();
    }
    Promise.reject(error.response.data.message);
  });
}

function getStatistiquesNationaleGrandReseau(dateDebut, dateFin, codeCommune, codePostal, region, departement, structureId, conseillerId) {
  const {
    filterDateStart,
    filterDateEnd,
    filterByCodeCommune,
    filterByRegion,
    filterByCodePostal,
    filterByDepartement,
    filterByIdConseiller,
    filterByIdStructure
  } = statsGrandReseauQueryStringParameters(dateDebut, dateFin, conseillerId, codePostal, codeCommune, region, departement, structureId);

  // eslint-disable-next-line max-len
  return API.get(`stats/nationales/cras/grand-reseau?role=${roleActivated()}${filterDateStart}${filterDateEnd}${filterByCodePostal}${filterByCodeCommune}${filterByRegion}${filterByDepartement}${filterByIdStructure}${filterByIdConseiller}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function getCodesPostauxCrasConseillerStructure(idStructure) {
  return API.get(`${apiUrlRoot}/cras/codesPostaux/structure?role=${roleActivated()}&id=${idStructure}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function getFiltresCrasConseiller(idConseiller) {
  return API.get(`${apiUrlRoot}/cras/filtres/conseiller?role=${roleActivated()}&id=${idConseiller}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function getFiltresCrasConseillerParcoursRecrutement(idConseiller) {
  return API.get(`${apiUrlRoot}/cras/recrutement/filtres/conseiller?role=anonyme&id=${idConseiller}`)
  .then(response => response.data)
  .catch(handleApiError);
}
