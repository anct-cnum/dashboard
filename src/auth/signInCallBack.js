import axios from 'axios';
import { authenticationActions } from '../actions';
import apiUrlRoot from '../helpers/apiUrl';

const getProfile = () =>
  JSON.parse(
    localStorage.getItem(
      'oidc.user'
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
  const profile = await getProfile();
  const verificationToken = await getVerificationToken();
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
    dispatch(authenticationActions.login(result.data.user));
    dispatch(authenticationActions.refreshToken(result.data.accessToken));
    localStorage.setItem('user', JSON.stringify(result?.data));
    localStorage.setItem('roleActivated', result?.data.user.roles[0]);
  })
  .catch(err => {
    console.log(err);
    window.location.pathname = '/login';
  });
};


export default signInCallBack;
