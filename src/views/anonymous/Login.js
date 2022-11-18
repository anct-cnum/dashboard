import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from 'react-oidc-context';
import { useParams } from 'react-router-dom';
import logo from '../../assets/brands/logo-inclusionconnect-bouton-min.svg';
import { userActions } from '../../actions';

export default function Login() {

  const error = useSelector(state => state.authentication?.error);
  const tokenVerified = useSelector(state => state?.user?.tokenVerified);
  const dispatch = useDispatch();
  const auth = useAuth();

  const login = () => {
    localStorage.setItem('user', JSON.stringify({}));
    auth.signinRedirect();
  };

  const { verificationToken } = useParams();
 
  useEffect(() => {
    if (verificationToken) {
      localStorage.setItem('verificationToken', verificationToken);
      dispatch(userActions.verifyToken(verificationToken));
    }
  }, []);
  
  return (
    
    <div className="login">
      <div className="fr-container fr-my-10w">
        <div className="fr-grid-row fr-grid-row--center" style={{ textAlign: 'center' }}>
          <div className="fr-col-6">
            <button className="fr-my-3w" onClick={login}>
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
      {tokenVerified === false &&
            <div className="fr-alert fr-alert--error">
              <p className="fr-alert__title">
              D&eacute;sol&eacute; mais le lien est invalide ou a d&eacute;j&agrave; &eacute;t&eacute; utilis&eacute;.
              Veuillez contactez le support si besoin.
              </p>
            </div>}
    </div>
  );
}
