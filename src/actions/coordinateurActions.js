import { coordinateurService } from '../services/coordinateurService.js';

export const coordinateurActions = {
  getDemandeCoordinateur,
};

function getDemandeCoordinateur(idStructure, idDemandeCoordinateur) {
  return dispatch => {
    dispatch(request());

    coordinateurService.getDemandeCoordinateur(idStructure, idDemandeCoordinateur)
    .then(
      coordinateur => dispatch(success(coordinateur)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_DEMANDE_COORDINATEUR_REQUEST' };
  }
  function success(coordinateur) {
    return { type: 'GET_DEMANDE_COORDINATEUR_SUCCESS', coordinateur };
  }
  function failure(error) {
    return { type: 'GET_DEMANDE_COORDINATEUR_FAILURE', error };
  }
}
