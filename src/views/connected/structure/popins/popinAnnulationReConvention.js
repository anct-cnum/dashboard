import React from 'react';
import PropTypes from 'prop-types';

function popinAnnulationReConvention({ setOpenModal, handleCancel, motif, setMotif }) {
  const radioValues = [
    {
      id: 'radio-1',
      value: `Le besoin n'est pas ou plus justifié`,
      label: `Le besoin n'est pas ou plus justifié`,
    },
    {
      id: 'radio-2',
      value: 'Ma structure rencontre des difficultés de recrutement',
      label: 'Ma structure rencontre des difficultés de recrutement',
    },
    {
      id: 'radio-3',
      value: `Ma structure n'a pas ou plus les capacités financières nécessaires`,
      label: `Ma structure n'a pas ou plus les capacités financières nécessaires`,
    },
    {
      id: 'radio-4',
      value: `Je ne sais pas encore si je souhaite me reconventionner car je manque de visibilité sur les prochains mois`,
      label: `Je ne sais pas encore si je souhaite me reconventionner car je manque de visibilité sur les prochains mois`,
    },
  ];

  return (
    <dialog aria-labelledby="fr-modal-2-title" id="fr-modal-2" className="fr-modal modalOpened" role="dialog" >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button className="fr-link--close fr-link" aria-controls="fr-modal-2" onClick={() => setOpenModal(false)}>Fermer</button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-2-title" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg"></span>
                  Vous ne souhaitez pas renouveler votre conventionnement&nbsp;?
                </h1>
                {radioValues.map(radio => (
                  <div className="fr-radio-group" key={radio.id}>
                    <input
                      type="radio"
                      id={radio.id}
                      name="motif"
                      value={radio.value}
                      checked={motif === radio.value}
                      onChange={() => setMotif(radio.value)}
                    />
                    <label className="fr-label" htmlFor={radio.id}>
                      {radio.label}
                    </label>
                  </div>
                ))}
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
                        setOpenModal(false);
                        handleCancel();
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

popinAnnulationReConvention.propTypes = {
  updateStatut: PropTypes.func,
  updateDateRecrutement: PropTypes.func,
  setDateValidee: PropTypes.func,
  setOpenModal: PropTypes.func,
};

export default popinAnnulationReConvention;
