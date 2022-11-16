import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { valideInputEmail } from '../../../../utils/formatagesUtils';
import { InvitationsActions } from '../../../../actions/invitationsActions';
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
    dispatch(InvitationsActions.inviteStructure({ email, structureId: entity['$id'] }));
    setActiveMessage(false);
    scrollTopWindow();
    setTimeout(() => {
      dispatch(InvitationsActions.resetInvitation());
    }, 10000);
  };

  return (
    <>
      <h2>Liste des utilisateurs</h2>
      { !userError && users &&
               <section className="fr-accordion">
                 <h3 className="fr-accordion__title">
                   <button className="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-106">
                     <span>Liste des utilisateurs</span>
                   </button>
                 </h3>
                 <div className="fr-collapse" id="accordion-106">
                   {users.length === 0 && <p>Aucun compte crée.</p>}
                   {users && users.map((user, idx) => {
                     return (
                       <p key={idx} style={!user.passwordCreated ? { color: '#a9a9a9a9' } : {}}
                         title={!user.passwordCreated ? 'Compte inactif pour le moment' : ''} >{user.name}</p>
                     );
                   })
                   }
                 </div>
               </section>
      }
      <div className={`fr-mt-3w fr-input-group ${email && !valideInputEmail(email) && activeMessage ? 'fr-input-group--error' : ''}`}>
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
          onChange={e => setEmail(e.target.value.trim())} />
        {email && !valideInputEmail(email) && activeMessage &&
              <p id="email-prefet-error" className="fr-error-text">
                Le format de l&rsquo;email saisi est invalide.
              </p>
        }
        {email === '' && activeMessage &&
              <p id="username-error" className="fr-error-text">
                Veuillez saisir une adresse mail.
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
    </>
  );
}

export default Multicompte;
