import { userService } from '../services/userService';

export const userActions = {
  updateUserEmail,
  confirmeUserEmail
};

function updateUserEmail({ id, newEmail }) {
  return dispatch => {
    dispatch(request());
    userService.updateUserEmail(id, newEmail)
    .then(
      user => dispatch(success(user)),
      error => {
        dispatch(failure(error));
      }
    );
  };
  
  function request() {
    return { type: 'UPDATE_USER_EMAIL_REQUEST' };
  }
  function success(user) {
    return { type: 'UPDATE_USER_EMAIL_SUCCESS', user };
  }
  function failure(error) {
    return { type: 'UPDATE_USER_EMAIL_FAILURE', error };
  }
}
function confirmeUserEmail(token) {
  return dispatch => {
    dispatch(request());
    userService.confirmeUserEmail(token)
    .then(
      user => dispatch(success(user)),
      error => {
        dispatch(failure(error));
      }
    );
  };
  
  function request() {
    return { type: 'CONFIRMATION_UPDATE_USER_EMAIL_REQUEST' };
  }
  function success(user) {
    return { type: 'CONFIRMATION_UPDATE_USER_EMAIL_SUCCESS', user };
  }
  function failure(error) {
    return { type: 'CONFIRMATION_UPDATE_USER_EMAIL_FAILURE', error };
  }
}
