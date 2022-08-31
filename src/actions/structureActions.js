import { structureService } from '../services/structureService';


export const structureActions = {
  getStructure,
};

function getStructure(idStructure) {
  return dispatch => {
    dispatch(request());

    structureService.getStructure(idStructure)
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
