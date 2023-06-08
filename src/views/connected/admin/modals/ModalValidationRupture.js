import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { useDispatch } from 'react-redux';
import { conseillerActions } from '../../../../actions';

//Print datePicker calendar in FR
registerLocale('fr', fr);
function ModalValidationRupture({ setOpenModal, idConseiller, datePrisePoste, dateFinDeContrat, setDateFinDeContrat }) {
  const [dossierIncomplet, setDossierIncomplet] = useState(null);
  const dispatch = useDispatch();

  const gestionRupture = () => {
    dispatch(conseillerActions.dossierIncompletRupture(idConseiller, dateFinDeContrat, dossierIncomplet));
    setOpenModal(false);
  };

  return (
    <dialog aria-labelledby="fr-modal-2-title" id="fr-modal-2" className="fr-modal modalOpened" role="dialog" >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button className="fr-btn--close fr-btn" aria-controls="fr-modal-2" onClick={() => {
                  setDossierIncomplet(null);
                  setOpenModal(false);
                }}>Fermer</button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-2-title" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                  D&eacute;claration d&rsquo;une rupture
                </h1>
                <p>Veuillez renseigner la date de recrutement que vous souhaitez proposer &agrave; ce candidat</p>
                <div className="fr-col-12">
                  <label
                    className="fr-label"
                    style={{ fontSize: 'unset' }}
                  >
                    <strong className="important">1. Indiquer la date de fin de contrat (obligatoire)&nbsp;:</strong>
                  </label>
                </div>
                <div className="fr-col-xl-12 btn-fr-col-xl-3">
                  <DatePicker
                    id="datePicker"
                    name="datePicker"
                    className="fr-input fr-my-2w fr-mr-6w fr-col-6"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="../../...."
                    locale="fr"
                    selected={dateFinDeContrat}
                    onChange={date => setDateFinDeContrat(date)}
                    value={dateFinDeContrat}
                    peekNextMonth
                    onChangeRaw={e => e.preventDefault()}
                    minDate={new Date(datePrisePoste)}
                    maxDate={new Date()}
                  />
                </div>
                <div className="fr-col-12 fr-mt-1w">
                  <label
                    className="fr-label"
                    style={{ fontSize: 'unset' }}
                    htmlFor="datePicker">
                    <p><strong>2. Indiquer le motif de fin de contrat (obligatoire)&nbsp;:</strong></p>
                  </label>
                </div>
                <div className="fr-form-group">
                  <fieldset className="fr-fieldset">
                    <legend className="fr-fieldset__legend fr-text--regular" id="radio-legend">
                      Renseignez l&lsquo;&eacute;tat de traitement de la demande&nbsp;:
                    </legend>
                    <div className="fr-fieldset__content">
                      <div className="fr-radio-group">
                        <input type="radio" name="radio" id="rgpd" onClick={() => {
                          setDossierIncomplet(false);
                        }} />
                        <label className="fr-label" htmlFor="rgpd">Dossier complet</label>
                      </div>
                      <div className="fr-radio-group">
                        <input type="radio" name="radio" id="non_interesse_dispositif" onClick={() => {
                          setDossierIncomplet(true);
                        }} />
                        <label className="fr-label" htmlFor="non_interesse_dispositif">
                          Demande de pi&eacute;ces justificatives
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
              <div className="fr-modal__footer">
                <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg">
                  <li >
                    <button onClick={() => {
                      setOpenModal(false);
                      setDossierIncomplet(null);
                    }} className="fr-btn" title="Notifier la rupture de contrat">
                      Annuler
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={gestionRupture}
                      disabled={!dateFinDeContrat || dossierIncomplet === null}
                      className="fr-btn fr-btn--icon-left" title="Notifier la rupture de contrat"
                    >
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

ModalValidationRupture.propTypes = {
  datePrisePoste: PropTypes.string,
  dateFinDeContrat: PropTypes.instanceOf(Date),
  idConseiller: PropTypes.string,
  setOpenModal: PropTypes.func,
  setDateFinDeContrat: PropTypes.func,
};

export default ModalValidationRupture;
