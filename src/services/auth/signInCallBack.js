import axios from 'axios';
import { authenticationActions } from '../../actions';
import apiUrlRoot from '../../helpers/apiUrl';
import { UserManager, WebStorageStateStore } from 'oidc-client-ts';

const userManager = new UserManager({
  authority: import.meta.env.VITE_APP_AUTH_OIDC_AUTHORITY,
  client_id: import.meta.env.VITE_APP_AUTH_CLIENT_ID,
  client_secret: import.meta.env.VITE_APP_AUTH_CLIENT_SECRET,
  post_logout_redirect_uri: `${import.meta.env.VITE_APP_AUTH_REDIRECT_URI}/passerelle`,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
});


const getProfile = () =>
  JSON.parse(
    localStorage.getItem(
      import.meta.env.VITE_APP_AUTH_OIDC_USER_KEY
    )
  );

const getVerificationToken = () => window.location.pathname.split('/').pop();

const signInCallBack = async store => {
  const { dispatch } = store;
  window.history.replaceState({}, document.title, window.location.pathname);
  const profile = getProfile();
  const verificationToken = getVerificationToken();
  const token = profile?.access_token;
  dispatch({ type: 'LOGIN_REQUEST' });
  await axios
  .get(`${apiUrlRoot}/login`, {
    params: {
      verificationToken
    },
    withCredentials: true,
    headers: {
      'Access-Control-Allow-Origin': `${apiUrlRoot}/login`,
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(result => {
    dispatch(authenticationActions.login(result?.data));
    dispatch(authenticationActions.refreshToken(result?.data?.accessToken));
    localStorage.setItem('user', JSON.stringify(result?.data));
    localStorage.setItem('roleActivated', result?.data?.user?.roles[0]);
  })
  .catch(async error => {
    localStorage.setItem('loginError', JSON.stringify(error?.response?.data ?? 'Connexion refusée'));
    userManager.signoutRedirect();
    localStorage.removeItem('user');
    dispatch({ type: 'LOGIN_FAILURE' });
  });
};

export default signInCallBack;
