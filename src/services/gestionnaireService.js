import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';
import { gestionnairesQueryStringParameters } from '../utils/queryUtils';

export const gestionnaireService = {
  getAll,
  suppressionGestionnaire,
  resendInvitGestionnaire,
};

function getAll(page, filtreParNom, filtreParRole, nomOrdre, ordre) {
  const {
    ordreColonne,
    filterByRole,
    filterByName,
  } = gestionnairesQueryStringParameters(nomOrdre, ordre, filtreParRole, filtreParNom);
  return API.get(`${apiUrlRoot}/gestionnaires/?skip=${page}${ordreColonne}${filterByRole}${filterByName}&role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function resendInvitGestionnaire(id) {
  return API.post(`${apiUrlRoot}/gestionnaire/relance-invitation/${id}?role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function suppressionGestionnaire(id, role) {
  return API.delete(`${apiUrlRoot}/user/${id}?role=${roleActivated()}&roleSuppression=${role}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}
