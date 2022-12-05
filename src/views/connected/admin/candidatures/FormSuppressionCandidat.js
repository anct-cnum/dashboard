import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions } from '../../../../actions';

function FormSuppressionCandidat({ setConfirmSuppressionCandidat }) {
  const dispatch = useDispatch();
  const conseiller = useSelector(state => state.conseiller?.conseiller);

  const [motif, setMotif] = useState('');
  const [autreMotif, setAutreMotif] = useState(false);
  const [confirmEmailCandidat, setConfirmEmailCandidat] = useState('');

  const annulerSuppressionCandidat = () => {
    setConfirmSuppressionCandidat(false);
    setMotif('');
    setConfirmEmailCandidat('');
  };

  const suppressionCandidat = () => {
    dispatch(conseillerActions.suppressionCandidat({ id: conseiller?._id, motif }));
    setConfirmSuppressionCandidat(false);
  };

  return (
    <dialog aria-labelledby="fr-modal-2-title" id="fr-modal-2" className="fr-modal modalOpened" role="dialog" >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button className="fr-btn--close fr-btn" aria-controls="fr-modal-2" onClick={annulerSuppressionCandidat}>Fermer</button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-2-title" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                                    Supprimer la candidature définitivement
                </h1>
                <p>&Ecirc;tes-vous certain(e) de vouloir supprimer ce candidat ?</p>
                <p><strong>Cette action supprimera définitivement toutes ses données.</strong></p>
                <div className={confirmEmailCandidat === conseiller?.email ? 'fr-input-group--valid' : 'fr-input-group--error'}>
                  <label className="fr-label" htmlFor="text-input-error">
                    Confirmez l&apos;adresse e-mail en le saisissant ici
                  </label>
                  <input
                    className={confirmEmailCandidat === conseiller?.email ? 'fr-input fr-input--valid' : 'fr-input fr-input--error'}
                    aria-describedby={confirmEmailCandidat === conseiller?.email ? 'text-input-valid-desc-valid' : 'text-input-error-desc-error'}
                    type="text"
                    id={confirmEmailCandidat === conseiller?.email ? 'text-input-valid' : 'text-input-error'}
                    name={confirmEmailCandidat === conseiller?.email ? 'text-input-valid' : 'text-input-error'}
                    onChange={e => setConfirmEmailCandidat(e.target.value)}
                  />
                  <p
                    id={confirmEmailCandidat === conseiller?.email ? 'text-input-valid-desc-valid' : 'text-input-error-desc-error'}
                    className={confirmEmailCandidat === conseiller?.email ? 'fr-valid-text' : 'fr-error-text'}>
                    {confirmEmailCandidat === conseiller?.email ? 'Adresse e-mail confirmé' : 'L\'adresse e-mail ne correspond pas'}
                  </p>
                </div>
                <div className="fr-form-group fr-mt-2w">
                  <fieldset className="fr-fieldset">
                    <legend className="fr-fieldset__legend fr-text--regular" id="radio-legend">
                    Le motif de la suppression&nbsp;:
                    </legend>
                    <div className="fr-fieldset__content">
                      <div className="fr-radio-group">
                        <input type="radio" name="radio" id="rgpd" onClick={() => {
                          setMotif('demande RGPD');
                          setAutreMotif(false);
                        }} />
                        <label className="fr-label" htmlFor="rgpd">Demande RGPD</label>
                      </div>
                      <div className="fr-radio-group">
                        <input type="radio" name="radio" id="non_interesse_dispositif" onClick={() => {
                          setMotif('plus intéressé par le dispositif');
                          setAutreMotif(false);
                        }} />
                        <label className="fr-label" htmlFor="non_interesse_dispositif">
                        Plus intéressé par le dispositif
                        </label>
                      </div>
                      <div className="fr-radio-group">
                        <input type="radio" name="radio" id="doublon" onClick={() => {
                          setMotif('doublon');
                          setAutreMotif(false);
                        }} />
                        <label className="fr-label" htmlFor="doublon">
                        Doublon
                        </label>
                      </div>
                      <div className="fr-radio-group">
                        <input type="radio" name="radio" id="autre" onClick={() => setAutreMotif(true)} />
                        <label className="fr-label" htmlFor="autre">
                        Autre
                        </label>
                        {autreMotif &&
                        <input type="text" className="fr-input fr-col-12" id="text-input-text" onChange={e => setMotif(e.target.value)} />}
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
              <div className="fr-modal__footer">
                <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg">
                  <li>
                    <button onClick={suppressionCandidat} className="fr-btn" disabled={!(confirmEmailCandidat === conseiller?.email && motif !== '')} >
                    Oui, Supprimer définitivement
                    </button>
                  </li>
                  <li>
                    <button className="fr-btn fr-btn--secondary" onClick={annulerSuppressionCandidat}>
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

FormSuppressionCandidat.propTypes = {
  setConfirmSuppressionCandidat: PropTypes.func.isRequired,
};

export default FormSuppressionCandidat;
