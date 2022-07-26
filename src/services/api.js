import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { authenticationActions } from '../actions/authenticationActions';
import signOut from '../services/auth/logout';
import apiUrlRoot from '../helpers/apiUrl';
import { getAccessToken } from '../helpers/getAccessToken';

export const API = axios.create({
  baseURL: `${apiUrlRoot}`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  }
});

const setup = store => {
  const { dispatch } = store;
  let accessToken;
  API.interceptors.request.use(async req => {
    accessToken = store.getState()?.authentication?.accessToken || getAccessToken();
    if (!accessToken || !Object.keys(accessToken)?.length > 0) {
      await signOut();
      return;
    }
    req.headers.Authorization = `Bearer ${accessToken}`;
    const decodedToken = jwtDecode(accessToken);
    const isExpired = decodedToken.exp < Date.now().valueOf() / 1000;
    if (!isExpired) {
      return req;
    }
    try {
      const response = await axios.post(
        `${apiUrlRoot}/refresh-token`,
        {},
        { withCredentials: true }
      );
      dispatch(authenticationActions.refreshToken(response.data?.accessToken));
      req.headers.Authorization = `Bearer ${response.data?.accessToken}`;

      return req;
    } catch (error) {
      await signOut();
    }
  });
};

export default setup;
