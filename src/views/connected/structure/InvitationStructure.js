import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InvitationsActions } from '../../../actions/invitationsActions';
import { Oval } from 'react-loader-spinner';
import { scrollTopWindow } from '../../../utils/exportsUtils';
import { valideInputEmail } from '../../../utils/formatagesUtils';

export default function InvitationStructure() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [activeMessage, setActiveMessage] = useState(false);
  const { error, success, loading } = useSelector(state => state.invitations);
  const { entity } = useSelector(state => state.authentication.user);

  const sendInvitation = () => {
    if (!valideInputEmail(email)) {
      setActiveMessage(true);
      return;
    }
    dispatch(InvitationsActions.inviteStructure({ email, structureId: entity['$id'] }));
    setActiveMessage(false);
    scrollTopWindow();
    setTimeout(() => {
      dispatch(InvitationsActions.resetInvitation());
    }, 10000);
  };

  return (
    <div>
      {success &&
        <div className="fr-alert fr-alert--success" style={{ marginBottom: '2rem' }} >
          <p className="fr-alert__title">
            {success}
          </p>
        </div>
      }
      {error &&
        <div className="fr-alert fr-alert--error" style={{ marginBottom: '2rem' }}>
          <p className="fr-alert__title">
            {error}
          </p>
        </div>
      }
      <div className="spinnerCustom">
        <Oval
          height={100}
          width={100}
          color="#060091"
          secondaryColor="white"
          visible={loading === true}
        />
      </div>
      <div className={`fr-input-group ${email && !valideInputEmail(email) && activeMessage ? 'fr-input-group--error' : ''}`}>
        <label className="fr-label" htmlFor="email-structure-input">
                Adresse mail &agrave; ajouter :
        </label>
        <input
          className={`fr-input ${email && !valideInputEmail(email) && activeMessage ? 'fr-input--error' : ''}`}
          aria-describedby="email-structure-error"
          type="text"
          id="email-structure-input"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)} />
        {email && !valideInputEmail(email) && activeMessage &&
            <p id="email-prefet-error" className="fr-error-text">
              Le format de l&rsquo;email saisi est invalide.
            </p>
        }
      </div>
      <button onClick={() => setEmail('')}
        disabled={email.length === 0 ? 'disabled' : ''}
        className="fr-btn"
      >
        Annuler
      </button>
      <button style={{ float: 'right' }} className="fr-btn" onClick={sendInvitation}>
          Envoyer
      </button>
    </div>
  );
}
