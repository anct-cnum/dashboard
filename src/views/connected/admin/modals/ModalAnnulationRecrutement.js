import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { contratActions } from '../../../../actions';

function ModalAnnulationRecrutement({ setOpenModalAnnulation, idMiseEnRelation }) {
  const dispatch = useDispatch();
  const annulationRecrutement = () => {
    dispatch(contratActions.annulationRecrutement(idMiseEnRelation, true));
    setOpenModalAnnulation(false);
  };

  return (
    <dialog aria-labelledby="fr-modal-ccl-recruitment-title" id="fr-modal-ccl-recruitment" className="fr-modal modalOpened" role="dialog" >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button className="fr-btn--close fr-btn" aria-controls="fr-modal-ccl-recruitment" onClick={() => setOpenModalAnnulation(false)}>Fermer</button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-ccl-recruitment-title" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                  Important&nbsp;: Vous &ecirc;tes sur le point d&rsquo;annuler la demande de recrutement pour ce candidat.
                </h1>
                <p>
                  <strong>
                    &Ecirc;tes-vous s&ucirc;r de vouloir r&eacute;aliser cette action&nbsp;?
                  </strong>
                </p>
              </div>
              <div className="fr-modal__footer">
                <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg">
                  <li>
                    <button onClick={() => setOpenModalAnnulation(false)} className="fr-btn fr-btn--secondary">
                      Annuler
                    </button>
                  </li>
                  <li>
                    <button className="fr-btn" onClick={annulationRecrutement}>
                      Annuler le recrutement
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

ModalAnnulationRecrutement.propTypes = {
  setOpenModalAnnulation: PropTypes.func,
  idMiseEnRelation: PropTypes.string,
};

export default ModalAnnulationRecrutement;
