import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, structureActions } from '../../../actions';
import { valideInputEmail } from '../../../utils/formatagesUtils';
import dayjs from 'dayjs';
import StructureContactForm from '../../../components/StructureContactForm';

function MesInformations() {
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.authentication.user);
  const [formCompte, setFormCompte] = useState(false);
  const error = useSelector(state => state?.user?.error);
  const [email, setEmail] = useState(userAuth.name);
  const [flashMessage, setFlashMessage] = useState(false);
  const structure = useSelector(state => state.structure);
  const errorStructure = useSelector(state => state.structure?.error);
  const [formInformationContact, setFormInformationContact] = useState(false);

  const handleForm = event => {
    setEmail(event.target.value);
  };

  const updateEmail = () => {
    if (valideInputEmail(email)) {
      dispatch(userActions.updateUserEmail({ id: userAuth._id, newEmail: email }));
      setFormCompte(false);
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
                <input className="fr-input" type="text" name="name" value={email} onChange={handleForm} />
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
            Informations de contact
          </h2>
          {formInformationContact === false &&
            <div className="">
              <p>Nom : {structure?.structure?.contact?.nom}</p>
              <p>Prénom : {structure?.structure?.contact?.prenom}</p>
              <p>Fonction : {structure?.structure?.contact?.fonction}</p>
              <p>Téléphone : {structure?.structure?.contact?.telephone}</p>
              <div className="fr-mt-5w">
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
      </div>
    </div>
  );
}

export default MesInformations;
