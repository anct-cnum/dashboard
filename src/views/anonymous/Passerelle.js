import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import logoOneLineIC from '../../assets/brands/logo-inclusion-connect-one-line.svg';
import logoTwoLinesIC from '../../assets/brands/logo-inclusion-connect-two-lines.svg';

export default function Passerelle() {

  const user = useSelector(state => state.authentication?.user);
  const isLoading = useSelector(state => state.authentication?.loading);
  const [error, setError] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate();


  const login = async () => {
    localStorage.setItem('user', JSON.stringify({}));
    auth.signinRedirect();
  };

  useEffect(() => {
    if (user && localStorage.getItem('user') && localStorage.getItem('user') !== '{}') {
      navigate('/accueil');
    }
  }, [user, error, isLoading, auth.isLoading]);

  useEffect(() => {
    const storedError = JSON.parse(localStorage.getItem('loginError'));
    if (storedError) {
      setError(storedError);
      localStorage.removeItem('loginError');
    }
  }, []);

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
          <div className="logo-inclusion-connect-one-line">
            <button className="btn-inclusion-connect" onClick={login}>
              <img src={logoOneLineIC} height="14" alt="Se connecter avec Inclusion Connect" />
            </button>
          </div>
          <div className="logo-inclusion-connect-two-lines">
            <button className="btn-inclusion-connect" onClick={login}>
              <img src={logoTwoLinesIC} height="37" alt="Se connecter avec Inclusion Connect" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
