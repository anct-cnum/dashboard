import { coordinateurService } from '../services/coordinateurService.js';

export const coordinateurActions = {
  getDemandesCoordinateur,
};

// eslint-disable-next-line max-len
function getDemandesCoordinateur(page, statutDemande, filtreSearchBar, filtreDepartement, filtreRegion, filtreAvisPrefet, ordreNom = 'dateCandidature', ordre = -1) {
  return dispatch => {
    dispatch(request());

    coordinateurService.getDemandesCoordinateur(page, statutDemande, filtreSearchBar, filtreDepartement, filtreRegion, filtreAvisPrefet, ordreNom, ordre)
    .then(
      demandesCoordinateur => dispatch(success(demandesCoordinateur)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GETALL_DEMANDES_COORDINATEUR_REQUEST' };
  }
  function success(demandesCoordinateur) {
    return { type: 'GETALL_DEMANDES_COORDINATEUR_SUCCESS', demandesCoordinateur };
  }
  function failure(error) {
    return { type: 'GETALL_DEMANDES_COORDINATEUR_FAILURE', error };
  }
}
