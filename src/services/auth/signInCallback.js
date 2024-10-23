import axios from 'axios';
import { authenticationActions } from '../../actions';
import apiUrlRoot from '../../helpers/apiUrl';

const API_URL = import.meta.env.VITE_APP_API_URL;

const handleSuccessfulLogin = (dispatch, userData) => {
  dispatch(authenticationActions.login(userData));
  dispatch(authenticationActions.refreshToken(userData.accessToken));
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('roleActivated', userData.user?.roles[0]);
};

const handleLoginError = (dispatch, error) => {
  const errorMessage = error?.response?.data ?? 'Connexion refusée';
  localStorage.setItem('loginError', JSON.stringify(errorMessage));
  localStorage.removeItem('user');
  dispatch({ type: 'LOGIN_FAILURE' });
  if (error.response?.data?.logoutUrl) {
    return {
      success: false,
      logoutUrl: error.response.data.logoutUrl,
      message: error.response.data.message
    };
  }
  return { success: false };
};

const signInCallback = async (dispatch, code, state, verificationToken) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { code, state },
      {
        params: { verificationToken },
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': `${apiUrlRoot}/login`,
        },
      }
    );
    if (response?.data?.accessToken) {
      handleSuccessfulLogin(dispatch, response.data);
      return { success: true };
    } else {
      throw new Error('No access token received');
    }
  } catch (error) {
    return handleLoginError(dispatch, error);
  }
};

export default signInCallback;
