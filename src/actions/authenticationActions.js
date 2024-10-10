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
  localStorage.removeItem('user');
  localStorage.removeItem('roleActivated');
  return { type: 'LOGOUT' };
}
