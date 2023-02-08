import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import PropTypes from 'prop-types';
import fr from 'date-fns/locale/fr';
//Print datePicker calendar in FR
registerLocale('fr', fr);
function NotificationRupture({ misesEnRelationFinalisee, dateRupture, motifRupture, updateStatut }) {
  const today = new Date();
  const [dateRuptureValidee, setDateRuptureValidee] = useState(dateRupture);
  const [motifRuptureValide, setMotifRuptureValide] = useState(motifRupture);
  const [afficherRupture, setAfficherRupture] = useState(false);

  return (
    <>
      {misesEnRelationFinalisee?.statut === 'finalisee' && <>
        <div className="fr-col-12 fr-col-xl-6 fr-my-2w">
          <button className="fr-btn btn-fr-col-xl-3" onClick={() => setAfficherRupture(!afficherRupture)} >
          Initier une rupture de contrat
          </button>
        </div>

        {afficherRupture && <> <div className="fr-col-12">
          <label
            className="fr-label"
            style={{ fontSize: 'unset' }}
            htmlFor="datePickerRupture">
            <strong>1. Indiquer la date de fin de contrat (obligatoire)&nbsp;:</strong>
          </label>
        </div>

        <div className="fr-col-12 fr-col-xl-4">
          <DatePicker
            id="datePickerRupture"
            name="datePickerRupture"
            className="fr-input fr-my-2w fr-mr-6w"
            dateFormat="dd/MM/yyyy"
            placeholderText="../../...."
            maxDate={new Date(today.setMonth(today.getMonth() + 2))} //Max date à M+2
            minDate={new Date('11/01/2020')}
            locale="fr"
            selected={dateRuptureValidee ? new Date(dateRuptureValidee) : ''}
            onChange={date => setDateRuptureValidee(date)}
            onKeyDown={e => {
              e.preventDefault();
            }}
          />
        </div>


        <div className="fr-col-12">
          <label
            className="fr-label"
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
                  onChange={ motif => setMotifRuptureValide(motif.target.value)} value={motifRuptureValide === null ? '' : 'licenciement'}/>
                <label className="fr-label" htmlFor="radio-1">Licenciement : Pour motif &eacute;conomique / Rupture conventionnelle / Pour faute professionnelle
                </label>
              </div>
              <div className="fr-radio-group fr-radio-group--sm">
                <input type="radio" id="radio-2" name="motifRupture"
                  onChange={ motif => setMotifRuptureValide(motif.target.value)} value={motifRuptureValide === null ? '' : 'nonReconductionCDD'}/>
                <label className="fr-label" htmlFor="radio-2">Non-reconduction du CDD : Pour motif &eacute;conomique / A l&rsquo;amiable / Non-satisfaction
                </label>
              </div>
              <div className="fr-radio-group fr-radio-group--sm">
                <input type="radio" id="radio-3" name="motifRupture"
                  onChange={ motif => setMotifRuptureValide(motif.target.value)} value={motifRuptureValide === null ? '' : 'demission'}/>
                <label className="fr-label" htmlFor="radio-3">D&eacute;mission : Li&eacute;e &agrave; la formation
                / Inad&eacute;quation du profil au poste / Raisons personnelles
                / Autre opportunit&eacute; professionnelle / Changement de structure au sein du dispositif / D&eacute;saccords avec l&rsquo;employeur
                </label>
              </div>
            </div>
          </fieldset>
        </div>
        <ul className="fr-btns-group fr-btns-group--inline">
          <li>
            <button onClick={() => {
              updateStatut('nouvelle_rupture', motifRuptureValide, dateRuptureValidee);
              setAfficherRupture(false);
              setDateRuptureValidee('');
              setMotifRuptureValide('');
            }} disabled={ !dateRuptureValidee || !motifRuptureValide } className="fr-btn fr-btn--icon-left" title="Notifier la rupture de contrat"
            >
          Valider
            </button>
          </li>
          <li >
            <button onClick={() => {
              setAfficherRupture(false);
              setDateRuptureValidee('');
              setMotifRuptureValide('');
            }} className="fr-btn" title="Notifier la rupture de contrat" style={{ backgroundColor: '#CECECE' }}>
          Annuler
            </button>
          </li>
        </ul>
        </>}
      </>
      }
      {misesEnRelationFinalisee?.statut === 'nouvelle_rupture' &&
          <div className="fr-col-6">
            <p><strong>Rupture de contrat notifi&eacute;e</strong></p><br />
            <button onClick={() => {
              updateStatut('finalisee');
            }}
            className="fr-btn fr-icon-error-line fr-btn--icon-left fr-btn--secondary"
            title="Annuler la rupture de contrat">
            Annuler la rupture de contrat
            </button>
          </div>
      }
    </>
  );
}

NotificationRupture.propTypes = {
  statut: PropTypes.string,
  updateStatut: PropTypes.func,
  miseEnRelationId: PropTypes.string,
  dateRecrutement: PropTypes.string,
  dateRupture: PropTypes.string,
  motifRupture: PropTypes.string,
  misesEnRelationFinalisee: PropTypes.object,
};

export default NotificationRupture;
