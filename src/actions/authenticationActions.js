export const authenticationActions = {
  login,
  changeRoleActivated,
  refreshToken,
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
