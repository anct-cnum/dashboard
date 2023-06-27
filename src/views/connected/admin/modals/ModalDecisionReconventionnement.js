import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { reconventionnementActions } from '../../../../actions';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { StatutConventionnement } from '../../../../utils/enumUtils';

function ModalDecisionReconventionnement({ setOpenModal, idStructure, statutReconventionnement }) {
  const dispatch = useDispatch();
  const wordingTitle = StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ === statutReconventionnement ?
    'valider' : 'refuser';

  const decisionReconventionnement = statut => {
    dispatch(reconventionnementActions.decisionReconventionnement(idStructure, statut));
    setOpenModal(false);
    scrollTopWindow();
  };

  return (
    <dialog aria-labelledby="fr-modal-3-title" id="fr-modal-3" className="fr-modal modalOpened" role="dialog" >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button className="fr-btn--close fr-btn" aria-controls="fr-modal-3" onClick={() => setOpenModal(false)}>Fermer</button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-3-title" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                  Important&nbsp;: Vous &ecirc;tes sur le point de {wordingTitle} la demande de reconventionnement.
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
                    <button onClick={() => setOpenModal(false)} className="fr-btn fr-btn--secondary">
                      Annuler
                    </button>
                  </li>
                  <li>
                    <button className="fr-btn" onClick={() => decisionReconventionnement(statutReconventionnement)}>
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

ModalDecisionReconventionnement.propTypes = {
  setOpenModal: PropTypes.func,
  idStructure: PropTypes.string,
  statutReconventionnement: PropTypes.string,
};

export default ModalDecisionReconventionnement;
