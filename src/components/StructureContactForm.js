import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { structureActions } from '../actions/structureActions';
import { valideInputEmail } from '../utils/formatagesUtils';

function StructureContactForm({ setForm, structure }) {
  const dispatch = useDispatch();
  const [infoForm, setInfoForm] = useState(structure?.contact);

  const handleForm = event => {
    const { name, value } = event.target;
    setInfoForm({
      ...infoForm,
      [name]: value
    });
  };
  const updateInfo = () => {
    Object.keys(infoForm).forEach(k => {
      infoForm[k] = infoForm[k].trim();
    });
    dispatch(structureActions.updateContact({ id: structure?._id, contact: infoForm }));
    if (structure?.contact?.email !== infoForm?.email) {
      dispatch(structureActions.updateStructureEmail(infoForm?.email?.trim(), structure?._id));
    }
    setForm(false);
  };
  return (
    <dialog
      aria-labelledby="fr-modal-2-title"
      id="fr-modal-2"
      className="fr-modal modalOpened"
      role="dialog"
    >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button
                  className="fr-btn--close fr-btn"
                  aria-controls="fr-modal-2"
                  onClick={() => setForm(false)}
                >
                Fermer
                </button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-2-title" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                Informations de contact
                </h1>
                <p>Veuillez saisir les informations &agrave; modifier.</p>
                <>
                  <div className="fr-input-group">
                    <label className="fr-label">Nom</label>
                    <input className="fr-input" type="text" name="nom" value={infoForm?.nom} onChange={handleForm} />
                  </div>
                  <div className="fr-input-group">
                    <label className="fr-label fr-mt-5v">Pr&eacute;nom</label>
                    <input className="fr-input" type="text" name="prenom" value={infoForm?.prenom} onChange={handleForm} />
                  </div>
                  <div className="fr-input-group">
                    <label className="fr-label fr-mt-5v">Fonction</label>
                    <input className="fr-input" type="text" name="fonction" value={infoForm?.fonction} onChange={handleForm} />
                  </div>
                  <div className="fr-input-group">
                    <label className="fr-label fr-mt-5v">T&eacute;l&eacute;phone</label>
                    <input className="fr-input" type="text" name="telephone" maxLength="20" value={infoForm?.telephone} onChange={handleForm}/>
                  </div>
                  <div className="fr-input-group">
                    <label className="fr-label fr-mt-5v">Email</label>
                    <input className="fr-input" type="text" name="email" value={infoForm?.email} onChange={handleForm}/>
                  </div>
                </>
              </div>
              <div className="fr-modal__footer">
                <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg">
                  <li>
                    <button className="fr-btn fr-btn--secondary" onClick={() => setForm(false)}>
                    Annuler
                    </button>
                  </li>
                  <li>
                    <button
                      className="fr-btn"
                      onClick={updateInfo}
                      disabled={!infoForm?.nom || !infoForm?.prenom || !infoForm?.fonction || !infoForm?.telephone || !valideInputEmail(infoForm?.email) }
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


StructureContactForm.propTypes = {
  setForm: PropTypes.func,
  structure: PropTypes.object
};
export default StructureContactForm;

