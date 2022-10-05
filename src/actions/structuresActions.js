import { structuresService } from '../services/structuresService';


export const structuresActions = {
  getStructure,
};

function getStructure(idStructure) {
  return dispatch => {
    dispatch(request());
    structuresService.getStructure(idStructure)
    .then(
      structure => {
        dispatch(success(structure));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_STRUCTURE_REQUEST' };
  }
  function success(structure) {
    return { type: 'GET_STRUCTURE_SUCCESS', structure };
  }
  function failure(error) {
    return { type: 'GET_STRUCTURE_FAILURE', error };
  }
}
