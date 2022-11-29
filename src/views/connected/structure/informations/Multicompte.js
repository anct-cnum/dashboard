import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { valideInputEmail } from '../../../../utils/formatagesUtils';
import { invitationsActions } from '../../../../actions';
import { scrollTopWindow } from '../../../../utils/exportsUtils';

function Multicompte() {
  const dispatch = useDispatch();
  const entity = useSelector(state => state.authentication?.user?.entity);
  const users = useSelector(state => state.user?.users);
  const userError = useSelector(state => state.user?.userError);
  const [email, setEmail] = useState('');
  const [activeMessage, setActiveMessage] = useState(false);

  const sendInvitation = () => {
    if (!valideInputEmail(email)) {
      setActiveMessage(true);
      return;
    }
    dispatch(invitationsActions.inviteStructure({ email, structureId: entity['$id'] }));
    setActiveMessage(false);
    scrollTopWindow();
    setTimeout(() => {
      dispatch(invitationsActions.resetInvitation());
    }, 10000);
  };

  return (
    <>
      <h2>Liste des utilisateurs</h2>
      { !userError && users &&
        <section className="fr-accordion">
          <h3 className="fr-accordion__title">
            <button className="fr-accordion__btn" aria-expanded="true" aria-controls="accordion-106">
              <span>Liste des utilisateurs</span>
            </button>
          </h3>
          <div className="fr-collapse" id="accordion-106">
            {users.length === 0 && <p>Aucun compte associé.</p>}
            {users && users.map((user, idx) => {
              return (
                <p key={idx}>{user.name} - {user.passwordCreated ? <span>(actif)</span> : <span>(inactif)</span> }</p>
              );
            })
            }
          </div>
        </section>
      }
      <div className={`fr-mt-3w fr-input-group ${email && !valideInputEmail(email) && activeMessage ? 'fr-input-group--error' : ''}`}>
        <label className="fr-label" htmlFor="email-structure-input">
                Adresse email &agrave; ajouter :
        </label>
        <input
          className={`fr-input ${email && !valideInputEmail(email) && activeMessage ? 'fr-input--error' : ''}`}
          aria-describedby="email-structure-error"
          type="text"
          id="email-structure-input"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value.trim())} />
        {email && !valideInputEmail(email) && activeMessage &&
              <p id="email-prefet-error" className="fr-error-text">
                Le format de l&rsquo;email saisi est invalide.
              </p>
        }
        {email === '' && activeMessage &&
              <p id="username-error" className="fr-error-text">
                Veuillez saisir une adresse email.
              </p>
        }
      </div>
      <button onClick={() => setEmail('')}
        disabled={email.length === 0 ? 'disabled' : ''}
        className="fr-btn"
      >
            Annuler
      </button>
      <button
        style={{ float: 'right' }}
        className="fr-btn"
        onClick={sendInvitation}
        {...!email || !valideInputEmail(email) ? { 'disabled': true } : {}}>
            Envoyer
      </button>
    </>
  );
}

export default Multicompte;
