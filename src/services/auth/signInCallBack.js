import axios from 'axios';
import { authenticationActions } from '../../actions';

const signInCallBack = async (dispatch, code, state, verificationToken) => {
  try {
    dispatch({ type: 'LOGIN_REQUEST' });
    const reponse = await axios.post(import.meta.env.VITE_APP_API_URL + '/login', { code, state }, { params: { verificationToken } });
    if (reponse?.data?.accessToken) {
      dispatch(authenticationActions.login(reponse?.data));
      dispatch(authenticationActions.refreshToken(reponse?.data?.accessToken));
      localStorage.setItem('user', JSON.stringify(reponse?.data));
      localStorage.setItem('roleActivated', reponse?.data?.user?.roles[0]);
      return { success: true };
    }
  } catch (error) {
    localStorage.setItem('loginError', JSON.stringify(error?.response?.data ?? 'Connexion refusée'));
    localStorage.removeItem('user');
    dispatch({ type: 'LOGIN_FAILURE' });
    if (error.response?.data?.logoutUrl) {
      return { success: false, logoutUrl: error.response.data.logoutUrl };
    }
    return { success: false };
  }
};

export default signInCallBack;
