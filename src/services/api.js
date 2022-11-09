import axios from 'axios';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { authenticationActions } from '../actions/authenticationActions';
import signOut from '../auth/logout';
import apiUrlRoot from '../helpers/apiUrl';

export const API = axios.create({
  baseURL: `${apiUrlRoot}`
});

const setup = store => {
  const { dispatch } = store;
  let user;
  API.interceptors.request.use(async req => {
    user = store.getState().authentication.user || JSON.parse(localStorage.getItem('user'));
    req.headers.Authorization = `Bearer ${user?.accessToken}`;
    const decodedToken = jwt_decode(user?.accessToken);
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
      dispatch(authenticationActions.refreshToken(response.data.accessToken));
      req.headers.Authorization = `Bearer ${response.data.accessToken}`;

      return req;
    } catch (error) {
      signOut();
      
    }
  });
};

export default setup;
