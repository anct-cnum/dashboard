import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, structureActions } from '../../../actions';
import Spinner from '../../../components/Spinner';
import AccountCard from '../../../components/cards/AccountCard';
import RolesCards from '../../../components/cards/RolesCards';

function MesInformations() {
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.authentication.user);
  const structure = useSelector(state => state.structure?.structure);
  const loading = useSelector(state => state.structure?.loading);
  const errorStructure = useSelector(state => state.structure?.error);
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  useEffect(() => {
    if (!errorStructure) {
      if (structure?._id !== userAuth?.entity?.$id) {
        dispatch(structureActions.get(userAuth?.entity?.$id));
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'La structure n\'a pas pu être chargé !',
        status: null, description: null
      }));
    }
  }, [errorStructure]);

  return (
    <div className="fr-container">
      <Spinner loading={loading} />
      <h2 className="fr-h2" style={{ color: '#000091' }}>Mon profil</h2>
      <AccountCard email={userAuth?.name} />
      <RolesCards user={userAuth} reseau={userAuth?.reseau} roles={userAuth?.roles} roleActivated={roleActivated} structure={structure} />
    </div>
  );
}

export default MesInformations;
