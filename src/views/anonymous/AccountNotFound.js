import React from 'react';

const AccountNotFound = () => {
  return (
    <div className="fr-alert fr-alert--error fr-mt-1w fr-mb-4w">
      <h2 className="fr-alert__title">Erreur : Le compte avec lequel vous tentez de vous connecter est inconnu.</h2>
      <p className="fr-mb-1v">Merci de vérifier que vous utilisez la même adresse mail
        que votre ancien compte&nbsp;: structure / préfet / coordinateur / grand réseau / admin.</p>
      <p>Si malgré cela vous rencontrez toujours des difficultés pour vous connecter nous vous invitons à&nbsp;:</p>
      <ul>
        <li>Consulter la <a className="fr-link fr-link--lg"
          href="https://aide.conseiller-numerique.gouv.fr/fr/article/je-narrive-pas-a-me-connecter-au-tableau-de-pilotage-comment-y-acceder-1fwci8l/">
          &nbsp;FAQ</a></li>
        <li>Contacter le <a className="fr-link fr-link--lg"
          href="mailto:conseiller-numerique@anct.gouv.fr">support</a> si vous n&apos;y trouvez pas votre réponse.</li>
      </ul>
      <p>Le tableau de pilotage n&apos;est pas destiné aux Conseillers numérique
        mais seulement aux gestionnaires de structures accueillantes.</p>
    </div>
  );
};

export default AccountNotFound;
