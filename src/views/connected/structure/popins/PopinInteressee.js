import React from 'react';
import PropTypes from 'prop-types';

function PopinInteressee({ setDisplayModal }) {

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
                    Lorsque vous aurez conduit le ou les entretien(s) avec le ou les candidat(s) et choisi votre ou vos Conseiller(s) Numérique(s),
                    merci de nous l&rsquo;indiquer en cliquant sur le bouton &laquo;&nbsp;Valider cette candidature&nbsp;&raquo;.
                  <br/><br/>
                    Cette action est indispensable pour la suite de votre demande de subvention.
                    Elle conditionne la réception du lien vous dirigeant vers la plateforme Démarches Simplifiées.
                </p>
                <br/>
                <p>
                 Rappel des étapes
                </p>
                <div>
                  <ul>
                    <li>Inscription sur la plateforme <a href="http://conseiller-numerique.gouv.fr/" target="blank">conseiller-numerique.gouv.fr</a></li>
                    <li>Concertation territoriale</li>
                    <li>&Eacute;tude des candidatures</li>
                    <li>Conduite des entretiens de recrutement <span style={{ color: '#B60000' }}>(Vous êtes ici)</span></li>
                    <li>Demande de subvention</li>
                    <li>Signature du contrat</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );

}

PopinInteressee.propTypes = {
  setDisplayModal: PropTypes.func
};

export default PopinInteressee;
