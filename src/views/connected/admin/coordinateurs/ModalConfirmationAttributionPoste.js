import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { coordinateurActions } from '../../../../actions';

function ModalConfirmationAttributionPoste({ setOpenModal, structure, typeAttribution }) {
  const dispatch = useDispatch();

  const confirmationAttributionPoste = () => {
    if (typeAttribution === 'refuser') {
      dispatch(coordinateurActions.confirmationRefusAvisAdmin(structure?._id, structure?.demandesCoordinateur[0]?.id));
      setOpenModal(false);
      return;
    }
    setOpenModal(false);
  };
  return (
    <dialog aria-labelledby="fr-modal-2-title" id="fr-modal-2" className="fr-modal modalOpened" role="dialog" >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button className="fr-btn--close fr-btn" title="Fermer la fen&ecirc;tre modale" aria-controls="fr-modal-2" onClick={() => setOpenModal(false)}>
                  Fermer
                </button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-2-title" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg"></span>
                  {typeAttribution} l&rsquo;attribution
                </h1>
                <p>
                  Souhaitez-vous {typeAttribution} l&rsquo;attribution d&rsquo;un poste de coordinateur
                  à la structure&nbsp;<strong>{structure?.nom}</strong>&nbsp;?
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

ModalConfirmationAttributionPoste.propTypes = {
  setOpenModal: PropTypes.func,
  structure: PropTypes.object,
  typeAttribution: PropTypes.string,
};

export default ModalConfirmationAttributionPoste;
