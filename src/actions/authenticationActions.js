import signOut from '../services/auth/logout';

export const authenticationActions = {
  login,
  logout,
  changeRoleActivated,
  refreshToken,
  resetApplication,
};

function login(data) {
  return dispatch => {
    dispatch(success(data));
  };
  function success(data) {
    return { type: 'LOGIN_SUCCESS', data };
  }
}

function changeRoleActivated(role) {
  localStorage.setItem('roleActivated', role);
  return { type: 'CHANGE_ROLE', role };
}

function refreshToken(accessToken) {
  return dispatch => {
    dispatch(success(accessToken));
  };

  function success(accessToken) {
    return { type: 'REFRESH_TOKEN', accessToken };
  }
}

function resetApplication() {
  return { type: 'RESET_APPLICATION' };
}

function logout() {
  return dispatch => {
    dispatch(request());
    signOut()
    .then(() => {
      dispatch(success());
    })
    .catch(error => {
      dispatch(failure(error));
    });
  };

  function request() {
    return { type: 'LOGOUT_REQUEST' };
  }
  function success() {
    return { type: 'LOGOUT_SUCCESS' };
  }
  function failure(error) {
    return { type: 'LOGOUT_FAILURE', error };
  }
}
