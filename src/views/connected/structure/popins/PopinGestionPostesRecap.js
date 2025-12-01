import React from 'react';
import PropTypes from 'prop-types';
import { pluralize } from '../../../../utils/formatagesUtils';
import { structureActions } from '../../../../actions';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function PopinGestionPostesRecap({
  setStep, autreMotif,
  nombreDePostes, actionType, motif,
  setAutreMotif, setNombreDePostes, setMotif,
  estPosteCoordinateur
}) {

  const dispatch = useDispatch();
  const structureId = useSelector(state => state.structure?.structure?._id);
  const navigate = useNavigate();

  const handleCancel = () => {
    setStep(0);
    setMotif(null);
    setAutreMotif(null);
    setNombreDePostes(1);
  };

  const handleSubmit = () => {
    if (actionType === 'add') {
      dispatch(structureActions.createAvenant('ajout', structureId, nombreDePostes, motif, autreMotif));
    } else {
      dispatch(structureActions.createAvenant('retrait', structureId, nombreDePostes, motif, autreMotif, estPosteCoordinateur));
    }
    if (!window.location.pathname.includes('/structure/postes')) {
      navigate('/structure/postes');
    }
    handleCancel();
  };

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
                  onClick={handleCancel}
                >
                  Fermer
                </button>
              </div>
              <div className="fr-modal__content fr-mb-2w">
                <h1 id="fr-modal-2-title" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                  R&eacute;capitulatif de votre demande
                </h1>
                {actionType === 'add' ? <p>
                  Vous allez faire une demande pour&nbsp;
                  <span className="fr-text fr-text--bold">
                    {nombreDePostes}{' '}
                    {pluralize(
                      'poste subventionné',
                      'poste subventionné',
                      'postes subventionnés',
                      nombreDePostes
                    )}.
                  </span>
                </p> :
                  <p>
                    Vous souhaitez rendre&nbsp;
                    <span className="fr-text fr-text--bold">
                      {nombreDePostes}{' '}
                      {pluralize(
                        `poste${estPosteCoordinateur && ' coordinateur'} vacant`,
                        `poste${estPosteCoordinateur && ' coordinateur'} vacant`,
                        `postes${estPosteCoordinateur && ' coordinateurs'} vacants`,
                        nombreDePostes
                      )}.
                    </span>
                  </p>
                }
                <strong>Motif:</strong>
                <p style={{ marginBottom: '50px' }}>{motif || autreMotif}</p>
              </div>
              <div className="fr-modal__footer">
                <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg">
                  <li>
                    <button onClick={
                      () => {
                        setStep(1);
                      }
                    } className="fr-btn fr-btn--secondary">
                      Modifier ma demande
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleSubmit}
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

PopinGestionPostesRecap.propTypes = {
  setStep: PropTypes.func.isRequired,
  autreMotif: PropTypes.string,
  nombreDePostes: PropTypes.number.isRequired,
  actionType: PropTypes.string.isRequired,
  motif: PropTypes.string,
  setAutreMotif: PropTypes.func.isRequired,
  setNombreDePostes: PropTypes.func.isRequired,
  setMotif: PropTypes.func.isRequired,
  estPosteCoordinateur: PropTypes.bool,
};

export default PopinGestionPostesRecap;
