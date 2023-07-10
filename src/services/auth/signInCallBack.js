import axios from 'axios';
import { authenticationActions } from '../../actions';
import apiUrlRoot from '../../helpers/apiUrl';
import { UserManager, WebStorageStateStore } from 'oidc-client-ts';

const userManager = new UserManager({
  authority: process.env.REACT_APP_AUTH_OIDC_AUTHORITY,
  client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
  client_secret: process.env.REACT_APP_AUTH_CLIENT_SECRET,
  post_logout_redirect_uri: `${process.env.REACT_APP_AUTH_REDIRECT_URI}/login`,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
});

const getProfile = () =>
  JSON.parse(
    localStorage.getItem(
      process.env.REACT_APP_AUTH_OIDC_USER_KEY
    )
  );

const getVerificationToken = () => window.location.pathname.split('/').pop();

const signInCallBack = async store => {
  const { dispatch } = store;
  window.history.replaceState({}, document.title, window.location.pathname);
  const profile = getProfile();
  const verificationToken = getVerificationToken();
  const token = profile?.access_token;
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
  .catch(() => {
    localStorage.removeItem('user');
    userManager.signoutRedirect();
  });
};

export default signInCallBack;
