import axios from 'axios';
import signOut from './logout';
import { jwtDecode } from 'jwt-decode';
import { authenticationActions } from '../../actions/authenticationActions';
import apiUrlRoot from '../../helpers/apiUrl';

const refreshToken = async (dispatch, accessToken) => {
  console.log('------>refreshToken', accessToken);
  if (accessToken && Object.keys(accessToken)?.length > 0) {
    const decodedToken = jwtDecode(accessToken);
    const isExpired = decodedToken.exp < Date.now().valueOf() / 1000;
    if (isExpired) {
      let response;
      try {
        response = await axios.post(
          `${apiUrlRoot}/refresh-token`,
          {},
          { withCredentials: true }
        );
        dispatch(authenticationActions.refreshToken(response.data?.accessToken));
      } catch (error) {
        window.location.pathname = '/login';
        await signOut();
      }
    }
  }
};

export default refreshToken;
