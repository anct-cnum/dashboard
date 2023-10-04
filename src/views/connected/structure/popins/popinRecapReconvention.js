import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function PopinRecapReconvention({ setOpenModal, handleSend }) {
  const navigate = useNavigate();

  return (
    <dialog
      aria-labelledby="fr-modal-2-title"
      id="fr-modal-2"
      className="fr-modal modalOpened"
      role="dialog"
    >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button
                  className="fr-btn--close fr-btn"
                  aria-controls="fr-modal-2"
                  onClick={() => setOpenModal(false)}
                >
                  Fermer
                </button>
              </div>
              <div className="fr-modal__content fr-mb-6w">
                <h1 id="fr-modal-2-title" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                  Confirmez votre demande de reconventionnement
                </h1>
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
                      onClick={() => {
                        handleSend();
                        setOpenModal(false);
                        navigate('/structure/postes');
                      }}
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

PopinRecapReconvention.propTypes = {
  setOpenModal: PropTypes.func,
  handleSend: PropTypes.func,
  structure: PropTypes.object,
  calcNombreDePostes: PropTypes.func,
};

export default PopinRecapReconvention;
