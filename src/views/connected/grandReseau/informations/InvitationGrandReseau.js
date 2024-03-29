import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { invitationsActions, userActions, alerteEtSpinnerActions } from '../../../../actions';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { valideInputEmail } from '../../../../utils/formatagesUtils';
import ModalConfirmationSuppressionCompte from './ModalConfirmationSuppresionCompte';

export default function InvitationGrandReseau() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const users = useSelector(state => state.user?.users);
  const reseau = useSelector(state => state.authentication.user?.reseau);

  const [form, setForm] = useState(false);
  const [displayModalDelete, setDisplayModalDelete] = useState(false);
  const [user, setUser] = useState({});
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

  const deleteAccountAdmin = (idUser, email) => {
    setUser({
      _id: idUser,
      email
    });
    setDisplayModalDelete(true);
  };

  const sendInvitation = () => {
    if (!valideInputEmail(email) || nom === '' || prenom === '') {
      setActiveMessage(true);
      return;
    }
    dispatch(invitationsActions.inviteAccountGrandReseau({ reseau, email, nom, prenom }));
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
      {form === false ?
        <div>
          {(!users || users?.length === 0) && <p>Aucun administrateur associ&eacute;</p>}
          <div className="fr-grid-row fr-mb-3w fr-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Email</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {users && users?.map((user, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{user.name} - {user?.sub ? <span>(actif)</span> : <span>(inactif)</span> }</td>
                      <td>
                        <button title="Supprimer" onClick={() => deleteAccountAdmin(user._id, user.name)} className="fr-btn fr-icon-delete-line" />
                      </td>
                    </tr>
                  );
                })
                }
              </tbody>
            </table>
            {displayModalDelete &&
              <ModalConfirmationSuppressionCompte setDisplayModalDelete={setDisplayModalDelete} user={user} />
            }
          </div>
          <button className="fr-btn fr-mt-1w fr-icon-mail-line fr-btn--icon-left" onClick={() => setForm(true)}>
            Inviter un administrateur
          </button>
        </div> :
        <>
          <div className="fr-my-3w">
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
            setNom('');
            setPrenom('');
            setForm(false);
          }}
          disabled={email.length === 0 && nom.length === 0 && prenom.length === 0 ? 'disabled' : ''}
          className="fr-btn fr-btn--secondary"
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
