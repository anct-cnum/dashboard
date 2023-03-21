import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';

//Print datePicker calendar in FR
registerLocale('fr', fr);
function popinValidationCandidature({ setOpenModal, updateStatut, updateDateRecrutement }) {
  const [dateValidee, setDateValidee] = useState(null);

  return (
    <dialog aria-labelledby="fr-modal-2-title" id="fr-modal-2" className="fr-modal modalOpened" role="dialog" >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button className="fr-btn--close fr-btn" aria-controls="fr-modal-2" onClick={() => {
                  setDateValidee(null);
                  setOpenModal(false);
                }}>Fermer</button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-2-title" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                  Renseigner la date de recrutement
                </h1>
                <p>Veuillez renseigner la date de recrutement que vous souhaitez proposer à ce candidat</p>
                <div className="fr-col-12">
                  <label
                    className="fr-label"
                    style={{ fontSize: 'unset' }}
                  >
                    <strong className="important">Date de recrutement (obligatoire) :</strong>
                  </label>
                </div>
                <div className="fr-col-6 fr-col-xl-12 btn-fr-col-xl-3">
                  <DatePicker
                    id="datePicker"
                    name="datePicker"
                    className="fr-input fr-my-2w fr-mr-6w fr-col-6"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="../../...."
                    locale="fr"
                    popperPlacement="right"
                    minDate={new Date()}
                    selected={dateValidee}
                    onChange={date => setDateValidee(date)}
                  />
                </div>
              </div>
              <div className="fr-modal__footer">
                <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg">
                  <li>
                    <button onClick={() => {
                      setDateValidee(null);
                      setOpenModal(false);
                    }} className="fr-btn fr-btn--secondary">
                        Annuler
                    </button>
                  </li>
                  <li>
                    <button onClick={() => {
                      updateDateRecrutement(dateValidee);
                      updateStatut('recrutee');
                      setDateValidee(null);
                      setOpenModal(false);
                    }} disabled={ !dateValidee } className="fr-btn" title="Valider cette candidature">
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

popinValidationCandidature.propTypes = {
  updateStatut: PropTypes.func,
  updateDateRecrutement: PropTypes.func,
  setDateValidee: PropTypes.func,
  setOpenModal: PropTypes.func,
};

export default popinValidationCandidature;
