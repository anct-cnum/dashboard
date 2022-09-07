import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InvitationActions } from '../../../actions/invitationActions';
import { Oval } from 'react-loader-spinner';

export default function InvitationMulticompteStructure() {
  const dispatch = useDispatch();
  const valideEmail = new RegExp(/^[a-zA-Z0-9-._]+@[a-zA-Z0-9-._]{2,}[.][a-zA-Z]{2,3}$/);
  const [email, setEmail] = useState('');
  const [activeMessage, setActiveMessage] = useState(false);
  const sendInvitation = () => {
    if (!valideEmail.test(email)) {
      setActiveMessage(true);
    }
    dispatch(InvitationActions.inviteStructure(email));
    setActiveMessage(false);
    window.scrollTo(0, 0);
    setTimeout(() => {
      dispatch(InvitationActions.resetInvitation());
    }, 10000);
  };
  const { error, success, loading } = useSelector(state => state.invitation);

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
          <div className="invalid">Le format de l&rsquo;email saisi est invalide.</div>
        }
      </div>
      <button onClick={() => setEmail('')} className="fr-btn">Annuler</button>
      <button style={{ float: 'right' }} className="fr-btn" disabled={!valideEmail.test(email) ? 'disabled' : ''} onClick={sendInvitation}>
          Envoyer
      </button>
    </div>
  );
}
