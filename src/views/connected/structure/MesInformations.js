import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, structureActions, alerteEtSpinnerActions } from '../../../actions';
import Spinner from '../../../components/Spinner';

import ContactStructure from './informations/ContactStructure';
import Multicompte from './informations/Multicompte';
import MonCompte from './informations/MonCompte';
import Structure from './informations/Structure';

function MesInformations() {
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.authentication.user);
  const { entity } = useSelector(state => state.authentication.user);
  const { error, success, loading } = useSelector(state => state.invitations);
  const errorUser = useSelector(state => state?.user?.error);
  const [myEmail, setMyEmail] = useState(userAuth.name);
  const [flashMessage, setFlashMessage] = useState(false);
  const structure = useSelector(state => state.structure);
  const errorStructure = useSelector(state => state.structure?.error);

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

  useEffect(() => {
    if (success) { // Partie invitation
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'success',
        message: success,
        status: null, description: null
      }));
    } else if (error) {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: error,
        status: null, description: null
      }));
    }
    if (structure?.flashMessage) { // partie info contact structure
      if (errorStructure !== undefined && errorStructure !== false) {
        dispatch(alerteEtSpinnerActions.getMessageAlerte({
          type: 'error',
          message: 'La mise à jour a échoué, veuillez réessayer plus tard',
          status: null, description: null
        }));
      } else if (errorStructure === undefined || errorStructure === false) {
        dispatch(alerteEtSpinnerActions.getMessageAlerte({
          type: 'success',
          message: 'La mise à jour a été effectuée avec succès',
          status: null, description: null
        }));
      }
    }
    if (flashMessage) { // partie mon compte
      if (errorUser === undefined || errorUser === false) {
        dispatch(alerteEtSpinnerActions.getMessageAlerte({
          type: 'success',
          message: `Un mail de confirmation a été envoyé sur l'email ${myEmail}`,
          status: null, description: null
        }));
      } else if (errorUser !== undefined && errorUser !== false) {
        dispatch(alerteEtSpinnerActions.getMessageAlerte({
          type: 'error',
          message: errorUser,
          status: null, description: null
        }));
      }
    }

  }, [error, success, errorUser, structure?.flashMessage, flashMessage]);

  return (
    <div className="fr-mt-5w fr-mb-5w">
      <Spinner loading={loading} />
      <div className="fr-grid-row">
        <div className="fr-col-12 fr-col-lg-6 fr-col-xl-4 fr-mb-3w fr-mb-lg-0w">
          <MonCompte setFlashMessage={setFlashMessage} myEmail={myEmail} setMyEmail={setMyEmail}/>
        </div>
        <div className="fr-col-12 fr-mb-3w fr-col-lg-6 fr-col-xl-4 fr-mb-lg-0w">
          <Structure/>
        </div>
        <div className="fr-col-12 fr-col-lg-6 fr-col-xl-4 fr-mb-lg-0w">
          <ContactStructure/>
        </div>
        <div className="fr-col-12 fr-col-md-6 fr-col-sm-6">
          <Multicompte/>
        </div>
      </div>
    </div>
  );
}

export default MesInformations;
