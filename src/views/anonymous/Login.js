import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticationActions } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const error = useSelector(state => state.authentication?.error);
  const user = useSelector(state => state.authentication?.user);

  useEffect(() => {
    //Si login OK, renvoie vers la page d'accueil
    if (user) {
      navigate('/');
    }
  }, [user]);

  useEffect(() => {
    dispatch(authenticationActions.logout());
  }, []);

  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const { username, password } = inputs;

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value.trim() })); //trim to drop auto spaces
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (username && password) {
      dispatch(authenticationActions.login(username, password));
    }
  }

  return (
    <div className="login">
      <div className="fr-container fr-my-10w">
        <div className="fr-grid-row fr-grid-row--center" style={{ textAlign: 'center' }}>
          <div className="fr-col-6">
            <h2>Connexion</h2>
            <form method="post" onSubmit={handleSubmit}>
              <div className="fr-my-3w">
                <div className={`fr-input-group ${submitted && !username ? 'fr-input-group--error' : ''}`}>
                  <label className="fr-label" htmlFor="username-input">
                    Adresse email
                  </label>
                  <input
                    className={`fr-input ${submitted && !username ? 'fr-input--error' : ''}`}
                    aria-describedby="username-error"
                    type="text"
                    id="username-input"
                    name="username"
                    value={username}
                    onChange={handleChange} />
                  {submitted && !username &&
                    <p id="username-error" className="fr-error-text">
                      Adresse email requise
                    </p>
                  }
                </div>
              </div>
              <div className="fr-my-3w">
                <div className={`fr-input-group ${submitted && !password ? 'fr-input-group--error' : ''}`}>
                  <label className="fr-label" htmlFor="password-input">
                    Mot de passe
                  </label>
                  <input
                    className={`fr-input ${submitted && !password ? 'fr-input--error' : ''}`}
                    aria-describedby="password-error"
                    type="password"
                    id="password-input"
                    name="password"
                    autoComplete="on"
                    value={password}
                    onChange={handleChange} />
                  {submitted && !password &&
                    <p id="password-error" className="fr-error-text">
                      Mot de passe requis
                    </p>
                  }
                </div>
              </div>
              <button className="fr-btn" type="submit">Se connecter</button>
            </form>
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
