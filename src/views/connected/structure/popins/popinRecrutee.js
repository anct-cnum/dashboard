import React from 'react';
import PropTypes from 'prop-types';

function popinRecrutee({ setDisplayModal }) {
  const demarchesSimplifieesUrl = process.env.REACT_APP_DEMARCHES_SIMPLIFIEES_HOSTNAME;

  return (
    <dialog aria-labelledby="fr-modal-title-modal-1" role="dialog" id="fr-modal-1" className="fr-modal modalOpened">
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button className="fr-btn--close fr-btn"
                  onClick={() => setDisplayModal(false)}
                  title="Fermer la fenêtre modale" aria-controls="fr-modal-1">
                Fermer
                </button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-title-modal-1" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true">
                  </span>Important</h1>
                <p>
                    Vous avez actionné le bouton &laquo;&nbsp;Valider cette candidature&nbsp;&raquo;
                  <br/>
                    Votre choix est donc arrêté sur un ou plusieurs Conseillers numériques France Services.
                    Vous allez donc passer à l&rsquo;étape de conventionnement.
                </p>
                <p>
                  <strong>Merci de bien vouloir :</strong>
                  <br/>
                    Compléter les différents champs indispensables à l&rsquo;étude de votre demande de subvention en cliquant sur le lien correspondant :
                  <br/><br/>
                    NB : Si vous avez validé plusieurs candidatures, merci de ne réaliser qu’une seule demande.
                  <br /><br />
                  <strong>Structures publiques</strong> :&nbsp;
                  <a href={`${demarchesSimplifieesUrl}/commencer/cnfs-sa-structures-publiques`}
                    target="blank">{`${demarchesSimplifieesUrl}/commencer/cnfs-sa-structures-publiques`}</a>
                  <br/>
                  <strong>Entreprises</strong>&nbsp;:&nbsp;
                  <a href={`${demarchesSimplifieesUrl}/commencer/cnfs-sa-entreprises`}
                    target="blank">{`${demarchesSimplifieesUrl}/commencer/cnfs-sa-entreprises`}</a>
                  <br/>
                  <strong>Associations</strong>&nbsp;:&nbsp;
                  <a href={`${demarchesSimplifieesUrl}/commencer/cnfs-associations`}
                    target="blank">{`${demarchesSimplifieesUrl}/commencer/cnfs-associations`}</a>
                </p>
                <p>
                  <strong>Important&nbsp;: l&rsquo;embauche reste conditionnée à la conformité de votre dossier de demande de subvention.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );

}

popinRecrutee.propTypes = {
  setDisplayModal: PropTypes.func
};

export default popinRecrutee;
