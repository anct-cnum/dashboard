import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { invitationsActions } from '../../../../actions';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { valideInputEmail } from '../../../../utils/formatagesUtils';

export default function InvitationGrandReseau() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const users = useSelector(state => state.user?.users);
  const [form, setForm] = useState(false);
  const [activeMessage, setActiveMessage] = useState(false);
  const userError = useSelector(state => state.user?.userError);

  const sendInvitation = () => {
    if (!valideInputEmail(email) || nom === '' || prenom === '') {
      setActiveMessage(true);
      return;
    }
    // dispatch(invitationsActions.invit({ hub, nom, prenom, email }));
    setActiveMessage(false);
    scrollTopWindow();
    setTimeout(() => {
      // dispatch(invitationsActions.resetInvitation());
    }, 10000);
  };

  return (
    <div>
      <h2>Administrateurs</h2>
      {form === false ?
        <div>
          {users?.length === 0 && <p>Aucun compte associé.</p>}
          {users && users?.map((user, idx) => {
            return (
              <p key={idx}>{user.name} - {user.passwordCreated ? <span>(actif)</span> : <span>(inactif)</span> }</p>
            );
          })
          }
          <button className="fr-btn fr-mt-2w fr-icon-mail-line fr-btn--icon-left" onClick={() => setForm(true)}>
                    Inviter un administrateur
          </button>
        </div> :
        <>
          <div className="fr-my-3w fr-my-md-6w">
            <div className={`fr-input-group ${prenom === '' && activeMessage ? 'fr-input-group--error' : ''}`}>
              <label className="fr-label" htmlFor="prenom-input">
                Pr&eacute;nom
              </label>
              <input
                className={`fr-input ${email && !valideInputEmail(email) && activeMessage ? 'fr-input--error' : ''}`}
                aria-describedby="prenom-error"
                type="text"
                id="prenom-input"
                name="prenom"
                value={prenom}
                onChange={e => setPrenom(e.target.value.trim())} />
              {prenom === '' && activeMessage &&
                  <p id="prenom-error" className="fr-error-text">
                        Veuillez entrez un pr&eacute;nom
                  </p>
              }
            </div>
            <div className={`fr-input-group ${nom === '' && activeMessage ? 'fr-input-group--error' : ''}`}>
              <label className="fr-label" htmlFor="nom-input">
                Nom
              </label>
              <input
                className={`fr-input ${email && !valideInputEmail(email) && activeMessage ? 'fr-input--error' : ''}`}
                aria-describedby="nom-error"
                type="text"
                id="nom-input"
                name="nom"
                value={nom}
                onChange={e => setNom(e.target.value.trim())} />
              {nom === '' && activeMessage &&
                  <p id="nom-error" className="fr-error-text">
                        Veuillez entrez un nom
                  </p>
              }
            </div>
            <div className={`fr-input-group ${email && !valideInputEmail(email) && activeMessage ? 'fr-input-group--error' : ''}`}>
              <label className="fr-label" htmlFor="username-input">
                Adresse mail
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
            setNom('');
            setPrenom('');
            setForm(false);
          }}
          className="fr-btn"
          >
          Annuler
          </button>
          <button style={{ float: 'right' }}
            className="fr-btn" onClick={sendInvitation}
            {...!email || !valideInputEmail(email) || !nom || !prenom ? { 'disabled': true } : {}}
          >
          Envoyer
          </button>
        </>
      }
    </div>
  );
}
