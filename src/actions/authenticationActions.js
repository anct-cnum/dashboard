export const authenticationActions = {
  login,
  changeRoleActivated,
  refreshToken,
  loginFailure
};

function login(user) {
  return dispatch => {
    dispatch(success(user));
  };
  function success(user) {
    return { type: 'LOGIN_SUCCESS', user };
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
function loginFailure() {
  return { type: 'LOGIN_FAILURE' };
}
