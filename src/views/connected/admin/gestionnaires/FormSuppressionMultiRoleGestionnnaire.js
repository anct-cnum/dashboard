import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { gestionnaireActions } from '../../../../actions';

function FormSuppressionMultiRoleGestionnaire({ setConfirmSuppressionGestionnaire, idGestionnaire, roles }) {
  const dispatch = useDispatch();
  const [role, setRole] = useState('');
  const filtreRole = useSelector(state => state.filtresGestionnaires?.searchRole);

  const annulerSuppressionGestionnaire = () => {
    setConfirmSuppressionGestionnaire(false);
  };

  const suppressionGestionnaire = () => {
    dispatch(gestionnaireActions.suppressionGestionnaire(idGestionnaire, role, filtreRole));
    setConfirmSuppressionGestionnaire(false);
  };

  const handleChangeAction = e => {
    setRole(e.target.value);
  };

  return (
    <dialog aria-labelledby="fr-modal-2-title" id="fr-modal-2" className="fr-modal modalOpened" role="dialog">
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button className="fr-btn--close fr-btn" aria-controls="fr-modal-2" onClick={annulerSuppressionGestionnaire}>Fermer</button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-2-title" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                  Gestion du compte gestionnaire
                </h1>
                <div className="fr-select-group">
                  <label className="fr-label" htmlFor="select">
                    S&eacute;lectionner l&rsquo;action &agrave; effectuer sur le compte du gestionnaire
                  </label>
                  <select defaultValue={''} className="fr-select" onChange={handleChangeAction}>
                    <option value="" disabled hidden>S&eacute;lectionnez une action</option>
                    <option value={'tous'}>Supprimer son compte</option>
                    {roles.map((role, idx) =>
                      <option key={idx} value={role}>Supprimer le r&ocirc;le {role}</option>
                    )}
                  </select>
                </div>
                {role === 'tous' &&
                <>
                  <p>&Ecirc;tes-vous certain(e) de vouloir supprimer ce gestionnaire ?</p>
                  <p><strong>Cette action supprimera d&eacute;finitivement toutes ses donn&eacute;es.</strong></p>
                </>
                }
                {(role !== 'tous' && role !== '') &&
                <>
                  <p>&Ecirc;tes-vous certain(e) de vouloir supprimer le r&ocirc;le {role} de ce gestionnaire ?</p>
                  <p><strong>Cette action r&eacute;voquera les acc&egrave;s li&eacute; &agrave; ce r&ocirc;le sur le tableau de bord.</strong></p>
                </>
                }
              </div>
              <div className="fr-modal__footer">
                <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg">
                  <li>
                    <button onClick={suppressionGestionnaire} disabled={!role} className="fr-btn">
                      Oui, Supprimer d&eacute;finitivement
                    </button>
                  </li>
                  <li>
                    <button className="fr-btn fr-btn--secondary" onClick={annulerSuppressionGestionnaire}>
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

FormSuppressionMultiRoleGestionnaire.propTypes = {
  setConfirmSuppressionGestionnaire: PropTypes.func.isRequired,
  idGestionnaire: PropTypes.string.isRequired,
  roles: PropTypes.array.isRequired,
};

export default FormSuppressionMultiRoleGestionnaire;
