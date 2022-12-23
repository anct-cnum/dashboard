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
  getStatistiquesConseiller,
  getStatistiquesNationale,
  getCodesPostauxCrasConseillerStructure,
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

function getStatistiquesTerritoire(dateDebut, dateFin, typeTerritoire, conseillerIds) {
  conseillerIds = JSON.stringify(conseillerIds);
  return API.get(`${apiUrlRoot}/stats/territoire/cra?dateDebut=${dateDebut}&dateFin=${dateFin}&conseillerIds=${conseillerIds}&role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getStatistiquesStructure(dateDebut, dateFin, idStructure, codePostal) {
  return API.get(
    `${apiUrlRoot}/stats/structure/cras?role=${roleActivated()}&dateDebut=${dateDebut}&dateFin=${dateFin}&idStructure=${idStructure}&codePostal=${codePostal}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getStatistiquesConseiller(dateDebut, dateFin, idConseiller) {
  return API.get(
    `${apiUrlRoot}/stats/conseiller/cras?role=${roleActivated()}&dateDebut=${dateDebut}&dateFin=${dateFin}&idConseiller=${idConseiller}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getStatistiquesNationale(dateDebut, dateFin, nomCommune, nomRegion) {
  console.log('RRRRRRRR', nomRegion);
  return API.get(`stats/nationales/cras?role=anonyme&dateDebut=${dateDebut}&dateFin=${dateFin}&nomCommune=${nomCommune}&nomRegion=${nomRegion}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getCodesPostauxCrasConseillerStructure(idStructure) {
  return API.get(`${apiUrlRoot}/cras/codesPostaux/structure?role=${roleActivated()}&&id=${idStructure}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}


