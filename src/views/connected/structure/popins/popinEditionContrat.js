import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { validTypeDeContratWithoutEndDate } from '../../../../utils/formatagesUtils';

registerLocale('fr', fr);
function popinEditionContrat({ setOpenModalContrat, updateContract, conseiller, editMode, createContract }) {
  const [dateDebut, setDateDebut] = useState(null);
  const [dateFin, setDateFin] = useState(null);
  const [typeDeContrat, setTypeDeContrat] = useState(null);
  const [salaire, setSalaire] = useState('');
  const salaireMinimum = 1709.28;

  const handleSubmit = () => {
    if (editMode) {
      updateContract(typeDeContrat, dateDebut, dateFin, salaire, conseiller?.miseEnrelationId);
    } else {
      createContract(typeDeContrat, dateDebut, dateFin, salaire);
    }
    setDateDebut(null);
    setDateFin(null);
    setTypeDeContrat(null);
    setSalaire('');
    setOpenModalContrat(false);
  };

  const handleCancel = () => {
    setDateDebut(null);
    setDateFin(null);
    setTypeDeContrat(null);
    setOpenModalContrat(false);
  };

  useEffect(() => {
    if (editMode && conseiller) {
      setTypeDeContrat(conseiller?.typeDeContrat);
      setDateDebut(conseiller?.dateDebutDeContrat ? new Date(conseiller?.dateDebutDeContrat) : null);
      if (!validTypeDeContratWithoutEndDate(conseiller?.typeDeContrat)) {
        setDateFin(conseiller?.dateFinDeContrat ? new Date(conseiller?.dateFinDeContrat) : null);
      }
      setSalaire(String(conseiller?.salaire) || '');
    }
  }, [editMode, conseiller]);

  const checkContratValid = () => {
    if (validTypeDeContratWithoutEndDate(typeDeContrat)) {
      if (!dateDebut || !typeDeContrat || salaire < salaireMinimum) {
        return true;
      }
    } else if (!dateFin || !dateDebut || !typeDeContrat || salaire < salaireMinimum) {
      return true;
    }
    if (editMode) {
      if (String(conseiller?.salaire) !== salaire || !conseiller?.typeDeContrat?.includes(typeDeContrat)) {
        return false;
      }
      if (new Date(conseiller?.dateDebutDeContrat)?.getTime() !== dateDebut?.getTime()) {
        return false;
      }
      if (!validTypeDeContratWithoutEndDate(typeDeContrat) && new Date(conseiller?.dateFinDeContrat)?.getTime() !== dateFin?.getTime()) {
        return false;
      }
      return true;
    }
  };

  const handleChangeSalaire = e => {
    const regexFloatNumber = /^(\d+(?:[\\.\\,]\d*)?)$/;
    if (e.target.value === '' || regexFloatNumber.test(e.target.value)) {
      setSalaire(e.target.value);
    }
  };

  const errorSalaire = () => {
    if (salaire && !isNaN(salaire) && salaire.toString().length >= 4) {
      return salaire < salaireMinimum;
    }
    return false;
  };


  return (
    <dialog aria-labelledby="edition-contrat-title" id="edition-contrat" className="fr-modal modalOpened" role="dialog">
      <div className="fr-container fr-container--fluid fr-container-sm">
        <div className="fr-grid-row fr-grid-row--center" >
          <div className="fr-col-12 fr-col-md-4 fr-col-lg-6">
            <div className="fr-modal__body" >
              <div className="fr-modal__header">
                <button
                  className="fr-btn--close fr-btn"
                  aria-controls="edition-contrat"
                  onClick={() => {
                    setDateDebut(null);
                    setOpenModalContrat(false);
                  }}
                >
                  Fermer
                </button>
              </div>
              <div className="fr-modal__content">
                <h1 id="edition-contrat-title" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                  Renseigner un contrat
                </h1>
                <p className="fr-text--sm" style={{ marginBottom: '10px' }}>
                  Veuillez renseigner le contrat que vous souhaitez proposer &agrave; ce candidat avant de fournir ses
                  pi&egrave;ces justificatives sur D&eacute;marches Simplifi&eacute;es.
                </p>
                <div className="fr-col-12 fr-mt-1w">
                  <label className="fr-label" style={{ fontSize: 'unset' }} htmlFor="datePicker">
                    <p style={{ marginBottom: '10px' }}>Type de contrat</p>
                  </label>
                </div>
                <div className="fr-form-group fr-mb-1w">
                  <fieldset className="fr-fieldset">
                    <div className="fr-fieldset-contract__content">
                      <div className="fr-contract-radio-group fr-radio-group--sm">
                        <input
                          type="radio"
                          id="radio-1"
                          name="motifRupture"
                          onChange={motif => {
                            setTypeDeContrat(motif.target.value);
                            setDateFin(null);
                          }}
                          value="CDI"
                          checked={typeDeContrat?.includes('CDI')}
                        />
                        <label className="fr-label fr-ml-1w" htmlFor="radio-1">
                          CDI
                        </label>
                      </div>
                      <div className="fr-contract-radio-group fr-radio-group--sm">
                        <input
                          type="radio"
                          id="radio-2"
                          name="motifRupture"
                          onChange={motif => setTypeDeContrat(motif.target.value)}
                          value="CDD"
                          checked={typeDeContrat?.includes('CDD')}
                        />
                        <label className="fr-label fr-ml-1w" htmlFor="radio-2">
                          CDD
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div className="fr-form-group">
                  <fieldset className="fr-fieldset">
                    <div className="fr-fieldset-contract__content">
                      <div className="fr-contract-radio-group fr-radio-group--sm">
                        <input
                          type="radio"
                          id="radio-3"
                          name="motifRupture"
                          onChange={motif => setTypeDeContrat(motif.target.value)}
                          value="PEC"
                          checked={typeDeContrat === 'PEC'}
                        />
                        <label className="fr-label fr-ml-1w" htmlFor="radio-3">
                          PEC
                        </label>
                      </div>
                      <div className="fr-contract-radio-group fr-radio-group--sm">
                        <input
                          type="radio"
                          id="radio-4"
                          name="motifRupture"
                          onChange={motif => setTypeDeContrat(motif.target.value)}
                          value="contrat_de_projet_public"
                          checked={typeDeContrat === 'contrat_de_projet_public'}
                        />
                        <label className="fr-label fr-ml-1w" htmlFor="radio-4">
                          Contrat de projet public
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className="fr-grid-row">
                  <div className="fr-col-6">
                    <label className="fr-label" style={{ fontSize: 'unset' }}>
                    Date de d&eacute;but de contrat
                    </label>
                    <div className="fr-col-xl-8 btn-fr-col-xl-3">
                      <DatePicker
                        id="datePickerDebutContrat"
                        name="datePickerDebutContrat"
                        className="fr-input fr-my-1w fr-mr-6w fr-col-12"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="../../...."
                        locale="fr"
                        onChangeRaw={e => e.preventDefault()}
                        minDate={editMode ? null : new Date()}
                        maxDate={dateFin}
                        selected={dateDebut}
                        onChange={date => setDateDebut(date)}
                      />
                    </div>
                  </div>
                  <div className="fr-col-6">
                    <label className="fr-label" style={{ fontSize: 'unset' }}>
                    Date de fin de contrat
                    </label>
                    <div className="fr-col-xl-8 btn-fr-col-xl-3">
                      <DatePicker
                        id="datePickerFinContrat"
                        name="datePickerFinContrat"
                        className="fr-input fr-my-1w fr-mr-6w fr-col-12"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="../../...."
                        locale="fr"
                        disabled={typeDeContrat === 'CDI'}
                        onChangeRaw={e => e.preventDefault()}
                        minDate={dateDebut !== null ? dateDebut : new Date()}
                        selected={dateFin}
                        onChange={date => setDateFin(date)}
                      />
                    </div>
                  </div>
                </div>
                <div className={`fr-input-group ${errorSalaire() && 'fr-input-group--error'} fr-col-6 fr-mt-1w`}>
                  <label className="fr-label">Salaire brut mensuel
                    <span className="fr-hint-text">Renseignez ici une estimation du salaire</span>
                  </label>
                  <input
                    className="fr-input"
                    type="text"
                    name="salaire"
                    onChange={handleChangeSalaire}
                    min={salaireMinimum}
                    value={salaire}
                  />
                  {
                    errorSalaire() &&
                   <p id="text-input-error-desc-error" className="fr-error-text">
                     Le salaire saisi est inf&eacute;rieur au SMIC
                   </p>
                  }
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
                      disabled={checkContratValid() || errorSalaire()}
                      className="fr-btn fr-btn--icon-left"
                      title="&Eacute;diter le contrat"
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
  conseiller: PropTypes.object,
  setOpenModalContrat: PropTypes.func,
  editMode: PropTypes.bool,
  createContract: PropTypes.func,
};

export default popinEditionContrat;
