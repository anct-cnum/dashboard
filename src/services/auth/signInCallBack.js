import axios from 'axios';
import { authenticationActions } from '../../actions';
import apiUrlRoot from '../../helpers/apiUrl';

const getProfile = () =>
  JSON.parse(
    localStorage.getItem(
      process.env.REACT_APP_OIDC_USER_KEY
    )
  );

const getVerificationToken = () =>
  JSON.parse(
    localStorage.getItem(
      'verificationToken'
    )
  );

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
    window.location.pathname = '/login';
  });
};

export default signInCallBack;
