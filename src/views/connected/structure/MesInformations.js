import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, structureActions } from '../../../actions';
import { valideInputEmail } from '../../../utils/formatagesUtils';
import dayjs from 'dayjs';
import StructureContactForm from '../../../components/StructureContactForm';
import { InvitationsActions } from '../../../actions/invitationsActions';
import { Oval } from 'react-loader-spinner';
import { scrollTopWindow } from '../../../utils/exportsUtils';

function MesInformations() {
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.authentication.user);
  const { entity } = useSelector(state => state.authentication.user);
  const { error, success, loading } = useSelector(state => state.invitations);
  const errorUser = useSelector(state => state?.user?.error);
  const { users, userError } = useSelector(state => state.user);
  const [formCompte, setFormCompte] = useState(false);
  const [email, setEmail] = useState('');
  const [myEmail, setMyEmail] = useState(userAuth.name);
  const [flashMessage, setFlashMessage] = useState(false);
  const structure = useSelector(state => state.structure);
  const errorStructure = useSelector(state => state.structure?.error);
  const [formInformationContact, setFormInformationContact] = useState(false);
  const [emailUser, setEmailUser] = useState(userAuth.name);
  const [activeMessage, setActiveMessage] = useState(false);

  useEffect(() => {
    if (entity) {
      dispatch(userActions.usersByStructure());
    }
  }, [entity]);

  useEffect(() => {
    if (structure?.flashMessage === true) {
      setTimeout(() => {
        dispatch(structureActions.hiddenMessageError());
      }, 5000);
    }
  }, [structure?.flashMessage]);

  useEffect(() => {
    dispatch(structureActions.get(userAuth?.entity.$id));
  }, []);

  const handleForm = event => setEmailUser(event.target.value.trim());
  const handleFormMyEmail = event => setMyEmail(event.target.value.trim());

  const updateEmail = () => {
    if (valideInputEmail(myEmail)) {
      dispatch(userActions.updateUserEmail({ id: userAuth._id, newEmail: myEmail }));
      setFormCompte(false);
      setFlashMessage(true);
      setTimeout(() => {
        setFlashMessage(false);
      }, 10000);
    } else {
      dispatch(userActions.inputEmailNotValid(myEmail));
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
            <p>Un mail de confirmation a &eacute;t&eacute; envoy&eacute; sur l&rsquo;email <strong style={{ color: 'black' }}>{myEmail}</strong></p>
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
      {structure?.flashMessage === true ?
        <div>
          {(errorStructure === undefined || errorStructure === false) &&
            <div className="fr-alert fr-alert--success fr-alert--sm fr-mb-4w">
              <p>La mise &agrave; jour a &eacute;t&eacute; effectu&eacute;e avec succ&egrave;s</p>
            </div>
          }
          {(errorStructure !== undefined && errorStructure !== false) &&
            <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-4w">
              <p>La mise &agrave; jour a &eacute;chou&eacute;, veuillez r&eacute;essayer plus tard</p>
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
      <div className="fr-grid-row">
        <div className="fr-col-12 fr-col-lg-6 fr-col-xl-4 fr-mb-3w fr-mb-lg-0w">
          <h2>
            Mon compte
          </h2>
          {formCompte === false &&
            <div className="">
              <p>Email : <strong>{userAuth?.name}</strong></p>
              <button className="fr-btn" onClick={() => setFormCompte(true)}>
                Modifier mon adresse e-mail &ensp;
                <span style={{ color: 'white' }} className="fr-fi-edit-line" aria-hidden="true" />
              </button>
            </div>
          }
          {formCompte === true &&
            <>
              <div className="fr-col-lg-9 fr-col-md-10 fr-col-12 fr-my-3w">
                <label className="fr-label">E-mail</label>
                <input className="fr-input" type="text" name="name" value={myEmail} onChange={handleFormMyEmail} />
              </div>
              <div className="fr-col-lg-9 fr-col-md-10 fr-col-12">
                <button onClick={() => setFormCompte(false)} className="fr-btn">Annuler </button>
                <button className="fr-btn fr-m-auto" style={{ float: 'right' }} onClick={updateEmail}>Valider</button>
              </div>
            </>
          }
        </div>
        <div className="fr-col-12 fr-mb-3w fr-col-lg-6 fr-col-xl-4 fr-mb-lg-0w">
          <h2>Structure</h2>
          <p>Nom : <strong>{structure?.structure?.nom}</strong></p>
          <p>Siret : {structure?.structure?.siret}</p>
          <p>Date d&apos;inscription : {dayjs(structure?.structure?.dateDebutMission).format('DD/MM/YYYY')}</p>
          <p>Code Postal : {structure?.structure?.codePostal}</p>
        </div>
        <div className="fr-col-12 fr-col-lg-6 fr-col-xl-4 fr-mb-lg-0w">
          <h2>
            Correspondant principal
          </h2>
          {formInformationContact === false &&
            <div className="">
              <p>Nom : {structure?.structure?.contact?.nom}</p>
              <p>Prénom : {structure?.structure?.contact?.prenom}</p>
              <p>Fonction : {structure?.structure?.contact?.fonction}</p>
              <p>Téléphone : {structure?.structure?.contact?.telephone}</p>
              <div className="fr-mt-5w fr-mb-5w">
                <button className="fr-btn" onClick={() => setFormInformationContact(true)}>
                  Modifier les informations de contact
                  <span className="fr-fi-edit-line fr-ml-4v" aria-hidden="true" />
                </button>
              </div>
            </div>
          }
          {formInformationContact === true &&
            <StructureContactForm structure={structure?.structure} setForm={setFormInformationContact} />
          }
        </div>
        <div className="fr-col-12 fr-col-md-6 fr-col-sm-6">
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
  );
}

export default MesInformations;
