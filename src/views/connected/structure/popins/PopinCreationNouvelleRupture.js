import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { useSelector } from 'react-redux';

//Print datePicker calendar in FR
registerLocale('fr', fr);
function PopinCreationNouvelleRupture({ setOpenModal, updateStatut }) {
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const miseEnRelation = conseiller.misesEnRelation.filter(miseEnRelation => miseEnRelation.statut === 'finalisee')[0];
  const [dateRuptureValidee, setDateRuptureValidee] = useState(null);
  const [motifRuptureValide, setMotifRuptureValide] = useState(null);

  const today = new Date();
  const dateMinRupture = miseEnRelation?.dateDebutDeContrat ?
    new Date(miseEnRelation.dateDebutDeContrat) :
    new Date('11/01/2020');
  const dateMaxRupture = miseEnRelation?.dateFinDeContrat ?
    new Date(miseEnRelation.dateFinDeContrat) :
    new Date(today.setMonth(today.getMonth() + 2)); //Max date à M+2

  return (
    <dialog aria-labelledby="fr-modal-2-title" id="fr-modal-2" className="fr-modal modalOpened" role="dialog" >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button className="fr-btn--close fr-btn" aria-controls="fr-modal-2" onClick={() => {
                  setDateRuptureValidee(null);
                  setOpenModal(false);
                }}>Fermer</button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-2-title" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                  Déclaration d&rsquo;une rupture
                </h1>
                <p className="fr-mb-1w">Veuillez renseigner les informations ci-dessous</p>
                <div className="fr-col-12">
                  <strong className="important">1. Indiquer la date de fin de contrat (obligatoire)&nbsp;:</strong>
                </div>
                <div className="fr-col-xl-12 btn-fr-col-xl-3">
                  <DatePicker
                    id="datePicker"
                    name="datePicker"
                    className="fr-input fr-my-1w fr-mr-6w fr-col-6"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="../../...."
                    locale="fr"
                    onChangeRaw={e => e.preventDefault()}
                    maxDate={dateMaxRupture}
                    minDate={dateMinRupture}
                    selected={dateRuptureValidee}
                    onChange={date => setDateRuptureValidee(date)}
                  />
                </div>
                <div className="fr-col-12 fr-mt-1w">
                  <label
                    className="fr-label fr-text--sm fr-m-0w"
                    style={{ fontSize: 'unset' }}
                    htmlFor="datePicker">
                    <p><strong>2. Indiquer le motif de fin de contrat (obligatoire)&nbsp;:</strong></p>
                  </label>
                </div>
                <div className="fr-form-group">
                  <fieldset className="fr-fieldset">
                    <div className="fr-fieldset__content">
                      <div className="fr-radio-group fr-radio-group--sm">
                        <input type="radio" id="radio-1" name="motifRupture"
                          onChange={ motif => setMotifRuptureValide(motif.target.value)} value="licenciement" />
                        <label className="fr-label fr-text--sm fr-mb-0" htmlFor="radio-1">
                            Licenciement : Pour motif &eacute;conomique / Rupture conventionnelle / Pour faute professionnelle
                        </label>
                      </div>
                      <div className="fr-radio-group fr-radio-group--sm">
                        <input type="radio" id="radio-2" name="motifRupture"
                          onChange={ motif => setMotifRuptureValide(motif.target.value)} value="nonReconductionCDD" />
                        <label className="fr-label fr-text--sm fr-mb-0" htmlFor="radio-2">
                            Non-reconduction du CDD : Pour motif &eacute;conomique / A l&rsquo;amiable / Non-satisfaction
                        </label>
                      </div>
                      <div className="fr-radio-group fr-radio-group--sm">
                        <input type="radio" id="radio-3" name="motifRupture"
                          onChange={ motif => setMotifRuptureValide(motif.target.value)} value="demission" />
                        <label className="fr-label fr-text--sm fr-mb-0" htmlFor="radio-3">
                            D&eacute;mission : Li&eacute;e &agrave; la formation
                            / Inad&eacute;quation du profil au poste / Raisons personnelles
                            / Autre opportunit&eacute; professionnelle / Changement de structure au sein du dispositif /
                            D&eacute;saccords avec l&rsquo;employeur
                        </label>
                      </div>
                      <div className="fr-radio-group fr-radio-group--sm">
                        <input type="radio" id="radio-4" name="motifRupture"
                          onChange={ motif => setMotifRuptureValide(motif.target.value)} value="CDIsation" />
                        <label className="fr-label fr-text--sm fr-mb-0" htmlFor="radio-4">
                            CDIsation / titularisation de contrat
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
              <div className="fr-modal__footer fr-pt-1w">
                <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg">
                  <li >
                    <button onClick={() => {
                      setDateRuptureValidee(null);
                      setMotifRuptureValide(null);
                      setOpenModal(false);
                    }} className="fr-btn" title="Notifier la rupture de contrat">
                    Annuler
                    </button>
                  </li>
                  <li>
                    <button onClick={() => {
                      updateStatut('nouvelle_rupture', motifRuptureValide, dateRuptureValidee);
                      setDateRuptureValidee(null);
                      setMotifRuptureValide(null);
                      setOpenModal(false);
                    }} disabled={ !dateRuptureValidee || !motifRuptureValide } className="fr-btn fr-btn--icon-left" title="Notifier la rupture de contrat"
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

PopinCreationNouvelleRupture.propTypes = {
  updateStatut: PropTypes.func,
  setOpenModal: PropTypes.func,
};

export default PopinCreationNouvelleRupture;
