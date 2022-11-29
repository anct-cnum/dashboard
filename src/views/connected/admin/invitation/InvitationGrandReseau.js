import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { invitationsActions } from '../../../../actions/invitationsActions';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { valideInputEmail } from '../../../../utils/formatagesUtils';
import GrandReseau from '../../../../datas/grand-reseaux.json';

export default function InvitationGrandReseau() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [grandReseau, setGrandReseau] = useState('');
  const [activeMessage, setActiveMessage] = useState(false);

  const sendInvitation = () => {
    if (!valideInputEmail(email) || nom === '' || prenom === '' || grandReseau === '') {
      setActiveMessage(true);
      return;
    }
    dispatch(invitationsActions.inviteAccountGrandReseau({ reseau: grandReseau, email, nom, prenom }));
    setActiveMessage(false);
    scrollTopWindow();
    setTimeout(() => {
      dispatch(invitationsActions.resetInvitation());
    }, 10000);
  };

  return (
    <div>
      <div className="fr-my-3w fr-my-md-6w fr-col-md-8">
        <div className="fr-input-group">
          <span>
            <select
              aria-describedby="select-error-desc-error"
              className="fr-select fr-mt-1w"
              onChange={e => setGrandReseau(e.target.value)}
              value={grandReseau}
            >
              <option value="" disabled hidden>S&eacute;lectionner le nom du grand r&eacute;seau</option>
              {GrandReseau.map((grandReseau, idx) => (
                <option key={idx} value={grandReseau.reseau}>
                  {grandReseau.libelle}
                </option>
              ))}
            </select>
          </span>
          {grandReseau === '' && activeMessage &&
            <p id="select-error-desc-error" className="fr-error-text">
              Veuiller s&eacute;lectionner un grand r&eacute;seau
            </p>
          }
        </div>
        <div className={`fr-input-group ${prenom === '' && activeMessage ? 'fr-input-group--error' : ''}`}>
          <label className="fr-label" htmlFor="prenom-input">
            Pr&eacute;nom&nbsp;:
          </label>
          <input
            className={`fr-input ${email && !valideInputEmail(email) && activeMessage ? 'fr-input--error' : ''}`}
            aria-describedby="prenom-error"
            placeholder="Pr&eacute;nom"
            type="text"
            id="prenom-input"
            name="prenom"
            value={prenom}
            onChange={e => setPrenom(e.target.value.trim())} />
          {prenom === '' && activeMessage &&
            <p id="prenom-error" className="fr-error-text">
              Veuillez entrer un pr&eacute;nom
            </p>
          }
        </div>
        <div className={`fr-input-group ${nom === '' && activeMessage ? 'fr-input-group--error' : ''}`}>
          <label className="fr-label" htmlFor="nom-input">
            Nom&nbsp;:
          </label>
          <input
            className={`fr-input ${email && !valideInputEmail(email) && activeMessage ? 'fr-input--error' : ''}`}
            aria-describedby="nom-error"
            placeholder="Nom"
            type="text"
            id="nom-input"
            name="nom"
            value={nom}
            onChange={e => setNom(e.target.value.trim())} />
          {nom === '' && activeMessage &&
            <p id="nom-error" className="fr-error-text">
              Veuillez entrer un nom
            </p>
          }
        </div>
        <div className={`fr-input-group ${email && !valideInputEmail(email) && activeMessage ? 'fr-input-group--error' : ''}`}>
          <label className="fr-label" htmlFor="username-input">
            Email&nbsp;:
          </label>
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
      <button onClick={() => {
        setEmail('');
        setNom('');
        setPrenom('');
        setGrandReseau('');
      }}
      disabled={email.length === 0 && nom.length === 0 && prenom.length === 0 && grandReseau.length === 0 ? 'disabled' : ''}
      className="fr-btn fr-btn--secondary"
      >
          Annuler
      </button>
      <button
        className="fr-btn fr-ml-2w" onClick={sendInvitation}
        {...!email || !valideInputEmail(email) || !nom || !prenom || !grandReseau ? { 'disabled': true } : {}}
      >
          Envoyer
      </button>
    </div>
  );
}
