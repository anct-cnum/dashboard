import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InvitationsActions } from '../../../actions/invitationsActions';
import { Oval } from 'react-loader-spinner';
import { scrollTopWindow } from '../../../utils/exportsUtils';
import { valideEmail } from '../../../utils/validationsUtils';

export default function InvitationStructure() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [activeMessage, setActiveMessage] = useState(false);
  const { error, success, loading } = useSelector(state => state.invitations);
  const { entity } = useSelector(state => state.authentication.user);

  const sendInvitation = () => {
    if (!valideEmail.test(email)) {
      setActiveMessage(true);
    }
    dispatch(InvitationsActions.inviteStructure({ email, structureId: entity['$id'] }));
    setActiveMessage(false);
    scrollTopWindow();
    setTimeout(() => {
      dispatch(InvitationsActions.resetInvitation());
    }, 10000);
  };

  return (
    <div style={{ width: '50%' }}>
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
      <div className="fr-my-3w">
        <label className="fr-label">Email</label>
        <input className="fr-input" type="email" id="text-input-text" name="email" value={email} onChange={e => setEmail(e.target.value)} />
        { email && !valideEmail.test(email) && activeMessage &&
          <div className="invalid">Le format de l&rsquo;adresse mail saisi est invalide.</div>
        }
      </div>
      <button onClick={() => setEmail('')} className="fr-btn">Annuler</button>
      <button style={{ float: 'right' }} className="fr-btn" disabled={!valideEmail.test(email) ? 'disabled' : ''} onClick={sendInvitation}>
          Envoyer
      </button>
    </div>
  );
}
