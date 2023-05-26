import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InvitationGrandReseau from './informations/InvitationGrandReseau';
import Spinner from '../../../components/Spinner';
import { alerteEtSpinnerActions } from '../../../actions';
import { scrollTopWindow } from '../../../utils/exportsUtils';
import AccountCard from '../../../components/cards/AccountCard';

function MesInformations() {

  const userAuth = useSelector(state => state.authentication.user);
  const loading = useSelector(state => state.invitations.loading);
  const loadingUserDelete = useSelector(state => state.user?.loading);
  const errorUserDelete = useSelector(state => state.user?.error);
  const deleteSuccess = useSelector(state => state.user?.deleteSuccess);
  const userDeleted = useSelector(state => state.user?.userDeleted);
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
      {errorUserDelete &&
        <div className="fr-alert fr-alert--error" style={{ marginBottom: '2rem' }}>
          <p className="fr-alert__title">
            {errorUserDelete}
          </p>
        </div>
      }
      {deleteSuccess &&
        <div className="fr-alert fr-alert--success" style={{ marginBottom: '2rem' }}>
          <p className="fr-alert__title">
            le compte {userDeleted[0].name} a bien &eacute;t&eacute; supprim&eacute;
          </p>
        </div>
      }
      <Spinner loading={loading || loadingUserDelete} />
      <h2 className="fr-h2" style={{ color: '#000091' }}>Mon profil</h2>
      <div className="fr-grid-row">
        <AccountCard email={userAuth?.name}/>
        <div className="fr-card fr-col-8 fr-mt-3w fr-col-lg-8 fr-col-md-8">
          <div className="fr-card__body fr-p-3w">
            <h4>Inviter un administrateur</h4>
            <InvitationGrandReseau />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MesInformations;
