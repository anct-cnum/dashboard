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
        {error === 'Connexion refusée' &&
            <div className="fr-alert fr-alert--error fr-mt-1w fr-mb-4w">
              <h3 className="fr-alert__title">Erreur : Le compte avec lequel vous tentez de vous connecter est inconnu.</h3>
              <p className="fr-mb-1v">Merci de vérifier que vous utilisez une adresse mail identique à l&apos;ancien espace.</p>
              <p className="fr-mb-1v">Le tableau de pilotage n&apos;est pas destiné aux Conseillers numérique.</p>
              <p>Si vous rencontrez toujours des problèmes de connexion&nbsp;:</p>
              <ul>
                <li>Nous vous invitons à consulter la <a className="fr-link fr-link--lg"
                  href="https://aide.conseiller-numerique.gouv.fr/fr/article/je-narrive-pas-a-me-connecter-au-tableau-de-pilotage-comment-y-acceder-1fwci8l/">
                  &nbsp;FAQ</a></li>
                <li>A contacter le <a className="fr-link fr-link--lg"
                  href="mailto:conseiller-numerique@anct.gouv.fr">support</a> si vous n&apos;y trouvez pas votre réponse.</li>
              </ul>
            </div>
        }
        <Spinner loading={isLoading === true} />
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
