import React from 'react';
import PropTypes from 'prop-types';
import { valideInputEmail } from '../../../../utils/formatagesUtils';

function PopinFormulaireInvitation({ setOpenModal, email, setEmail, activeMessage, sendInvitation }) {
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
                  onClick={() => setOpenModal(false)}
                >
                  Fermer
                </button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-2-title" className="fr-modal__title">
                  <span className="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                  Inviter un administrateur
                </h1>
                <p>Infos concernant l&apos;administrateur.</p>
                <div className="fr-input-group">
                  <label className="fr-label" htmlFor="text-input-groups1">Email de l&apos;administrateur
                    <span className="fr-hint-text">
                      Renseigner le mail de l&apos;administrateur et envoyer une invitation à rejoindre le tableau de pilotage
                    </span>
                  </label>
                  <input
                    className={`fr-input ${email && !valideInputEmail(email) && activeMessage ? 'fr-input--error' : ''}`}
                    aria-describedby="username-error"
                    type="text"
                    id="username-input"
                    name="username"
                    value={email}
                    onChange={e => setEmail(e.target.value.trim())} />
                  {email && !valideInputEmail(email) && activeMessage &&
                  <p id="username-error" className="fr-error-text">
                      Le format de l&rsquo;adresse mail saisi est invalide.
                  </p>
                  }
                  {email === '' && activeMessage &&
                  <p id="username-error" className="fr-error-text">
                      Veuillez saisir une adresse mail.
                  </p>
                  }
                </div>
              </div>
              <div className="fr-modal__footer">
                <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg">
                  <li>
                    <button onClick={() => setOpenModal(false)} className="fr-btn fr-btn--secondary">
                      Annuler
                    </button>
                  </li>
                  <li>
                    <button style={{ float: 'right' }}
                      className="fr-btn" onClick={sendInvitation}
                      {...!email || !valideInputEmail(email) ? { 'disabled': true } : {}}
                    >
                    Envoyer
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

PopinFormulaireInvitation.propTypes = {
  setOpenModal: PropTypes.func,
  email: PropTypes.string,
  setEmail: PropTypes.func,
  activeMessage: PropTypes.bool,
  sendInvitation: PropTypes.func
};

export default PopinFormulaireInvitation;
