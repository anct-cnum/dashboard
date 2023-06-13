import React from 'react';
import PropTypes from 'prop-types';

function popinGestionPostesNombre({ setNombreDePostes, nombreDePostes, actionType, setStep }) {

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
                <div className="fr-input-group fr-col-12 fr-mt-2w">
                  <label className="fr-label">Nombre de postes</label>
                  <input
                    className="fr-input"
                    type="number"
                    name="nombreDePostes"
                    min={1}
                    onChange={e => setNombreDePostes(Number(e.target.value))}
                    value={nombreDePostes}
                  />
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
                      disabled={!nombreDePostes}
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
