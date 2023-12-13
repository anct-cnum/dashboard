import React from 'react';
import PropTypes from 'prop-types';

function PopinConfirmationAnnulation({ setOpenModal, updateStatut }) {

  return (
    <dialog aria-labelledby="fr-modal-2-title" id="fr-modal-2" className="fr-modal modalOpened" role="dialog" >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button className="fr-btn--close fr-btn" aria-controls="fr-modal-2" onClick={() => setOpenModal(false)}>Fermer</button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-2-title" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                  Important&nbsp;: Vous êtes sur le point d&rsquo;annuler votre demande de recrutement pour ce candidat.
                </h1>
                <p>
                  <strong>
                     Êtes-vous sûr de vouloir réaliser cette action ?
                  </strong>
                </p>
              </div>
              <div className="fr-modal__footer">
                <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg">
                  <li>
                    <button onClick={() => setOpenModal(false)} className="fr-btn fr-btn--secondary">
                        Annuler
                    </button>
                  </li>
                  <li>
                    <button onClick={() => {
                      updateStatut('interessee');
                      setOpenModal(false);
                    }} className="fr-btn">
                      Je valide l&rsquo;annulation du recrutement
                    </button>
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

PopinConfirmationAnnulation.propTypes = {
  updateStatut: PropTypes.func,
  setOpenModal: PropTypes.func,
};

export default PopinConfirmationAnnulation;
