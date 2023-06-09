import React from 'react';
import PropTypes from 'prop-types';

function popinGestionPostesMotif({ setStep, setMotif, motif, actionType, autreMotif, setAutreMotif, setNombreDePostes }) {

 
  const handleCancel = () => {
    setStep(0);
    setMotif(null);
    setAutreMotif(null);
    setNombreDePostes(null);
  };

  const rendreMotifs = [
    'Le besoin n\'est pas ou plus justifié',
    'Ma structure rencontre des difficultés de recrutement',
    'Ma structure n\'a pas ou plus les capacités financières nécessaires',
    'Je ne sais pas encore si je souhaite me reconventionner car je manque de visibilité sur les prochains mois',
  ];

  const ajouterMotifs = [
    'Ma structure souhaite renforcer l\'équipe',
    'Je souhaite développer l\'offre de service CnFS',
    'Je rencontre une forte demande sur mon territoire'
  ];

  const motifs = actionType === 'add' ? ajouterMotifs : rendreMotifs;

  const handleMotifChange = e => {
    setMotif(e.target.value);
    setAutreMotif('');
  };

  const handleAutreMotifChange = e => {
    setAutreMotif(e.target.value);
    setMotif('');
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
                  Pourquoi souhaitez-vous {actionType === 'add' ? 'ajouter' : 'rendre'} un ou des postes ?
                </h1>
                <p>Veuillez indiquer les raisons de votre choix de rendre ce ou ces postes de Conseillers numériques France Services :</p>
                <div className="fr-form-group">
                  <fieldset className="fr-fieldset">
                    <div className="fr-fieldset__content">
                      {motifs.map(motifItem => (
                        <div className="fr-radio-group fr-radio-group--sm" key={motifItem}>
                          <input
                            type="radio"
                            id={motifItem}
                            name="motif"
                            value={motifItem}
                            checked={motif === motifItem}
                            onChange={handleMotifChange}
                          />
                          <label className="fr-label" htmlFor={motifItem}>
                            {motifItem}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
                {actionType === 'add' && <div className="fr-input-group fr-col-12 fr-mt-2w">
                  <label className="fr-label" htmlFor="textarea">Autre raison :</label>
                  <textarea
                    className="fr-input"
                    type="text"
                    name="autreMotif"
                    onChange={handleAutreMotifChange}
                    value={autreMotif}
                    maxLength={200}
                  >
                  </textarea>
                </div>}
              </div>
              <div className="fr-modal__footer">
                <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg">
                  <li>
                    <button onClick={handleCancel} className="fr-btn" title="Notifier la rupture de contrat">
                      Annuler
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setStep(3);
                      }}
                      disabled={!motif && !autreMotif}
                      className="fr-btn fr-btn--icon-left"
                      title="Notifier la rupture de contrat"
                    >
                     continuer
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

popinGestionPostesMotif.propTypes = {
  updateContrat: PropTypes.func,
  updateDateRecrutement: PropTypes.func,
  setDateValidee: PropTypes.func,
  setOpenModalContrat: PropTypes.func,
  setStep: PropTypes.func,
  setMotif: PropTypes.func,
  motif: PropTypes.string,
  actionType: PropTypes.string,
  autreMotif: PropTypes.string,
  setAutreMotif: PropTypes.func,
  setNombreDePostes: PropTypes.func,
};

export default popinGestionPostesMotif;
