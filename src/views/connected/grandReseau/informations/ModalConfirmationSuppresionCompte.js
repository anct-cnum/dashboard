import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../../actions';

function ModalConfirmationSuppressionCompte({ setDisplayModalDelete, user }) {
  const dispatch = useDispatch();

  const validationSuppressionCompte = () => {
    dispatch(userActions.validationSuppressionCompte(user._id));
    setDisplayModalDelete(false);
  };

  return (
    <dialog aria-labelledby="fr-modal-2-title" id="fr-modal-2" className="fr-modal modalOpened" role="dialog" >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button className="fr-btn--close fr-btn" aria-controls="fr-modal-2" onClick={() => setDisplayModalDelete(false)}>Fermer</button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-2-title" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                  &Ecirc;tes-vous s&ucirc;r de vouloir supprimer le compte ?
                </h1>
                <p>
                    Cette action entra&icirc;nera la suppression du compte administrateur <strong>{user.email}</strong>
                </p>
              </div>
              <div className="fr-modal__footer">
                <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg">
                  <li>
                    <button onClick={() => setDisplayModalDelete(false)} className="fr-btn fr-btn--secondary">
                        Annuler
                    </button>
                  </li>
                  <li>
                    <button onClick={validationSuppressionCompte} className="fr-btn">
                        Valider
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

ModalConfirmationSuppressionCompte.propTypes = {
  setDisplayModalDelete: PropTypes.func,
  user: PropTypes.object,
};

export default ModalConfirmationSuppressionCompte;
