import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { pluralize } from '../../../../utils/formatagesUtils';

function PopinRecapReconvention({ setOpenModal, checkedItems, handleSend, nombreDePostes }) {
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
              <div className="fr-modal__content fr-mb-2w">
                <h1 id="fr-modal-2-title" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                  R&eacute;capitulatif de votre demande
                </h1>
                <p>Veuillez confirmez ces informations avant d&rsquo;envoyer votre demande en validation.</p>
                <>
                  <p>
                    Vous allez faire une demande pour{' '}
                    <span className="fr-text fr-text--bold">
                      {nombreDePostes}{' '}
                      {pluralize(
                        'poste subventionné',
                        'poste subventionné',
                        'postes subventionnés',
                        true
                      )},{' '}
                    </span>
                    dont:
                  </p>
                  <ul>
                    <li>
                      <p className="fr-text--bold fr-mb-1w">
                        {checkedItems.filter(item => item.statut === 'finalisee').length}{' '}
                        {pluralize(
                          'poste occupé',
                          'poste occupé',
                          'postes occupés',
                          true
                        )}
                      </p>
                    </li>
                    <li>
                      <p className="fr-text--bold">
                        {nombreDePostes -
                          checkedItems.filter(item => item.statut === 'finalisee').length}{' '}
                        {pluralize(
                          'poste vacant',
                          'poste vacant',
                          'postes vacants',
                          true
                        )}
                      </p>
                    </li>
                  </ul>
                </>
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
  updateStatut: PropTypes.func,
  updateDateRecrutement: PropTypes.func,
  setDateValidee: PropTypes.func,
  setOpenModal: PropTypes.func,
  checkedItems: PropTypes.array,
  handleSend: PropTypes.func,
  nombreDePostes: PropTypes.number,
};

export default PopinRecapReconvention;
