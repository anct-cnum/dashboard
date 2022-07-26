import { authenticationService } from '../services/authentificationService';

export const authenticationActions = {
  login,
  logout,
  changeRoleActivated
};

function login(username, password) {

  return dispatch => {
    dispatch(request(username));

    authenticationService.login(username, password)
    .then(
      data => {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('roleActivated', data.user.roles[0]);
        dispatch(success(data));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'LOGIN_REQUEST' };
  }
  function success(user) {
    return { type: 'LOGIN_SUCCESS', user };
  }
  function failure(error) {
    return { type: 'LOGIN_FAILURE', error };
  }

}

function logout() {
  authenticationService.logout();
  return { type: 'LOGOUT' };
}

function changeRoleActivated(role) {
  localStorage.setItem('roleActivated', role);
  return { type: 'CHANGE_ROLE', role };
}
