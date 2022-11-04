import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { structureActions } from '../../../../actions';

function SiretForm({ setDisplaySiretForm, structureId, structureSiret }) {
  const dispatch = useDispatch();
  const siretValid = useSelector(state => state.structure?.nomStructure);

  const [siret, setSiret] = useState(structureSiret);
  const reg = new RegExp('^[0-9]{14}$');

  const filtreValue = value => {
    //eslint-disable-next-line
    return value.replace(/\s/g,'');
  };

  const handleForm = e => {
    let { value } = e.target;
    value = filtreValue(value);
    setSiret(value);
  };

  const verifySiret = () => {
    if (siret?.length === 14 && reg.test(siret) && structureId) {
      dispatch(structureActions.verifyStructureSiret(siret));
    }
  };

  const updateSiret = () => {
    setDisplaySiretForm(false);
    dispatch(structureActions.updateStructureSiret(siret, structureId));
  };

  const cancelSiret = () => {
    dispatch(structureActions.cancelStructureSiret());
    setSiret(structureSiret);
  };

  return (
    <div>
      <div className="fr-my-3w">
        {siretValid &&
          <dialog aria-labelledby="fr-modal-2-title" id="fr-modal-2" className="fr-modal modalOpened" role="dialog" >
            <div className="fr-container fr-container--fluid fr-container-md">
              <div className="fr-grid-row fr-grid-row--center">
                <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
                  <div className="fr-modal__body">
                    <div className="fr-modal__header">
                      <button className="fr-btn--close fr-btn" onClick={cancelSiret} aria-controls="fr-modal-2">Fermer</button>
                    </div>
                    <div className="fr-modal__content">
                      <h1 id="fr-modal-2-title" className="fr-modal__title">
                        <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                            Voulez-vous mettre &agrave; jour le SIRET de la structure ?
                      </h1>
                      <p>Le SIRET demand&eacute; fait r&eacute;f&eacute;rence &agrave; cette structure :</p>
                      <p><b>{siretValid}</b></p>
                    </div>
                    <div className="fr-modal__footer">
                      <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left">
                        <li>
                          <button className="fr-btn fr-icon-success-line" onClick={updateSiret}>
                          Confirmer
                          </button>
                        </li>
                        <li>
                          <button className="fr-btn fr-icon-close-circle-line fr-btn--secondary" onClick={cancelSiret}>
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
        }
        <input className="fr-input" type="text" id="text-input-text" name="siret" value={siret} onChange={handleForm} />
      </div>
      <button onClick={() => setDisplaySiretForm(false)} className="fr-btn fr-btn--secondary">Annuler</button>
      <button style={{ float: 'right' }} className="fr-btn" onClick={verifySiret}
        disabled={(!reg.test(siret) || siret === structureSiret) ? 'disabled' : ''}>Valider</button>
    </div>
  );
}

SiretForm.propTypes = {
  setDisplaySiretForm: PropTypes.func,
  structureId: PropTypes.string,
  structureSiret: PropTypes.string
};
export default SiretForm;

