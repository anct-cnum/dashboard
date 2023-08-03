import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';

export default function Passerelle() {

  const error = useSelector(state => state.authentication?.error);
  const user = useSelector(state => state.authentication?.user);
  const isLoading = useSelector(state => state.authentication?.loading);
  const auth = useAuth();
  const navigate = useNavigate();

  const login = async () => {
    await auth.signoutRedirect();
    await localStorage.setItem('user', JSON.stringify({}));
    await auth.signinRedirect();
  };

  useEffect(() => {
    if (user && localStorage.getItem('user') && localStorage.getItem('user') !== '{}') {
      navigate('/accueil');
    }
  }, [user, error, isLoading, auth.isLoading]);

  return (
    <div className="login">
      <div className="fr-container fr-my-10w">
        {error &&
            <div className="fr-alert fr-alert--error fr-mt-1w">
              <p className="fr-alert__title">{ error }</p>
            </div>
        }
        <Spinner loading={isLoading === true || auth.isLoading === true} />
        <div className="fr-grid-row fr-grid-row--center fr-mt-1-5v" style={{ textAlign: 'center' }}>
          { (isLoading === true || auth.isLoading === true) &&
            <div className="wrapperModal"></div>
          }
          { ((isLoading === false && auth.isLoading === false) && auth.isAuthenticated === true) &&
         <button className="fr-btn" onClick={login}>Se connecter</button>
          }
        </div>
      </div>
    </div>
  );
}
