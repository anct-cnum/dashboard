import React from 'react';
import PropTypes from 'prop-types';

function popinConfirmationAnnulation({ updateStatut, updateDateRecrutement, setDateValidee, toggleModal }) {

  return (
    <dialog aria-labelledby="fr-modal-title-modal-1" role="dialog" id="fr-modal-annuler"
      className="fr-modal">
      <div className="fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-6">
            <div className="fr-modal__body centrerTexte">
              <div className="fr-modal__header">
                <button id="modal-annuler-close" className="fr-link--close fr-link" title="Fermer la fenêtre modale"
                  aria-controls="fr-modal-1" target="_self" onClick={() => {
                    toggleModal(false);
                  }}>
                  Fermer
                </button>
              </div>
              <div className="fr-modal__content important">
                <p>
                  <strong>
                    Important&nbsp;: Vous êtes sur le point d&rsquo;annuler votre demande de recrutement pour ce candidat.
                  </strong>
                </p>
                <p>
                  <strong>
                    Êtes-vous sûr de vouloir réaliser cette action ?
                  </strong>
                </p>
                <button onClick={() => {
                  updateStatut('interessee');
                  updateDateRecrutement(null);
                  setDateValidee(null);
                  toggleModal(false);
                }}
                className="fr-btn fr-btn--secondary fr-fi-close-circle-line fr-btn--icon-left"
                title="Annuler le recrutement">
                Je valide l&rsquo;annulation du recrutement
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

popinConfirmationAnnulation.propTypes = {
  updateStatut: PropTypes.func,
  updateDateRecrutement: PropTypes.func,
  setDateValidee: PropTypes.func,
  toggleModal: PropTypes.func,
};

export default popinConfirmationAnnulation;
