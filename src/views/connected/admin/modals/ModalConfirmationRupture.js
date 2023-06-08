import React from 'react';
import PropTypes from 'prop-types';
import { conseillerActions } from '../../../../actions';
import { useDispatch } from 'react-redux';

function ModalConfirmationRupture({ setOpenModalValidationRupture, idConseiller, dateFinDeContrat }) {
  const dispatch = useDispatch();

  const validationRupture = () => {
    dispatch(conseillerActions.validationRupture(idConseiller, dateFinDeContrat));
    setOpenModalValidationRupture(false);
  };

  return (
    <dialog aria-labelledby="fr-modal-2-title" id="fr-modal-2" className="fr-modal modalOpened" role="dialog" >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button className="fr-btn--close fr-btn" aria-controls="fr-modal-2" onClick={() => setOpenModalValidationRupture(false)}>Fermer</button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-2-title" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                  &Ecirc;tes-vous s&ucirc;r de vouloir valider la rupture de ce conseiller ?
                </h1>
                <p>
                  Cette action entra&icirc;nera la rupture du conseiller avec sa structure. Ce qui aura pour
                  cons&eacute;quence de supprimer son adresse mail professionelle, son compte mattermost
                  ainsi que l&lsquo;acc&egrave;s &agrave; l&lsquo;espace coop.
                </p>
              </div>
              <div className="fr-modal__footer">
                <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg">
                  <li>
                    <button onClick={() => setOpenModalValidationRupture(false)} className="fr-btn fr-btn--secondary">
                      Annuler
                    </button>
                  </li>
                  <li>
                    <button onClick={validationRupture} className="fr-btn">
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

ModalConfirmationRupture.propTypes = {
  setOpenModalValidationRupture: PropTypes.func,
  idConseiller: PropTypes.string,
  dateFinDeContrat: PropTypes.instanceOf(Date)
};

export default ModalConfirmationRupture;
