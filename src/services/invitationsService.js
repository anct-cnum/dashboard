import { handleApiError, roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';

export const invitationsService = {
  inviteAccountPrefet,
  inviteAccountAdmin,
  inviteStructure,
  inviteAccountHub,
  inviteAccountGrandReseau
};

function inviteAccountPrefet(email, maille) {
  return API.post(
    `${apiUrlRoot}/inviteAccountPrefet?role=${roleActivated()}`,
    { ...email, ...maille })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function inviteAccountAdmin({ email, nom, prenom }) {
  return API.post(
    `${apiUrlRoot}/inviteAccountAdmin?role=${roleActivated()}`,
    { email, nom, prenom })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function inviteStructure({ email, structureId }) {
  return API.post(
    `${apiUrlRoot}/inviteStructure?role=${roleActivated()}`,
    { email, structureId })
  .then(response => response.data)
  .catch(handleApiError);
}

function inviteAccountHub({ hub, nom, prenom, email }) {
  return API.post(
    `${apiUrlRoot}/inviteAccountHub?role=${roleActivated()}`,
    { hub, nom, prenom, email })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function inviteAccountGrandReseau({ reseau, email, nom, prenom }) {
  return API.post(
    `${apiUrlRoot}/inviteAccountGrandReseau?role=${roleActivated()}`,
    { reseau, email, nom, prenom })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}
