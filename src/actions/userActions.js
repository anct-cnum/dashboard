import { userService } from '../services/userService';

export const userActions = {
  inputEmailNotValid,
  usersByStructure
};

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
