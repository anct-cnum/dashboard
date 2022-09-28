import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../actions';
import { valideInputEmail } from '../../../utils/formatagesUtils';
import { InvitationsActions } from '../../../actions/invitationsActions';
import { Oval } from 'react-loader-spinner';
import { scrollTopWindow } from '../../../utils/exportsUtils';

function MesInformations() {
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.authentication.user);
  const { error, success, loading } = useSelector(state => state.invitations);
  const { entity } = useSelector(state => state.authentication.user);
  const { users, userError } = useSelector(state => state.user);
  const errorUser = useSelector(state => state?.user?.error);
  const [emailUser, setEmailUser] = useState(userAuth.name);
  const [activeMessage, setActiveMessage] = useState(false);
  const [flashMessage, setFlashMessage] = useState(false);
  const [form, setForm] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (entity) {
      dispatch(userActions.usersByStructure());
    }
  }, [entity]);

  const handleForm = event => setEmailUser(event.target.value.trim());
  
  const updateEmail = () => {
    if (valideInputEmail(email)) {
      dispatch(userActions.updateUserEmail({ id: userAuth._id, newEmail: email }));
      setForm(false);
      setFlashMessage(true);
      setTimeout(() => {
        setFlashMessage(false);
      }, 10000);
    } else {
      dispatch(userActions.inputEmailNotValid(email));
      setFlashMessage(true);
      setTimeout(() => {
        setFlashMessage(false);
      }, 10000);
    }
  };

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
    <div className="fr-mt-5w fr-mb-5w">
      {flashMessage === true ?
        <div>
          {(errorUser === undefined || errorUser === false) &&
          <div className="fr-alert fr-alert--success fr-alert--sm fr-mb-4w">
            <p>Un mail de confirmation a &eacute;t&eacute; envoy&eacute; sur l&rsquo;email <strong style={{ color: 'black' }}>{email}</strong></p>
          </div>
          }
          {(errorUser !== undefined && errorUser !== false) &&
        <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-4w">
          <p>Erreur : {errorUser}</p>
        </div>
          }
        </div> :
        ''
      }
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
      <div className="fr-container">
        <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--left">
          <div className="fr-col fr-col-md-6">
            <h2>Mon compte</h2>
            {form === false ?
              <>
                <p>Email :<strong> {userAuth?.name}</strong></p>
                <button className="fr-btn" onClick={() => setForm(true)}>
            Modifier mon adresse e-mail &ensp;
                  <span style={{ color: 'white' }} className="fr-fi-edit-line" aria-hidden="true" />
                </button>
              </> :
              <div className="">
                <div className="">
                  <label className="fr-label">E-mail</label>
                  <input className="fr-input" type="text" id="text-input-text" name="name" value={emailUser} onChange={handleForm} />
                </div>
                <div className="fr-mt-3w">
                  <button onClick={() => setForm(false)} className="fr-btn">Annuler </button>
                  <button className="fr-btn fr-m-auto" style={{ float: 'right' }} onClick={updateEmail}>Valider</button>
                </div>
              </div>
            }
          </div>
          <div className="fr-col-offset-12"></div>
          <div className="fr-col fr-col-md-6">
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
                       <p key={idx} className={!user.passwordCreated ? 'inactif' : 'actif'}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default MesInformations;
