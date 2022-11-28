import { roleActivated } from '../helpers';
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
    JSON.stringify({ ...email, ...maille }))
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function inviteAccountAdmin(email) {
  return API.post(
    `${apiUrlRoot}/inviteAccountAdmin?role=${roleActivated()}`,
    JSON.stringify({ email }))
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function inviteStructure({ email, structureId }) {
  return API.post(
    `${apiUrlRoot}/inviteStructure?role=${roleActivated()}`,
    JSON.stringify({ email, structureId }))
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function inviteAccountHub({ hub, nom, prenom, email }) {
  return API.post(
    `${apiUrlRoot}/inviteAccountHub?role=${roleActivated()}`,
    JSON.stringify({ hub, nom, prenom, email }))
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}

function inviteAccountGrandReseau({ reseau, email }) {
  return API.post(
    `${apiUrlRoot}/inviteAccountGrandReseau?role=${roleActivated()}`,
    JSON.stringify({ reseau, email }))
  .then(response => response.data)
  .catch(error => Promise.reject(error));
}
