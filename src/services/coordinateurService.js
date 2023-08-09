import { roleActivated } from '../helpers';
import apiUrlRoot from '../helpers/apiUrl';
import { API } from './api';

export const coordinateurService = {
  getDemandeCoordinateur,
};

function getDemandeCoordinateur(idStructure, idDemandeCoordinateur) {
  return API.get(`${apiUrlRoot}/demandes/coordinateur/${idStructure}?role=${roleActivated()}&idDemande=${idDemandeCoordinateur}`)
  .then(response => response.data)
  .catch(error => Promise.reject(error.response.data.message));
}
