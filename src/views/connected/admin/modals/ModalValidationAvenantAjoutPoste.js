import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { conventionActions } from '../../../../actions';
import { StatutCoselec } from '../../../../utils/enumUtils';

function ModalValidationAvenantAjoutPoste({ idStructure, demandesCoselec, nombreConseillersCoselec, setOpenModal }) {
  const dispatch = useDispatch();
  const [nombreDePostes, setNombreDePostes] = useState(demandesCoselec.nombreDePostesSouhaites);

  const validationAvenantAjoutPoste = () => {
    dispatch(conventionActions.updateAvenantAjoutPoste(idStructure, StatutCoselec.POSITIF, nombreDePostes, nombreConseillersCoselec));
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
              <div className="fr-modal__content">
                <h1 id="fr-modal-2-title" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                  Validation de l&rsquo;avenant
                </h1>
                <p>Veuillez renseigner le nombre de postes supplémentaires obtenu par la structure</p>
                <input
                  className="fr-input"
                  type="number"
                  max={demandesCoselec.nombreDePostesSouhaites}
                  onChange={e => setNombreDePostes(e.target.value)}
                  value={nombreDePostes}
                  id="text-input-text" name="text-input-text"
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
                    <button disabled={nombreDePostes < 1} onClick={validationAvenantAjoutPoste} className="fr-btn">
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

ModalValidationAvenantAjoutPoste.propTypes = {
  idStructure: PropTypes.string,
  demandesCoselec: PropTypes.object,
  nombreConseillersCoselec: PropTypes.number,
  setOpenModal: PropTypes.func,
};

export default ModalValidationAvenantAjoutPoste;
