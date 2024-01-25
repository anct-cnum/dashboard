import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { structureActions } from '../../../../actions';

function ModalValidationAttributionPoste({ setOpenModal, structure }) {
  const dispatch = useDispatch();
  const [nombreConseillersCoselec, setNombreConseillersCoselec] = useState(structure?.nombreConseillersSouhaites || 1);

  const confirmationAttributionPoste = () => {
    if (!Number.isNaN(nombreConseillersCoselec) && nombreConseillersCoselec > 0) {
      dispatch(structureActions.confirmationValidAvisAdmin(structure?._id, nombreConseillersCoselec));
    }
    setOpenModal(false);
  };

  return (
    <dialog aria-labelledby="modal-title-validation-attribution-poste" id="modal-validation-attribution-poste" className="fr-modal modalOpened" role="dialog" >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button
                  className="fr-btn--close fr-btn"
                  title="Fermer la fen&ecirc;tre modale"
                  aria-controls="modal-validation-attribution-poste"
                  onClick={() => setOpenModal(false)}
                >
                  Fermer
                </button>
              </div>
              <div className="fr-modal__content">
                <h1 id="modal-validation-title-attribution-poste" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg"></span>
                  <span className="title-modal-confirmation-poste">Confirmer l&rsquo;attribution</span>
                </h1>
                <p>Veuillez renseigner le nombre de postes attribu&eacute;s &agrave; la structure <strong>{structure?.nom}</strong></p>
                <input
                  className="fr-input"
                  type="number"
                  min="1"
                  max={structure?.nombreConseillersSouhaites || undefined}
                  onChange={e => setNombreConseillersCoselec(e.target.value)}
                  value={nombreConseillersCoselec}
                  id="input-nombre-conseillers-coselec"
                  name="input-nombre-conseillers-coselec"
                />
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

ModalValidationAttributionPoste.propTypes = {
  setOpenModal: PropTypes.func,
  structure: PropTypes.object,
};

export default ModalValidationAttributionPoste;
