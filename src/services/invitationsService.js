import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';

export const invitationsService = {
  inviteAccountPrefet,
  inviteAccountAdmin,
  inviteStructure,
  inviteAccountHub
};

function inviteAccountPrefet(email, maille) {
  return API.post(
    `${apiUrlRoot}/inviteAccountPrefet?role=${roleActivated()}`,
    { ...email, ...maille })
  .then(response => response.data)
  .catch(error => error.response.data.message);
}

function inviteAccountAdmin(email) {
  return API.post(
    `${apiUrlRoot}/inviteAccountAdmin?role=${roleActivated()}`,
    { email })
  .then(response => response.data)
  .catch(error => error.response.data.message);
}

function inviteStructure({ email, structureId }) {
  return API.post(
    `${apiUrlRoot}/inviteStructure?role=${roleActivated()}`,
    { email, structureId })
  .then(response => response.data)
  .catch(error => error.response.data.message);
}

function inviteAccountHub({ hub, nom, prenom, email }) {
  return API.post(
    `${apiUrlRoot}/inviteAccountHub?role=${roleActivated()}`,
    { hub, nom, prenom, email })
  .then(response => response.data)
  .catch(error => error.response.data.message);
}
