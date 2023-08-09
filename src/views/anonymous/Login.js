import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from 'react-oidc-context';
import { useParams, useNavigate } from 'react-router-dom';
import logoOneLineIC from '../../assets/brands/logo-inclusion-connect-one-line.svg';
import logoTwoLinesIC from '../../assets/brands/logo-inclusion-connect-two-lines.svg';
import { userActions } from '../../actions';

export default function Login() {

  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });

  const error = useSelector(state => state.authentication?.error);
  const tokenVerified = useSelector(state => state?.user?.tokenVerified);
  const dispatch = useDispatch();
  const auth = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const { username, password } = inputs;
  const user = useSelector(state => state.authentication?.user);
  
  const navigate = useNavigate();


  const login = () => {
    localStorage.setItem('user', JSON.stringify({}));
    auth.signinRedirect();
  };

  const { verificationToken } = useParams();
 
  useEffect(() => {
    if (verificationToken) {
      localStorage.removeItem('user');
      dispatch(userActions.verifyToken(verificationToken));
    }
    // on remove suite à la déconnexion..
    localStorage.removeItem('logoutAction');
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
      <div className="fr-container fr-my-10w">
        <div className="fr-grid-row fr-grid-row--center" style={{ textAlign: 'center' }}>
          <div className="fr-col-xs-12 fr-col-md-6">
            {(window.location.pathname === '/login' || tokenVerified) &&
              <>
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
