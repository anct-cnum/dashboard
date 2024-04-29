import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { conventionActions } from '../../../../actions';
import { StatutCoselec } from '../../../../utils/enumUtils';

function ModalRefusAvenantAjoutPoste({ idStructure, setOpenModal, nomStructure, idPGStructure }) {
  const dispatch = useDispatch();
  const refusAvenantAjoutPoste = () => {
    dispatch(conventionActions.updateAvenantAjoutPoste(idStructure, StatutCoselec.NÉGATIF));
    setOpenModal(false);
  };

  return (
    <dialog aria-labelledby="fr-modal-2-title" id="fr-modal-2" className="fr-modal modalOpened" role="dialog" >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button className="fr-btn--close fr-btn" aria-controls="fr-modal-2" onClick={() => setOpenModal(false)}>Fermer</button>
              </div>
              <div className="fr-modal__content fr-grid-row fr-grid-row--center fr-mb-3w">
                <h1 id="fr-modal-2-title" className="fr-modal__title">
                  Refuser l&rsquo;attribution
                </h1>
                <p style={{ textAlign: 'center' }}>
                  Souhaitez-vous refuser l&rsquo;attribution de poste &agrave; la structure&nbsp;{idPGStructure} - {nomStructure}
                </p>
              </div>
              <div className="fr-modal__footer">
                <ul className="fr-btns-group fr-btns-group--center fr-btns-group--inline-lg">
                  <li>
                    <button onClick={() => setOpenModal(false)} className="fr-btn fr-btn--secondary">
                      Annuler
                    </button>
                  </li>
                  <li>
                    <button onClick={refusAvenantAjoutPoste} className="fr-btn">
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

ModalRefusAvenantAjoutPoste.propTypes = {
  idStructure: PropTypes.string,
  idPGStructure: PropTypes.string,
  nomStructure: PropTypes.string,
  setOpenModal: PropTypes.func,
};

export default ModalRefusAvenantAjoutPoste;
