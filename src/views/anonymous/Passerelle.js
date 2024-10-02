import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import signInCallBack from '../../services/auth/signInCallBack';
import { handleProConnectLogin } from '../../helpers/proConnectLogin';

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
      const stateWithToken = atob(state);
      const { state: stateToken, nonce } = JSON.parse(stateWithToken);
      
      if (stateToken === storedState && nonce === storedNonce) {
        try {
          const { state: decodedState, verificationToken } = JSON.parse(stateWithToken);
          const result = await signInCallBack(dispatch, code, decodedState, verificationToken);
          if (result.success) {
            navigate('/accueil');
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
            <div className="fr-alert fr-alert--error fr-mt-1w fr-mb-4w">
              <h3 className="fr-alert__title">Erreur : Le compte avec lequel vous tentez de vous connecter est inconnu.</h3>
              <p className="fr-mb-1v">Merci de v&eacute;rifier que vous utilisez la m&ecirc;me adresse mail
                que votre ancien compte&nbsp;: structure / pr&eacute;fet / coordinateur / grand r&eacute;seau / admin.</p>
              <p>Si malgr&eacute; cela vous rencontrez toujours des difficult&eacute;s pour vous connecter nous vous invitons à&nbsp;:</p>
              <ul>
                <li>Consulter la <a className="fr-link fr-link--lg"
                  href="https://aide.conseiller-numerique.gouv.fr/fr/article/je-narrive-pas-a-me-connecter-au-tableau-de-pilotage-comment-y-acceder-1fwci8l/">
                  &nbsp;FAQ</a></li>
                <li>Contacter le <a className="fr-link fr-link--lg"
                  href="mailto:conseiller-numerique@anct.gouv.fr">support</a> si vous n&apos;y trouvez pas votre r&eacute;ponse.</li>
              </ul>
              <p>Le tableau de pilotage n&apos;est pas destin&eacute; aux Conseillers num&eacute;rique
                mais seulement aux gestionnaires de structures accueillantes.</p>
            </div>
        }
        <div className="fr-grid-row fr-grid-row--center fr-mt-1-5v" style={{ textAlign: 'center' }}>
          { !isLoading && !callbackLoading && !loginLoading &&
          <button id="login" className="agentconnect-button" onClick={() => handleProConnectLogin(verificationToken, setLoginLoading, setError)}>
            <span className="agentconnect-sr-only">S’identifier avec AgentConnect</span>
          </button>
          }
        </div>
      </div>
    </div>
  );
}
