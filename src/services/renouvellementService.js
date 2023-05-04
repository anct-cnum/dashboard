import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';

export const renouvellementService = {
  createContract,
  updateContract,
};


function createContract(typeDeContrat, dateDebut, dateFin, salaire, miseEnrelationId) {
  return API.post(`${apiUrlRoot}/reconventionnement/contrat`, { typeDeContrat, dateDebut, dateFin, salaire, miseEnrelationId })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}

function updateContract(typeDeContrat, dateDebut, dateFin, salaire, id) {
  return API.patch(`${apiUrlRoot}/reconventionnement/contrat/${id}`, { typeDeContrat, dateDebut, dateFin, salaire })
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}
