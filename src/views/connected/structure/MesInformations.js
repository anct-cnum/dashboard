import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, structureActions, alerteEtSpinnerActions } from '../../../actions';
import Spinner from '../../../components/Spinner';
import ContactCard from '../../../components/cards/ContactCards';
import RolesCards from '../../../components/cards/RolesCards';

function MesInformations() {
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.authentication.user);
  const { entity } = useSelector(state => state.authentication.user);
  const { error, success, loading } = useSelector(state => state.invitations);
  const errorUser = useSelector(state => state.user?.error);
  const structure = useSelector(state => state.structure?.structure);
  const errorStructure = useSelector(state => state.structure?.error);
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  useEffect(() => {
    if (entity) {
      dispatch(userActions.getUsers());
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
    dispatch(structureActions.get(userAuth?.entity?.$id));
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

  }, [error, success, errorUser, structure?.flashMessage]);

  return (
    <div className="fr-container">
      <Spinner loading={loading} />
      <ContactCard email={userAuth?.name} structureId={structure?._id}/>
      <RolesCards user={userAuth} reseau={userAuth?.reseau} roles={userAuth?.roles} roleActivated={roleActivated} structure={structure}/>
    </div>
  );
}

export default MesInformations;
