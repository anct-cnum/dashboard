import { userService } from '../services/userService';

export const userActions = {
  updateUserEmail,
  confirmeUserEmail,
  verifyToken
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

function verifyToken(token) {
  return dispatch => {
    dispatch(request(token));

    userService.verifyToken(token)
    .then(
      resultVerifyToken => {
        resultVerifyToken.role = resultVerifyToken.roles[0];
        delete resultVerifyToken.roles;
        dispatch(success(resultVerifyToken));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(token) {
    return { type: 'VERIFY_TOKEN_REQUEST', token };
  }
  function success(resultVerifyToken) {
    return { type: 'VERIFY_TOKEN_SUCCESS', resultVerifyToken };
  }
  function failure(error) {
    return { type: 'VERIFY_TOKEN_FAILURE', error };
  }
}
