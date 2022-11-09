import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from 'react-oidc-context';
import { useParams } from 'react-router-dom';
import logo from '../../assets/brands/logo-inclusionconnect-bouton.svg';

export default function Login() {

  const error = useSelector(state => state.authentication?.error);

  const auth = useAuth();

  const login = () => {
    localStorage.setItem('user', JSON.stringify({}));
    auth.signinRedirect();
  };

  const { verificationToken } = useParams();
  
  if (verificationToken) {
    localStorage.setItem('verificationToken', verificationToken);
  }
  
  return (
    <div className="login">
      <div className="fr-container fr-my-10w">
        <div className="fr-grid-row fr-grid-row--center" style={{ textAlign: 'center' }}>
          <div className="fr-col-6">
            <div className="fr-my-3w">
            </div>
            <button onClick={login}>
              <img src={logo} className="btn" alt="Logo Inclusion Connect" />
            </button>
            {error &&
            <div className="fr-alert fr-alert--error fr-mt-1w">
              <p className="fr-alert__title">{ error.error }</p>
            </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
