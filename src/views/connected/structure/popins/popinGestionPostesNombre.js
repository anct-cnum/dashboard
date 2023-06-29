import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useAdvisors } from '../hooks/useAdvisors';

function popinGestionPostesNombre({ setNombreDePostes, nombreDePostes, actionType, setStep }) {

  const {
    conseillersActifs,
    conseillersARenouveler,
    conseillersEnCoursDeRecrutement,
  } = useAdvisors();

  const structure = useSelector(state => state.structure?.structure);
  const nbConseillerActifTotal = conseillersActifs.length + conseillersARenouveler.length + conseillersEnCoursDeRecrutement.length;
  const nombreDePostesLibres = structure?.posteValiderCoselec - nbConseillerActifTotal;
  const isErreurNombreDePostes = nombreDePostesLibres < nombreDePostes;
  const disable = () => actionType === 'add' ? !nombreDePostes : isErreurNombreDePostes;
  
  const handleCancel = () => {
    setStep(0);
    setNombreDePostes(1);
  };

  return (
    <dialog aria-labelledby="fr-modal-2-title" id="fr-modal-2" className="fr-modal modalOpened" role="dialog">
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
              <div className="fr-modal__content">
                <h1 id="fr-modal-2-title" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                  {actionType === 'add' ? 'Ajouter' : 'Rendre'} un/des postes
                </h1>
                <p>
                  {
                    actionType === 'add' ?
                      <>Veuillez indiquer le nombre de postes suppl&eacute;mentaires que vous souhaitez pour votre conventionnement en cours</> :
                      <>Veuillez indiquer le nombre de postes que vous souhaitez rendre dans vos postes vacants</>
                  }
                </p>
                <div className={`fr-input-group ${disable() && actionType !== 'add' ? 'fr-input-group--error' : ''} fr-col-12 fr-mt-2w`}>
                  <label className="fr-label" htmlFor="text-input">Nombre de postes</label>
                  <input
                    id="text-input"
                    className={`fr-input ${disable() && actionType !== 'add' ? 'fr-input--error' : ''} `}
                    type="number"
                    name="nombreDePostes"
                    min={1}
                    onChange={e => setNombreDePostes(Number(e.target.value))}
                    value={nombreDePostes}
                  />
                  {
                    disable() && actionType !== 'add' &&
                   <p id="text-input-error-desc-error" className="fr-error-text">
                     Le nombre de postes que vous souhaitez rendre doit &ecirc;tre inf&eacute;rieur ou
                     &eacute;gal au nombre de postes inutilis&eacute;s par votre structure.
                   </p>
                  }
                </div>
              </div>
              <div className="fr-modal__footer">
                <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg">
                  <li>
                    <button onClick={handleCancel} className="fr-btn" title="Annuler la demande d'ajout de poste(s)">
                      Annuler
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setStep(2);
                      }}
                      disabled={disable()}
                      className="fr-btn fr-btn--icon-left"
                      title="Confirmer la demande d'ajout de poste(s)"
                    >
                     Continuer
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

popinGestionPostesNombre.propTypes = {
  setNombreDePostes: PropTypes.func,
  setStep: PropTypes.func,
  nombreDePostes: PropTypes.number,
  actionType: PropTypes.string,
};

export default popinGestionPostesNombre;
