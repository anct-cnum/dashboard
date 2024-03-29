import { gestionnaireService } from '../services/gestionnaireService';
import { userService } from '../services/userService';

export const userActions = {
  verifyToken,
  inputEmailNotValid,
  getUsers,
  login,
  validationSuppressionCompteGrandReseau,
  validationSuppressionCompteStructure,
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

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));
    userService.login(username, password)
    .then(
      data => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('roleActivated', data?.user?.roles[0]);
        dispatch(success(data));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(user) {
    return { type: 'LOGIN_REQUEST', user };
  }
  function success(data) {
    return { type: 'LOGIN_SUCCESS', data };
  }
  function failure(error) {
    return { type: 'LOGIN_FAILURE', error };
  }
}

function inputEmailNotValid() {
  const error = 'Le format de l\'email est invalide';
  return { type: 'INPUT_EMAIL_NOT_VALID', error };
}

function getUsers() {
  return dispatch => {
    dispatch(request());

    userService.getUsers()
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

function validationSuppressionCompteGrandReseau(idUser) {
  return dispatch => {
    dispatch(request());

    userService.validationSuppressionCompteGrandReseau(idUser)
    .then(
      response => {
        dispatch(success(response));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'VALIDATION_SUPPRESSION_COMPTE_REQUEST' };
  }
  function success(response) {
    return { type: 'VALIDATION_SUPPRESSION_COMPTE_SUCCESS', response };
  }
  function failure(error) {
    return { type: 'VALIDATION_SUPPRESSION_COMPTE_FAILURE', error };
  }
}

function validationSuppressionCompteStructure(idUser, role = 'tous') {
  return dispatch => {
    dispatch(request());

    gestionnaireService.suppressionGestionnaire(idUser, role)
    .then(
      response => {
        dispatch(success(response));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'VALIDATION_SUPPRESSION_COMPTE_REQUEST' };
  }
  function success(response) {
    return { type: 'VALIDATION_SUPPRESSION_COMPTE_SUCCESS', response };
  }
  function failure(error) {
    return { type: 'VALIDATION_SUPPRESSION_COMPTE_FAILURE', error };
  }
}
