import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../../src/actions';

function FormSuppressionGestionnaire({ setConfirmSuppressionGestionnaire, idGestionnaire, roles }) {
  const dispatch = useDispatch();

  const annulerSuppressionGestionnaire = () => {
    setConfirmSuppressionGestionnaire(false);
  };

  const suppressionGestionnaire = () => {
    if (roles.length > 1) {
      dispatch(userActions.validationSuppressionCompteStructure(idGestionnaire, 'structure'));
    } else {
      dispatch(userActions.validationSuppressionCompteStructure(idGestionnaire));
    }
    setConfirmSuppressionGestionnaire(false);
  };

  return (
    <dialog aria-labelledby="fr-modal-2-title" id="fr-modal-2" className="fr-modal modalOpened" role="dialog">
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button className="fr-btn--close fr-btn" aria-controls="fr-modal-2" onClick={annulerSuppressionGestionnaire}>Fermer</button>
              </div>
              <div className="fr-modal__content">
                {roles.length > 1 ?
                  <>
                    <h1 id="fr-modal-2-title" className="fr-modal__title">
                      <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                      Supprimer le r&ocirc;le structure de ce gestionnaire d&eacute;finitivement
                    </h1>
                    <p>&Ecirc;tes-vous certain(e) de vouloir supprimer le r&ocirc;le structure de ce gestionnaire ?</p>
                    <p><strong>Cette action r&eacute;voquera les acc&egrave;s li&eacute; &agrave; ce r&ocirc;le sur le tableau de bord.</strong></p>
                  </> :
                  <>
                    <h1 id="fr-modal-2-title" className="fr-modal__title">
                      <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                      Supprimer le gestionnaire d&eacute;finitivement
                    </h1>
                    <p>&Ecirc;tes-vous certain(e) de vouloir supprimer ce gestionnaire ?</p>
                    <p><strong>Cette action supprimera d&eacute;finitivement toutes ses donn&eacute;es.</strong></p>
                  </>
                }
              </div>
              <div className="fr-modal__footer">
                <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg">
                  <li>
                    <button onClick={suppressionGestionnaire} className="fr-btn">
                      Oui, Supprimer d&eacute;finitivement
                    </button>
                  </li>
                  <li>
                    <button className="fr-btn fr-btn--secondary" onClick={annulerSuppressionGestionnaire}>
                      Annuler
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

FormSuppressionGestionnaire.propTypes = {
  setConfirmSuppressionGestionnaire: PropTypes.func,
  idGestionnaire: PropTypes.string,
  roles: PropTypes.array,
};

export default FormSuppressionGestionnaire;
