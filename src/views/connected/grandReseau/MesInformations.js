import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InvitationGrandReseau from './informations/InvitationGrandReseau';
import Spinner from '../../../components/Spinner';
import { alerteEtSpinnerActions } from '../../../actions';
import { scrollTopWindow } from '../../../utils/exportsUtils';

function MesInformations() {

  const userAuth = useSelector(state => state.authentication.user);
  const loading = useSelector(state => state.invitations.loading);
  const success = useSelector(state => state.invitations.success);
  const error = useSelector(state => state.invitations.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      scrollTopWindow();
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'success',
        message: success,
        status: null, description: null
      }));
    } else if (error) {
      scrollTopWindow();
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: error,
        status: null, description: null
      }));
    }
  }, [error, success]);

  return (
    <div className="fr-mt-5w fr-mb-5w">
      <Spinner loading={loading} />
      <div className="fr-grid-row">
        <div className="fr-col-12 fr-col-lg-6 fr-col-xl-6 fr-mb-3w fr-mb-lg-0w">
          <h2>Mon compte</h2>
          <p>Email : <b>{userAuth?.name}</b></p>
        </div>
        <div className="fr-col-12 fr-col-md-6 fr-col-sm-6">
          <InvitationGrandReseau />
        </div>
      </div>
    </div>
  );
}

export default MesInformations;
