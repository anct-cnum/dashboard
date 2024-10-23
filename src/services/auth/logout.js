import axios from 'axios';
import apiUrlRoot from '../../helpers/apiUrl';

const signOut = async () => {
  localStorage.removeItem('user');
  localStorage.removeItem('roleActivated');
  try {
    await axios.post(`${apiUrlRoot}/logout`, {}, {
      withCredentials: true,
    });
  } catch (error) {
    window.location.pathname = '/login';
  }
};

export default signOut;
