import axios from 'axios';
import signOut from './logout';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { authenticationActions } from '../actions/authenticationActions';
import apiUrlRoot from '../helpers/apiUrl';

const refreshToken = async (auth, dispatch, user) => {
  if ((user)) {
    const decodedToken = jwt_decode(user?.accessToken);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      let response;
      try {
        response = await axios.post(
          `${apiUrlRoot}/refresh-token`,
          {},
          { withCredentials: true }
        );
        dispatch(authenticationActions.refreshToken(response.data?.accessToken));
      } catch (error) {
        signOut(auth);
        
      }
    }
  }
};

export default refreshToken;
