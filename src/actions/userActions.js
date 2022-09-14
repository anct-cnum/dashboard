import { userService } from '../services/userService';

export const userActions = {
  updateUserEmail,
  confirmeUserEmail,
  verifyToken,
  choosePassword,
  inputEmailNotValid
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


function choosePassword(token, password) {
  return dispatch => {
    dispatch(request(token));

    userService.choosePassword(token, password)
    .then(
      resultChoosePassword => {
        dispatch(success(resultChoosePassword));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(token) {
    return { type: 'CHOOSE_PASSWORD_REQUEST', token };
  }
  function success(resultChoosePassword) {
    return { type: 'CHOOSE_PASSWORD_SUCCESS', resultChoosePassword };
  }
  function failure(error) {
    return { type: 'CHOOSE_PASSWORD_FAILURE', error };
  }
}

function inputEmailNotValid() {
  const error = 'Le format de l\'email est invalide';
  return { type: 'INPUT_EMAIL_NOT_VALID', error };
}
