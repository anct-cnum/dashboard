import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { InvitationsActions } from '../../../../actions/invitationsActions';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { valideInputEmail } from '../../../../utils/formatagesUtils';

export default function InvitationAdmin() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [activeMessage, setActiveMessage] = useState(false);

  const sendInvitation = () => {
    if (!valideInputEmail(email)) {
      setActiveMessage(true);
      return;
    }
    dispatch(InvitationsActions.inviteAccountAdmin(email));
    setActiveMessage(false);
    scrollTopWindow();
    setTimeout(() => {
      dispatch(InvitationsActions.resetInvitation());
    }, 10000);
  };

  return (
    <div>
      <div className="fr-my-3w fr-my-md-6w fr-col-md-8">
        <div className={`fr-input-group ${email && !valideInputEmail(email) && activeMessage ? 'fr-input-group--error' : ''}`}>
          <input
            className={`fr-input ${email && !valideInputEmail(email) && activeMessage ? 'fr-input--error' : ''}`}
            aria-describedby="username-error"
            placeholder="Email"
            type="text"
            id="username-input"
            name="username"
            value={email}
            onChange={e => setEmail(e.target.value.trim())} />
          {email && !valideInputEmail(email) && activeMessage &&
            <p id="username-error" className="fr-error-text">
                  Le format de l&rsquo;adresse email saisi est invalide.
            </p>
          }
          {email === '' && activeMessage &&
            <p id="username-error" className="fr-error-text">
              Veuillez saisir une adresse email.
            </p>
          }
        </div>
      </div>
      <button onClick={() => setEmail('')}
        disabled={email.length === 0 ? 'disabled' : ''}
        className="fr-btn fr-btn--secondary"
      >
        Annuler
      </button>
      <button
        className="fr-btn fr-ml-2w" onClick={sendInvitation}
        {...!email || !valideInputEmail(email) ? { 'disabled': true } : {}}
      >
        Envoyer
      </button>
    </div>
  );
}
