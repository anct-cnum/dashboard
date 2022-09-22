import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../actions';
import { valideInputEmail } from '../../../utils/formatagesUtils';
import { Oval } from 'react-loader-spinner';
import Invitation from './invitation';

function MesInformations() {
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.authentication.user);
  const [form, setForm] = useState(false);
  const { error, success, loading } = useSelector(state => state.invitations);
  const errorUser = useSelector(state => state?.user?.error);
  const [email, setEmail] = useState(userAuth.name);
  const [flashMessage, setFlashMessage] = useState(false);
  const handleForm = event => {
    setEmail(event.target.value);
  };
  
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
          <div className="fr-col fr-col-lg-6 fr-col-md-8">
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
                  <input className="fr-input" type="text" id="text-input-text" name="name" value={email} onChange={handleForm} />
                </div>
                <div className="fr-mt-3w">
                  <button onClick={() => setForm(false)} className="fr-btn">Annuler </button>
                  <button className="fr-btn fr-m-auto" style={{ float: 'right' }} onClick={updateEmail}>Valider</button>
                </div>
              </div>
            }
          </div>
          <div className="fr-col-offset-12"></div>
          <div className="fr-col fr-col-lg-12 fr-col-md-8">
            <h2>Invitation</h2>
            <Invitation />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MesInformations;
