import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticationActions } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const error = useSelector(state => state.authentication.error);
  const user = useSelector(state => state.authentication.user);

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
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  function handleSubmit() {
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
            <div>
              <div className="fr-my-3w">
                <label className="fr-label">Adresse email</label>
                <input name="username" value={username} onChange={handleChange} className={(submitted && !username ? ' is-invalid fr-input' : 'fr-input')} />
                {submitted && !username &&
              <div className="invalid">Adresse email requise</div>
                }
              </div>
              <div className="fr-my-3w">
                <label className="fr-label">Mot de passe</label>
                <input name="password"
                  type="password"
                  value={password}
                  onChange={handleChange}
                  className={(submitted && !password ? ' is-invalid fr-input' : 'fr-input')} />
                {submitted && !password &&
              <div className="invalid">Mot de passe requis</div>
                }
              </div>
              <button className="fr-btn" onClick={handleSubmit}>Se connecter</button>
            </div>
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
