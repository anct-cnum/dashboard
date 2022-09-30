import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { coordinateurActions, userActions } from '../../../actions';
import { valideInputEmail } from '../../../utils/formatagesUtils';

function MesInformations() {
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.authentication.user);
  const [form, setForm] = useState(false);
  const error = useSelector(state => state?.user?.error);
  const [email, setEmail] = useState(userAuth.name);
  const [flashMessage, setFlashMessage] = useState(false);
  const coordinateur = useSelector(state => state.coordinateur);

  const handleForm = event => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    dispatch(coordinateurActions.get(userAuth?.entity.$id));
  }, []);

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

  return (
    <div className="fr-mt-5w fr-mb-5w">
      {flashMessage === true ?
        <div>
          {(error === undefined || error === false) &&
          <div className="fr-alert fr-alert--success fr-alert--sm fr-mb-4w">
            <p>Un mail de confirmation a &eacute;t&eacute; envoy&eacute; sur l&rsquo;email <strong style={{ color: 'black' }}>{email}</strong></p>
          </div>
          }
          {(error !== undefined && error !== false) &&
        <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-4w">
          <p>Erreur : {error}</p>
        </div>
          }
        </div> :
        ''
      }
      <div className="fr-grid-row">
        <div className="fr-col-12 fr-col-lg-6 fr-mb-3w fr-mb-lg-0w">
          <h2>Mon compte</h2>
          {form === false ?
            <>
              <p>Email :<strong> {userAuth?.name}</strong></p>
              {!userAuth.name.includes('@conseiller-numerique.fr') &&
                <button className="fr-btn" onClick={() => setForm(true)}>
                  Modifier mon adresse e-mail &ensp;
                  <span style={{ color: 'white' }} className="fr-fi-edit-line" aria-hidden="true" />
                </button>
              }
            </> :
            <div className="fr-container--fluid">
              <div className="fr-my-3w fr-col-lg-3 fr-col-3 fr-col-sm-8">
                <label className="fr-label">E-mail</label>
                <input className="fr-input" type="text" id="text-input-text" name="name" value={email} onChange={handleForm} />
              </div>
              <div className="fr-col-lg-3 fr-col-3 fr-col-sm-8">
                <button onClick={() => setForm(false)} className="fr-btn">Annuler </button>
                <button className="fr-btn fr-m-auto" style={{ float: 'right' }} onClick={updateEmail}>Valider</button>
              </div>
            </div>
          }
        </div>
        <div className="fr-col-12 fr-mb-3w fr-col-lg-6 fr-mb-lg-0w">
          <h2>Mes informations</h2>
          <p>Nom : <strong>{coordinateur?.coordinateur?.nom}</strong></p>
          <p>Prénom : {coordinateur?.coordinateur?.prenom}</p>
          <p>Téléphone professionnelle : {coordinateur?.coordinateur?.telephonePro}</p>
        </div>
      </div>
    </div>
  );
}

export default MesInformations;
