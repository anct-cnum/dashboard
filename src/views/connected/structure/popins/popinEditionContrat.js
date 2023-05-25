import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';

registerLocale('fr', fr);
function popinEditionContrat({ setOpenModalContrat, createContract, updateContract, conseiller, editMode }) {
  const [dateDebut, setDateDebut] = useState(null);
  const [dateFin, setDateFin] = useState(null);
  const [typeDeContrat, setTypeDeContrat] = useState(null);
  const [salaire, setSalaire] = useState('');

  const handleSubmit = () => {
    if (editMode) {
      updateContract(typeDeContrat, dateDebut, dateFin, salaire, conseiller?.miseEnrelationId);
    } else {
      createContract(typeDeContrat, dateDebut, dateFin, salaire);
    }
    setDateDebut(null);
    setTypeDeContrat(null);
    setSalaire('');
    setOpenModalContrat(false);
  };

  const handleCancel = () => {
    setDateDebut(null);
    setTypeDeContrat(null);
    setOpenModalContrat(false);
  };

  useEffect(() => {
    if (editMode && conseiller) {
      setTypeDeContrat(conseiller?.typeDeContrat);
      setDateDebut(conseiller?.dateDebutDeContrat ? new Date(conseiller?.dateDebutDeContrat) : null);
      setDateFin(conseiller?.dateFinDeContrat ? new Date(conseiller?.dateFinDeContrat) : null);
      setSalaire(conseiller?.salaire || '');
    }
  }, [editMode, conseiller]);

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
                  onClick={() => {
                    setDateDebut(null);
                    setOpenModalContrat(false);
                  }}
                >
                  Fermer
                </button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-2-title" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                  Renseigner un contrat pour ce candidat
                </h1>
                <p>Veuillez renseigner le contrat que vous souhaitez proposer &agrave; ce candidat avant de fournir ses pi&egrave;ces justificatives.</p>
                <div className="fr-col-12 fr-mt-1w">
                  <label className="fr-label" style={{ fontSize: 'unset' }} htmlFor="datePicker">
                    <p>Type de contrat</p>
                  </label>
                </div>
                <div className="fr-form-group">
                  <fieldset className="fr-fieldset">
                    <div className="fr-fieldset__content">
                      <div className="fr-radio-group fr-radio-group--sm">
                        <input
                          type="radio"
                          id="radio-1"
                          name="motifRupture"
                          onChange={motif => setTypeDeContrat(motif.target.value)}
                          value="cdi"
                          checked={typeDeContrat === 'cdi'}
                        />
                        <label className="fr-label" htmlFor="radio-1">
                          CDI
                        </label>
                      </div>
                      <div className="fr-radio-group fr-radio-group--sm">
                        <input
                          type="radio"
                          id="radio-2"
                          name="motifRupture"
                          onChange={motif => setTypeDeContrat(motif.target.value)}
                          value="cdd"
                          checked={typeDeContrat === 'cdd'}
                        />
                        <label className="fr-label" htmlFor="radio-2">
                          CDD
                        </label>
                      </div>
                      <div className="fr-radio-group fr-radio-group--sm">
                        <input
                          type="radio"
                          id="radio-3"
                          name="motifRupture"
                          onChange={motif => setTypeDeContrat(motif.target.value)}
                          value="contrat_de_projet_prive"
                        />
                        <label className="fr-label" htmlFor="radio-3">
                          Contrat de projet priv&eacute;
                        </label>
                      </div>
                      <div className="fr-radio-group fr-radio-group--sm">
                        <input
                          type="radio"
                          id="radio-4"
                          name="motifRupture"
                          onChange={motif => setTypeDeContrat(motif.target.value)}
                          value="contrat_de_projet_public"
                        />
                        <label className="fr-label" htmlFor="radio-4">
                          Contrat de projet public
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className="fr-col-12">
                  <label className="fr-label" style={{ fontSize: 'unset' }}>
                    Date de d&eacute;but de contrat
                  </label>
                </div>
                <div className="fr-col-xl-12 btn-fr-col-xl-3">
                  <DatePicker
                    id="datePicker"
                    name="datePicker"
                    className="fr-input fr-my-2w fr-mr-6w fr-col-12"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="../../...."
                    locale="fr"
                    onChangeRaw={e => e.preventDefault()}
                    minDate={new Date()}
                    selected={dateDebut}
                    onChange={date => setDateDebut(date)}
                  />
                </div>
                <div className="fr-col-12 fr-mt-2w">
                  <label className="fr-label" style={{ fontSize: 'unset' }}>
                    Date de fin de contrat
                  </label>
                </div>
                <div className="fr-col-xl-12 btn-fr-col-xl-3">
                  <DatePicker
                    id="datePicker"
                    name="datePicker"
                    className="fr-input fr-my-2w fr-mr-6w fr-col-12"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="../../...."
                    locale="fr"
                    onChangeRaw={e => e.preventDefault()}
                    minDate={new Date()}
                    selected={dateFin}
                    onChange={date => setDateFin(date)}
                  />
                </div>
                <div className="fr-input-group fr-col-6 fr-mt-2w">
                  <label className="fr-label">Salaire brut mensuel</label>
                  <input
                    className="fr-input"
                    type="text"
                    name="salaire"
                    maxLength="20"
                    onChange={e => setSalaire(e.target.value)}
                    value={salaire}
                  />
                </div>
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
                      onClick={handleSubmit}
                      disabled={!dateFin || !dateDebut || !typeDeContrat || !salaire}
                      className="fr-btn fr-btn--icon-left"
                      title="Notifier la rupture de contrat"
                    >
                      {editMode ? 'Modifier' : 'Confirmer'}
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

popinEditionContrat.propTypes = {
  updateContrat: PropTypes.func,
  updateDateRecrutement: PropTypes.func,
  setDateValidee: PropTypes.func,
  setOpenModalContrat: PropTypes.func,
};

export default popinEditionContrat;
