import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { authenticationActions } from '../actions/authenticationActions';
import signOut from '../services/auth/logout';
import apiUrlRoot from '../helpers/apiUrl';
import { getAccessToken } from '../helpers/getAccessToken';

export const API = axios.create({
  baseURL: `${apiUrlRoot}`
});

const setup = store => {
  const { dispatch } = store;
  let accessToken;
  API.interceptors.request.use(async req => {
    accessToken = store.getState().authentication.accessToken || getAccessToken();
    req.headers.Authorization = `Bearer ${accessToken}`;
    const decodedToken = jwtDecode(accessToken);
    const isExpired = decodedToken.exp * 1000 < new Date().getTime();
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
      signOut();
    }
  });
};

export default setup;
