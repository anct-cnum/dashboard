import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticationActions, userActions } from '../../actions';
import { useParams, useNavigate } from 'react-router-dom';
import { checkComplexity } from '../../utils/formatagesUtils';
import { Oval } from 'react-loader-spinner';
import { scrollTopWindow } from '../../utils/exportsUtils';

function ChoosePassword() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resultVerifyToken = useSelector(
    state => state.user.resultVerifyToken
  );
  const resultChoosePassword = useSelector(
    state => state.user.resultChoosePassword
  );
  const { tokenVerified, verifyingToken, loading, error } =
    useSelector(state => state?.user);
  const [submitted, setSubmitted] = useState(false);
  const [inputs, setInputs] = useState({
    password: '',
    confirmPassword: '',
  });
  const { password, confirmPassword } = inputs;
  useEffect(() => {
    dispatch(authenticationActions.logout());
    dispatch(userActions.verifyToken(token));
  }, []);
  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }
  function handleSubmit() {
    setSubmitted(true);
    if (
      password &&
      confirmPassword === password &&
      checkComplexity(password)
    ) {
      scrollTopWindow();
      dispatch(userActions.choosePassword(token, password));
      setTimeout(() => {
        navigate('/login');
      }, 10000);
    }
  }

  return (
    <div className="fr-container fr-my-10w">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-grid-row fr-grid-row--center fr-mt-3w">
          <div style={{ textAlign: 'center' }}>
            {verifyingToken && <span className="fr-h2">Chargement...</span>}
            {resultChoosePassword &&
              <div className="fr-alert fr-alert--success">
                <p className="fr-alert__title">L&apos;activation de votre espace a &eacute;t&eacute; effectu&eacute;e avec succ&egrave;s</p>
                <p>Nous allons vous rediriger sur la page de connexion...</p>
              </div>
            }
            {tokenVerified === false &&
              <div className="fr-alert fr-alert--error">
                <p className="fr-alert__title">
                D&eacute;sol&eacute; mais le lien est invalide ou a d&eacute;j&agrave; &eacute;t&eacute; utilis&eacute;.
                Veuillez contactez le support si besoin.
                </p>
              </div>
            }
            <div className="spinnerCustom">
              <Oval
                height={100}
                width={100}
                color="#060091"
                secondaryColor="white"
                visible={loading === true}
              />
            </div>
            {tokenVerified === true && !resultChoosePassword &&
              <div>
                <div>
                  {error && <span>{error ? error : 'Une erreur s\'est produite'}</span>}
                </div>
                <div className="fr-alert fr-alert--info">
                  <p className="fr-alert__title">Choisissez votre mot de passe </p>
                  <span>Celui-ci doit contenir au moins 8 caractères dont une
                    minuscule, une majuscule, un chiffre et un caractère
                    spécial(!@#$%^&amp;*)</span>
                </div>
                <div className="fr-my-3w">
                  <label className="fr-label">Votre adresse mail:</label>
                  <span>{resultVerifyToken.name}</span>
                </div>
                <div className="fr-my-3w">
                  <label className="fr-label">Mot de passe</label>
                  <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={handleChange}
                    className={submitted && !password ? ' is-invalid fr-input' : 'fr-input' }
                  />
                  <p
                    id="text-input-valid-desc-valid"
                    className="fr-valid-text"
                    style={!checkComplexity(password) ? { color: 'grey' } : {}}>
                    Mot de passe correspond aux exigences de sécurité
                  </p>
                  {submitted && !password &&
                    <p id="text-input-error-desc-error" className="fr-error-text">
                      Mot de passe requis
                    </p>
                  }
                  {submitted && password && !checkComplexity(password) &&
                    <p id="text-input-error-desc-error" className="fr-error-text" >
                      Le mot de passe ne correspond pas aux exigences de
                      sécurité.
                    </p>
                  }
                </div>
                <div className="fr-my-3w">
                  <label className="fr-label">Mot de passe (confirmation)</label>
                  <input
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={handleChange}
                    className={password !== confirmPassword ? 'is-invalid fr-input error-425' : 'fr-input'}
                  />
                  {submitted && password !== confirmPassword &&
                    <p id="text-input-error-desc-error" className="fr-error-text">
                      Mot de passe doit être identique
                    </p>
                  }
                  <p
                    id="text-input-valid-desc-valid"
                    className="fr-valid-text"
                    style={password && password === confirmPassword ? {} : { color: 'grey' } }
                  >
                    Mot de passe est identique.
                  </p>
                </div>
                <button className="fr-btn" onClick={handleSubmit}>
                  Valider
                </button>
                {loading && <span>Chargement...</span>}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChoosePassword;
