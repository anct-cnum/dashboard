import { coordinateurService } from '../services/coordinateurService.js';

export const coordinateurActions = {
  get
};

function get(id) {
  return dispatch => {
    dispatch(request());

    coordinateurService.get(id)
    .then(
      coordinateur => dispatch(success(coordinateur)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_COORDINATEUR_REQUEST' };
  }
  function success(coordinateur) {
    return { type: 'GET_COORDINATEUR_SUCCESS', coordinateur };
  }
  function failure(error) {
    return { type: 'GET_COORDINATEUR_FAILURE', error };
  }
}
