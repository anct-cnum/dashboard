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
    }
    dispatch(InvitationsActions.inviteAccountAdmin(email));
    setActiveMessage(false);
    scrollTopWindow();
    setTimeout(() => {
      dispatch(InvitationsActions.resetInvitation());
    }, 10000);
  };

  return (
    <div style={{ width: '50%' }}>
      <div className="fr-my-3w">
        <label className="fr-label">Email</label>
        <input
          className="fr-input"
          type="email"
          id="text-input-text"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {email && !valideInputEmail(email) && activeMessage && (
          <div className="invalid">
            Le format de l&rsquo;adresse mail saisi est invalide.
          </div>
        )}
      </div>
      <button
        onClick={() => setEmail('')}
        disabled={email.length === 0 ? 'disabled' : ''}
        className="fr-btn"
      >
        Annuler
      </button>
      <button
        style={{ float: 'right' }}
        className="fr-btn"
        disabled={!valideInputEmail(email) ? 'disabled' : ''}
        onClick={sendInvitation}
      >
        Envoyer
      </button>
    </div>
  );
}
