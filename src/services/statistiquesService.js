import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';
import { territoireQueryString } from '../utils/queryUtils';

export const statistiquesService = {
  getTerritoire,
  getDatasStructures,
  getDatasTerritoires,
  getStatistiquesTerritoire,
  getStatistiquesStructure,
  getStatistiquesNationale,
  getCodesPostauxCrasConseillerStructure,
};

function getTerritoire(typeTerritoire, idTerritoire, date) {
  return API.get(
    `${apiUrlRoot}/stats/territoire?typeTerritoire=${typeTerritoire}&idTerritoire=${idTerritoire}&dateFin=${date}&role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function getDatasStructures(dateDebut, dateFin, page) {
  return API.get(
    `${apiUrlRoot}/stats/datas/structures?role=${roleActivated()}&dateDebut=${dateDebut}&dateFin=${dateFin}&page=${page}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function getDatasTerritoires(territoire, dateDebut, dateFin, page, nomOrdre, ordre) {
  return API.get(
    `${apiUrlRoot}/stats/territoires${territoireQueryString(nomOrdre, territoire, ordre, dateDebut, dateFin, page)}&role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function getStatistiquesTerritoire(dateDebut, dateFin, typeTerritoire, conseillerIds) {
  conseillerIds = JSON.stringify(conseillerIds);
  return fetch(`${apiUrlRoot}/stats/territoire/cra?dateDebut=${dateDebut}&dateFin=${dateFin}&conseillerIds=${conseillerIds}&role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function getStatistiquesStructure(dateDebut, dateFin, idStructure, codePostal) {
  return API.get(
    `${apiUrlRoot}/stats/structure/cras?role=${roleActivated()}&dateDebut=${dateDebut}&dateFin=${dateFin}&idStructure=${idStructure}&codePostal=${codePostal}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function getStatistiquesNationale(dateDebut, dateFin) {
  return API.get(`stats/nationales/cras?role=anonyme&dateDebut=${dateDebut}&dateFin=${dateFin}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function getCodesPostauxCrasConseillerStructure(idStructure) {
  return API.get(`${apiUrlRoot}/cras/codesPostaux/structure?role=${roleActivated()}&&id=${idStructure}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}


