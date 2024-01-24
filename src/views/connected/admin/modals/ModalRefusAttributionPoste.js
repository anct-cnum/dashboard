import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { structureActions } from '../../../../actions';

function ModalRefusAttributionPoste({ setOpenModal, structure }) {
  const dispatch = useDispatch();
  const confirmationAttributionPoste = () => {
    dispatch(structureActions.confirmationRefusAvisAdmin(structure?._id));
    setOpenModal(false);
  };

  return (
    <dialog aria-labelledby="modal-title-refus-attribution-poste" id="modal-refus-attribution-poste" className="fr-modal modalOpened" role="dialog" >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button
                  className="fr-btn--close fr-btn"
                  title="Fermer la fen&ecirc;tre modale"
                  aria-controls="modal-refus-attribution-poste"
                  onClick={() => setOpenModal(false)}
                >
                  Fermer
                </button>
              </div>
              <div className="fr-modal__content">
                <h1 id="modal-title-refus-attribution-poste" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg"></span>
                  <span className="title-modal-confirmation-poste">Refuser l&rsquo;attribution</span>
                </h1>
                <p>
                  Souhaitez-vous refuser l&rsquo;attribution d&rsquo;un poste
                  &agrave; la structure&nbsp;<strong>{structure?.nom}</strong>&nbsp;?
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
                    <button
                      onClick={confirmationAttributionPoste}
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

ModalRefusAttributionPoste.propTypes = {
  setOpenModal: PropTypes.func,
  structure: PropTypes.object,
};

export default ModalRefusAttributionPoste;
