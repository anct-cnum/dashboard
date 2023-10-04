import axios from 'axios';
import apiUrlRoot from '../../helpers/apiUrl';
import * as Sentry from '@sentry/react';

const signOut = async () => {
  localStorage.removeItem(
    'oidc.user'
  );
  localStorage.removeItem('user');
  localStorage.removeItem('roleActivated');
  try {
    await axios.post(`${apiUrlRoot}/logout`, {}, {
      withCredentials: true,
    });
  } catch (error) {
    Sentry.captureException(error);
  }
};

export default signOut;
