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

function getStatistiquesTerritoire(dateDebut, dateFin, typeTerritoire, conseillerIds) {
  conseillerIds = JSON.stringify(conseillerIds);
  return API.get(`${apiUrlRoot}/stats/territoire/cra?dateDebut=${dateDebut}&dateFin=${dateFin}&conseillerIds=${conseillerIds}&role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getStatistiquesStructure(dateDebut, dateFin, idStructure, codePostal, ville) {
  return API.get(
    // eslint-disable-next-line max-len
    `${apiUrlRoot}/stats/structure/cras?role=${roleActivated()}&dateDebut=${dateDebut}&dateFin=${dateFin}&idStructure=${idStructure}&codePostal=${codePostal}&ville=${ville}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getStatistiquesConseiller(dateDebut, dateFin, idConseiller, codePostal, ville) {
  return API.get(
    // eslint-disable-next-line max-len
    `${apiUrlRoot}/stats/conseiller/cras?role=${roleActivated()}&dateDebut=${dateDebut}&dateFin=${dateFin}&idConseiller=${idConseiller}&codePostal=${codePostal}&ville=${ville}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getStatistiquesNationale(dateDebut, dateFin) {
  return API.get(`stats/nationales/cras?role=anonyme&dateDebut=${dateDebut}&dateFin=${dateFin}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function getStatistiquesNationaleGrandReseau(dateDebut, dateFin, ville, codePostal, codeRegion, numeroDepartement, structureId, conseillerId) {
  // eslint-disable-next-line max-len
  return API.get(`stats/nationales/cras/grand-reseau?role=${roleActivated()}&dateDebut=${dateDebut}&dateFin=${dateFin}&codePostal=${codePostal}&ville=${ville}&codeRegion=${codeRegion}&numeroDepartement=${numeroDepartement}&structureId=${structureId}&conseillerId=${conseillerId}`)
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
