import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import signInCallback from '../../services/auth/signInCallback';
import { handleProConnectLogin } from '../../helpers/proConnectLogin';
import AccountNotFound from './AccountNotFound';

const parseStateToken = state => {
  const stateWithToken = atob(state);
  const { state: stateToken, nonce, verificationToken } = JSON.parse(stateWithToken);
  return { stateToken, nonce, decodedState: stateToken, verificationToken };
};

const validateState = (stateToken, nonce) => {
  const storedState = localStorage.getItem('state');
  const storedNonce = localStorage.getItem('nonce');
  if (stateToken !== storedState || nonce !== storedNonce) {
    throw new Error('Paramètres manquants');
  }
};

export default function Passerelle() {

  const isLoading = useSelector(state => state.authentication?.loading);
  const [callbackLoading, setCallbackLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { verificationToken } = useParams();

  useEffect(() => {
    async function handleCallback() {
      setCallbackLoading(true);
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const storedState = localStorage.getItem('state');
      const storedNonce = localStorage.getItem('nonce');
      const { stateToken, nonce, decodedState, verificationToken } = parseStateToken(state);
      validateState(stateToken, nonce);
      if (stateToken === storedState && nonce === storedNonce) {
        try {
          const result = await signInCallback(dispatch, code, decodedState, verificationToken);
          if (result.success) {
            navigate('/accueil');
          } else if (result.logoutUrl) {
            localStorage.setItem('loginError', JSON.stringify(result.message));
            setError(result.message);
            window.location.href = result.logoutUrl;
          }
        } catch (error) {
          setError('Une erreur est survenue lors de la connexion');
        }
      } else {
        setError('Paramètres manquants');
      }
      setCallbackLoading(false);
    }
    handleCallback();
  }, [location, navigate]);

  useEffect(() => {
    const storedError = JSON.parse(localStorage.getItem('loginError'));
    if (storedError) {
      setError(storedError);
      localStorage.removeItem('loginError');
    }
  }, []);

  return (
    <div className="login">
      <Spinner loading={!(localStorage.getItem('user') && localStorage.getItem('user') !== '{}') && (isLoading || callbackLoading || loginLoading) } />
      <div className="fr-container fr-my-10w">
        {error === 'Connexion refusée' &&
            <AccountNotFound />
        }
        <div className="fr-grid-row fr-grid-row--center fr-mt-1-5v" style={{ textAlign: 'center' }}>
          { !isLoading && !callbackLoading && !loginLoading &&
          <button id="login" className="proconnect-button" onClick={() => handleProConnectLogin(verificationToken, setLoginLoading, setError)}>
            <span className="proconnect-sr-only">S’identifier avec ProConnect</span>
          </button>
          }
        </div>
      </div>
    </div>
  );
}
