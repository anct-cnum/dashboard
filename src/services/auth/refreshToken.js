import axios from 'axios';
import signOut from './logout';
import jwtDecode from 'jwt-decode';
import { authenticationActions } from '../../actions/authenticationActions';
import apiUrlRoot from '../../helpers/apiUrl';

const refreshToken = async (auth, dispatch, accessToken) => {
  if (accessToken) {
    const decodedToken = jwtDecode(accessToken);
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
