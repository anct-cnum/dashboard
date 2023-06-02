import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';
import { roleActivated } from '../helpers';

export const renouvellementService = {
  createContract,
  updateContract,
  closeBanner,
};


function createContract(typeDeContrat, dateDebutDeContrat, dateFinDeContrat, salaire, miseEnrelationId) {
  // eslint-disable-next-line max-len
  return API.post(`${apiUrlRoot}/reconventionnement/contrat?role=${roleActivated()}`, { typeDeContrat, dateDebutDeContrat, dateFinDeContrat, salaire, miseEnrelationId })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function updateContract(typeDeContrat, dateDebutDeContrat, dateFinDeContrat, salaire, id) {
  return API.patch(`${apiUrlRoot}/reconventionnement/contrat/${id}?role=${roleActivated()}`, { typeDeContrat, dateDebutDeContrat, dateFinDeContrat, salaire })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function closeBanner(type, id) {
  return API.patch(`${apiUrlRoot}/reconventionnement/banniere/${id}?type=${type}&role=${roleActivated()}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}
