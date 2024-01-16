import { handleApiError, roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';
import { demandesQueryStringParameters, structureQueryStringParameters } from '../utils/queryUtils';

export const structureService = {
  get,
  getAll,
  getDetails,
  updateContact,
  updateStructureEmail,
  updateStructureSiret,
  verifyStructureSiret,
  createAvenant,
  closeBanner,
  addRoleCoordinateur,
  getAllDemandesConseiller,
  getDemandeConseiller,
  confirmationAvisPrefet,
  closeBannerAvisPrefet,
};

function get(id) {
  return API.get(`${apiUrlRoot}/structure/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function getDetails(id) {
  return API.get(`${apiUrlRoot}/structure/details/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function getAll(page, dateDebut, dateFin, filtreParNom, filtreParDepartement, filtreParType, filtreParRegion, filtreParStatut, nomOrdre, ordre) {
  const {
    ordreColonne,
    filterDateStart,
    filterDateEnd,
    filterByName,
    filterByType,
    filterByStatut,
    filterByRegion,
    filterByDepartement,
  // eslint-disable-next-line max-len
  } = structureQueryStringParameters(nomOrdre, ordre, dateDebut, dateFin, filtreParNom, filtreParDepartement, filtreParType, filtreParRegion, filtreParStatut);
  // eslint-disable-next-line max-len
  return API.get(`${apiUrlRoot}/structures/?skip=${page}${filterByName}${filterDateStart}${filterDateEnd}${filterByType}${ordreColonne}${filterByDepartement}${filterByRegion}${filterByStatut}&role=${roleActivated()}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function updateContact({ id, contact }) {
  return API.patch(`${apiUrlRoot}/structure/contact/${id}?role=${roleActivated()}`, { contact })
  .then(response => response.data)
  .catch(handleApiError);
}

function updateStructureEmail(email, structureId) {
  return API.patch(`${apiUrlRoot}/structure/email/${structureId}?role=${roleActivated()}`, { email })
  .then(response => response.data)
  .catch(handleApiError);
}

function verifyStructureSiret(siret) {
  return API.get(`${apiUrlRoot}/structure/verify-siret/${siret}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function updateStructureSiret(siret, structureId) {
  return API.patch(`${apiUrlRoot}/structure/siret/${structureId}?role=${roleActivated()}`, { siret })
  .then(response => response.data)
  .catch(handleApiError);
}

function createAvenant(type, id, nombreDePostes, motif, autreMotif = '') {
  // eslint-disable-next-line max-len
  return API.patch(`${apiUrlRoot}/avenant/creation/${id}?role=${roleActivated()}`, { type, nombreDePostes, motif: motif || autreMotif })
  .then(response => response.data)
  .catch(handleApiError);
}

function closeBanner(type, id, conseillerId) {
  return API.patch(`${apiUrlRoot}/banniere/${id}?type=${type}&role=${roleActivated()}${conseillerId ? `&conseillerId=${conseillerId}` : ''}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function addRoleCoordinateur(structureId, conseillerId) {
  return API.patch(`${apiUrlRoot}/structure/add-role-coordinateur/${structureId}?role=${roleActivated()}`, { conseillerId })
  .then(response => response.data)
  .catch(handleApiError);
}

function getAllDemandesConseiller(page, statutDemande, filtreSearchBar, filtreDepartement, filtreRegion, filtreAvisPrefet, ordreNom, ordre) {
  const {
    ordreColonne,
    filterByName,
    filterByRegion,
    filterByDepartement,
    filterByAvisPrefet,
  } = demandesQueryStringParameters(filtreSearchBar, filtreDepartement, filtreRegion, filtreAvisPrefet, ordreNom, ordre);

  // eslint-disable-next-line max-len
  return API.get(`${apiUrlRoot}/demandes/conseillers?role=${roleActivated()}&page=${page}&statut=${statutDemande}${ordreColonne}${filterByName}${filterByRegion}${filterByDepartement}${filterByAvisPrefet}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function getDemandeConseiller(idStructure) {
  return API.get(`${apiUrlRoot}/demandes/conseiller/${idStructure}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(handleApiError);
}

function confirmationAvisPrefet(idStructure, avisPrefet, commentaire) {
  return API.patch(`${apiUrlRoot}/avis/prefet/conseiller/${idStructure}?role=${roleActivated()}`, { avisPrefet, commentaire })
  .then(response => response.data)
  .catch(handleApiError);
}

function closeBannerAvisPrefet(idStructure) {
  return API.patch(`${apiUrlRoot}/banner/prefet/conseiller/${idStructure}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(handleApiError);
}
