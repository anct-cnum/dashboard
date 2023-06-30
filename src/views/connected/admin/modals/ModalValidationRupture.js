import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { useDispatch } from 'react-redux';
import { conseillerActions } from '../../../../actions';
import { formatMotifRupture } from '../../../../utils/formatagesUtils';

//Print datePicker calendar in FR
registerLocale('fr', fr);
function ModalValidationRupture({ setOpenModal, miseEnRelation, datePrisePoste, dateFinDeContrat, setDateFinDeContrat }) {
  const [confirmationRupture, setConfirmationRupture] = useState(false);
  const [dossierComplet, setDossierComplet] = useState(null);
  const dispatch = useDispatch();

  const validationRupture = () => {
    dispatch(conseillerActions.validationRupture(miseEnRelation?.conseillerObj?._id, dateFinDeContrat));
    setOpenModal(false);
  };

  const gestionRupture = () => {
    if (dossierComplet === true) {
      setConfirmationRupture(true);
    } else {
      dispatch(conseillerActions.dossierIncompletRupture(miseEnRelation?.conseillerObj?._id, dateFinDeContrat));
      setOpenModal(false);
    }
  };

  return (
    <dialog aria-labelledby="fr-modal-2-title" id="fr-modal-2" className="fr-modal modalOpened" role="dialog" >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button className="fr-btn--close fr-btn" aria-controls="fr-modal-2" onClick={() => {
                  setDossierComplet(null);
                  setOpenModal(false);
                }}>Fermer</button>
              </div>
              {confirmationRupture === false ?
                <>
                  <div className="fr-modal__content">
                    <h1 id="fr-modal-2-title" className="fr-modal__title">
                      <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                      D&eacute;claration d&rsquo;une rupture
                    </h1>
                    <p>
                      Rupture de contrat du conseiller
                      {(miseEnRelation?.conseillerObj?.nom && miseEnRelation?.conseillerObj?.prenom) &&
                        <strong className="uppercase-letter">&nbsp;{miseEnRelation.conseillerObj.nom}
                        &nbsp;{miseEnRelation.conseillerObj.prenom}</strong>
                      }
                      &nbsp;avec la structure
                      {miseEnRelation?.structureObj?.nom &&
                        <strong>&nbsp;{miseEnRelation.structureObj.nom}</strong>
                      }
                    </p>
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
                        className="fr-label fr-mb-1v"
                        style={{ fontSize: 'unset' }}
                      >
                        <strong className="important">2. Motif&nbsp;:</strong>
                      </label>
                      {miseEnRelation?.motifRupture ?
                        <span>{formatMotifRupture(miseEnRelation.motifRupture)}</span> :
                        <span>non renseign&eacute;</span>
                      }
                    </div>
                    <div className="fr-form-group fr-mt-2w">
                      <fieldset className="fr-fieldset">
                        <legend className="fr-fieldset__legend fr-text--regular" id="radio-legend">
                          <strong className="important">3. Renseignez l&lsquo;&eacute;tat de traitement de la demande (obligatoire)&nbsp;:</strong>
                        </legend>
                        <div className="fr-fieldset__content">
                          <div className="fr-radio-group">
                            <input type="radio" name="radio" id="rgpd" onClick={() => {
                              setDossierComplet(true);
                            }} />
                            <label className="fr-label" htmlFor="rgpd">Dossier complet</label>
                          </div>
                          <div className="fr-radio-group">
                            <input type="radio" name="radio" id="non_interesse_dispositif" onClick={() => {
                              setDossierComplet(false);
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
                          setDossierComplet(null);
                        }} className="fr-btn" title="Notifier la rupture de contrat">
                          Annuler
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={gestionRupture}
                          disabled={!dateFinDeContrat || dossierComplet === null}
                          className="fr-btn fr-btn--icon-left" title="Notifier la rupture de contrat"
                        >
                          Valider
                        </button>
                      </li>
                    </ul>
                  </div>
                </> :
                <>
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
                      <li >
                        <button onClick={() => {
                          setOpenModal(false);
                          setConfirmationRupture(false);
                          setDossierComplet(null);
                        }} className="fr-btn" title="Notifier la rupture de contrat">
                          Annuler
                        </button>
                      </li>
                      <li>
                        <button onClick={validationRupture} className="fr-btn fr-btn--icon-left" title="Notifier la rupture de contrat">
                          Confirmer
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              }
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
  miseEnRelation: PropTypes.object,
  setOpenModal: PropTypes.func,
  setDateFinDeContrat: PropTypes.func,
};

export default ModalValidationRupture;
