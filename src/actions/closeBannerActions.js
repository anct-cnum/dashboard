import { renouvellementService } from '../services/renouvellementService';

export const closeBannerActions = {
  closeBanner
};

function closeBanner(type, id) {
  return dispatch => {
    dispatch(request());

    renouvellementService.closeBanner(type, id)
    .then(
      message => dispatch(success(message)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'CLOSE_BANNER_REQUEST' };
  }
  function success(message) {
    return { type: 'CLOSE_BANNER_SUCCESS', message };
  }
  function failure(error) {
    return { type: 'CLOSE_BANNER_FAILURE', error };
  }
}