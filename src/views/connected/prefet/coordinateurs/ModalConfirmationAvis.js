import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { coordinateurActions } from '../../../../actions';

function ModalConfirmationAvis({ setOpenModal, structure, avisPrefet }) {
  const dispatch = useDispatch();
  const confirmationAvisPrefet = () => {
    dispatch(coordinateurActions.confirmationAvisPrefet(structure?._id, avisPrefet));
    setOpenModal(false);
  };
  return (
    <dialog aria-labelledby="fr-modal-2-title" id="fr-modal-2" className="fr-modal modalOpened" role="dialog" >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button className="fr-btn--close fr-btn" title="Fermer la fenêtre modale" aria-controls="fr-modal-2" onClick={() => setOpenModal(false)}>
                  Fermer
                </button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-2-title" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg"></span>
                  Confirmer l&rsquo;avis
                </h1>
                <p>Souhaitez-vous confirmer l&rsquo;avis {avisPrefet} pour la structure <strong>{structure?.nom}</strong> ?</p>
                <div className="fr-input-group">
                  <label className="fr-label" htmlFor="input-usual-name-1664">
                    Commentaire (obligatoire, max 250 caractères) :
                  </label>
                  <textarea style={{ height: '6rem' }} className="fr-input" type="text" placeholder="Commentaire" />
                </div>
              </div>
              <div className="fr-modal__footer">
                <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg">
                  <li>
                    <button onClick={() => setOpenModal(false)} className="fr-btn fr-btn--secondary">
                      Annuler
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={confirmationAvisPrefet}
                      className="fr-btn"
                    >
                      Confirmer
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

ModalConfirmationAvis.propTypes = {
  setOpenModal: PropTypes.func,
  structure: PropTypes.object,
  avisPrefet: PropTypes.string,
};

export default ModalConfirmationAvis;
