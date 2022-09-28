import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { InvitationsActions } from '../../../../actions/invitationsActions';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { valideInputEmail } from '../../../../utils/formatagesUtils';
import Hub from '../../../../datas/hubs.json';

export default function InvitationHub() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [hub, setHub] = useState(Hub[0].name);
  const [activeMessage, setActiveMessage] = useState(false);

  const sendInvitation = () => {
    if (!valideInputEmail(email) || nom === '' || prenom === '') {
      setActiveMessage(true);
      return;
    }
    dispatch(InvitationsActions.inviteAccountHub({ hub, nom, prenom, email }));
    setActiveMessage(false);
    scrollTopWindow();
    setTimeout(() => {
      dispatch(InvitationsActions.resetInvitation());
    }, 10000);
  };

  return (
    <div>
      <div className="fr-my-3w fr-my-md-6w">
        <div className="fr-input-group">
          <label className="fr-label">Nom du Hub</label>
          <span>
            <select
              className="fr-select fr-mt-1w"
              onChange={e => setHub(e.target.value)}
            >
              {Hub.map((hub, idx) => (
                <option key={idx} value={hub.name}>
                  {hub.name}
                </option>
              ))}
            </select>
          </span>
        </div>
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
      <button onClick={() => setEmail('')}
        disabled={email.length === 0 ? 'disabled' : ''}
        className="fr-btn"
      >
          Annuler
      </button>
      <button style={{ float: 'right' }}
        className="fr-btn" onClick={sendInvitation}
      >
          Envoyer
      </button>
    </div>
  );
}
