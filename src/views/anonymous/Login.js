import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { userActions } from '../../actions';
import './Login.css';
import Spinner from '../../components/Spinner';
import { handleProConnectLogin } from '../../helpers/proConnectLogin';
import AccountNotFound from './AccountNotFound';

export default function Login() {

  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });

  const error = useSelector(state => state.authentication?.error);
  const tokenVerified = useSelector(state => state?.user?.tokenVerified);
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [proConnectLoading, setProConnectLoading] = useState(false);
  const [showAccountNotFound, setShowAccountNotFound] = useState(false);
  const { username, password } = inputs;
  const user = useSelector(state => state.authentication?.user);
  
  const navigate = useNavigate();

  const { verificationToken } = useParams();
 
  useEffect(() => {
    if (verificationToken) {
      localStorage.removeItem('user');
      dispatch(userActions.verifyToken(verificationToken));
    }
    localStorage.removeItem('logoutAction');
    const storedError = JSON.parse(localStorage.getItem('loginError'));
    if (storedError === 'Connexion refusée') {
      setShowAccountNotFound(true);
      localStorage.removeItem('loginError');
    }

  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value.trim() }));
  }

  function handleSubmit() {
    setSubmitted(true);
    if (username && password) {
      const { from } = location.state || { from: { pathname: '/' } };
      dispatch(userActions.login(username, password, from));
    }
  }
  
  useEffect(() => {
    if (localStorage.getItem('user') && localStorage.getItem('user') !== '{}') {
      navigate('/accueil');
    }
  }, [user]);
  
  return (
    <div className="login">
      <Spinner loading={!(localStorage.getItem('user') && localStorage.getItem('user') !== '{}') && proConnectLoading} />
      <div className="fr-container fr-my-10w">
        {showAccountNotFound && <AccountNotFound/>}
        <div className="fr-grid-row fr-grid-row--center" style={{ textAlign: 'center' }}>
          <div className="fr-col-xs-12 fr-col-md-6">
            {(window.location.pathname === '/login' || tokenVerified) &&
              <>
                <button
                  id="login"
                  className="agentconnect-button"
                  onClick={() =>
                    handleProConnectLogin(verificationToken, setProConnectLoading, setNetworkError)
                  }
                >
                  <span className="agentconnect-sr-only">S’identifier avec AgentConnect</span>
                </button>
                {
                  networkError && <div className="fr-alert fr-alert--error fr-mt-1w fr-mb-4w">
                    <h3 className="fr-alert__title">&Eacute;chec de la connexion &agrave; Inclusion Connect</h3>
                    <p className="fr-mb-1v">
                      Inclusion Connect ne r&eacute;pond pas,
                      merci de v&eacute;rifier votre r&eacute;seau ou de contacter le
                      support Inclusion Connect par mail pour plus d&rsquo;informations.
                    </p>
                    <a className="fr-link"
                      href="mailto:support@connect.inclusion.beta.gouv.fr">support@connect.inclusion.beta.gouv.fr
                    </a>
                  </div>
                }
                {process.env.NODE_ENV === 'development' &&
                <>
                  <div className="fr-my-4w">
                    <div className="fr-px-2w fr-mb-2w">
                      <h3>Se connecter avec identifiants</h3>
                      <label className="fr-label email" htmlFor="email">E-mail</label>
                      <input
                        id="email"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        className={`fr-input fr-input-custom ${submitted && !password ? ' is-invalid' : ''}`} />
                      {submitted && !username &&
                        <div className="invalid">Identifiant requis</div>
                      }
                    </div>
                    <div className="fr-px-2w fr-mb-4w">
                      <label className="fr-label password" htmlFor="password">Mot de passe</label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={handleChange}
                        className={`fr-input fr-input-custom ${submitted && !password ? ' is-invalid' : ''}`} />
                      {submitted && !password &&
                        <div className="invalid">Mot de passe requis</div>
                      }
                    </div>
                  </div>
                  <div>
                    <button className="fr-btn fr-text--bold big-btn" onClick={handleSubmit}>Connexion</button>
                  </div>
                  <div>
                    {error && <span className="invalid">{error.error}</span>}
                  </div>
                </>
                }
                
              </>
            }
            {error &&
            <div className="fr-alert fr-alert--error fr-mt-1w">
              <p className="fr-alert__title">{ error.error }</p>
            </div>
            }
          </div>
        </div>
        {tokenVerified === false &&
        <div className="fr-grid-row fr-grid-row--center fr-mb-10w" style={{ textAlign: 'center' }}>
          <div className="fr-col-10">
            <div className="fr-alert fr-alert--error">
              <p className="fr-alert__title">
                D&eacute;sol&eacute; mais le lien est invalide ou a d&eacute;j&agrave; &eacute;t&eacute; utilis&eacute;.
                Veuillez contactez le support si besoin.
              </p>
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  );
}
