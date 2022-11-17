import { userService } from '../services/userService';

export const userActions = {
  verifyToken,
  inputEmailNotValid,
  usersByStructure
};

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

function inputEmailNotValid() {
  const error = 'Le format de l\'email est invalide';
  return { type: 'INPUT_EMAIL_NOT_VALID', error };
}

function usersByStructure(structureId) {
  return dispatch => {
    dispatch(request());

    userService.usersByStructure(structureId)
    .then(
      users => {
        dispatch(success(users));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_USERS_REQUEST' };
  }
  function success(users) {
    return { type: 'GET_USERS_SUCCESS', users };
  }
  function failure(error) {
    return { type: 'GET_USERS_FAILURE', error };
  }
}
