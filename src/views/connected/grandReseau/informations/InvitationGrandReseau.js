import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { invitationsActions, userActions, alerteEtSpinnerActions } from '../../../../actions';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { valideInputEmail } from '../../../../utils/formatagesUtils';

export default function InvitationGrandReseau() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const users = useSelector(state => state.user?.users);
  const reseau = useSelector(state => state.authentication.user?.reseau);

  const [form, setForm] = useState(false);
  const [activeMessage, setActiveMessage] = useState(false);
  const userError = useSelector(state => state.user?.userError);

  useEffect(() => {
    if (!userError) {
      dispatch(userActions.getUsers());
    } else {
      scrollTopWindow();
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les administrateurs n\'ont pas pu être chargées !',
        status: null, description: null
      }));
    }
  }, [userError]);

  const sendInvitation = () => {
    if (!valideInputEmail(email)) {
      setActiveMessage(true);
      return;
    }
    dispatch(invitationsActions.inviteAccountGrandReseau({ reseau, email }));
    setActiveMessage(false);
    setEmail('');
    setForm(false);
    scrollTopWindow();
    setTimeout(() => {
      dispatch(invitationsActions.resetInvitation());
    }, 10000);
  };

  return (
    <div>
      <h2>Administrateurs</h2>
      {form === false ?
        <div>
          {(!users && users?.length === 0) && <p>Aucun administrateur associ&eacute;</p>}
          {users && users?.map((user, idx) => {
            return (
              <p key={idx}>{user.name} - {user.passwordCreated ? <span>(actif)</span> : <span>(inactif)</span> }</p>
            );
          })
          }
          <button className="fr-btn fr-mt-1w fr-icon-mail-line fr-btn--icon-left" onClick={() => setForm(true)}>
            Inviter un administrateur
          </button>
        </div> :
        <>
          <div className="fr-my-3w">
            <div className={`fr-input-group ${email && !valideInputEmail(email) && activeMessage ? 'fr-input-group--error' : ''}`}>
              <label className="fr-label" htmlFor="username-input">
                E-mail de l&lsquo;administrateur
                <span className="fr-hint-text">
                  Renseigner le mail de l&lsquo;administrateur et envoyer une invitation &agrave; rejoindre le tableau de pilotage
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
          <button onClick={() => {
            setEmail('');
            setForm(false);
          }}
          className="fr-btn fr-btn--secondary"
          >
          Annuler
          </button>
          <button style={{ float: 'right' }}
            className="fr-btn" onClick={sendInvitation}
            {...!email || !valideInputEmail(email) ? { 'disabled': true } : {}}
          >
          Envoyer
          </button>
        </>
      }
    </div>
  );
}
