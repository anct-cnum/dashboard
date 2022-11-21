import React from 'react';
import { useSelector } from 'react-redux';
import Invitation from './invitation';
import Spinner from '../../../components/Spinner';

function MesInformations() {
  const userAuth = useSelector(state => state.authentication.user);
  const { error, success, loading } = useSelector(state => state.invitations);

  return (
    <div className="fr-mt-5w fr-mb-5w">
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
      <Spinner loading={loading} />
      <div className="fr-container">
        <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--left">
          <div className="fr-col fr-col-lg-6 fr-col-md-8">
            <h2>Mon compte</h2>
            <p>Email : <b>{userAuth?.name}</b></p>
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
