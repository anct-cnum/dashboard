import { contratService } from '../services/contratService';

export const closeBannerActions = {
  closeBanner
};

function closeBanner(type, id) {
  return dispatch => {
    dispatch(request());

    contratService.closeBanner(type, id)
    .then(
      structure => dispatch(success(structure)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'CLOSE_AVENANT_BANNER_REQUEST' };
  }
  function success(structure) {
    return { type: 'CLOSE_AVENANT_BANNER_SUCCESS', structure };
  }
  function failure(error) {
    return { type: 'CLOSE_AVENANT_BANNER_FAILURE', error };
  }
}
