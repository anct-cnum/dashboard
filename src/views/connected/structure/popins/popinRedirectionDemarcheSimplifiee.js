import React from 'react';
import PropTypes from 'prop-types';

function popinRedirectionDemarcheSimplifiee({ setOpenModalRedirection, lienDossier }) {

  return (
    <dialog aria-labelledby="fr-modal-2-title" id="fr-modal-2" className="fr-modal modalOpened" role="dialog" >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button className="fr-btn--close fr-btn" aria-controls="fr-modal-2" onClick={() => setOpenModalRedirection(false)}>Fermer</button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-2-title" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                  Important
                </h1>
                <p>
                  <strong>
                    Pour &ecirc;tre redirig&eacute; vers votre dossier de reconventionnement, vous devez pr&eacute;alablement
                    vous identifier sur D&eacute;marches Simplifi&eacute;es
                  </strong>
                </p>
              </div>
              <div className="fr-modal__footer">
                <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg">
                  <li>
                    <button onClick={() => setOpenModalRedirection(false)} className="fr-btn fr-btn--secondary">
                      Annuler
                    </button>
                  </li>
                  <li>
                    <a
                      href={lienDossier}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="fr-btn card__button"
                    >
                      Aller vers D&eacute;marches Simplifi&eacute;es
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

popinRedirectionDemarcheSimplifiee.propTypes = {
  setOpenModalRedirection: PropTypes.func,
  lienDossier: PropTypes.string,
};

export default popinRedirectionDemarcheSimplifiee;
