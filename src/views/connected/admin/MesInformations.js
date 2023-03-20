import React from 'react';
import { useSelector } from 'react-redux';
import Invitation from './invitation';
import Spinner from '../../../components/Spinner';
import ContactCard from '../../../components/cards/ContactCards';

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
          <ContactCard email={userAuth.name}/>
          <div className="fr-col-offset-12"></div>
          <div className="fr-card fr-col-8 fr-col-lg-8 fr-col-md-8">
            <h4>Inviter un administrateur</h4>
            <Invitation />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MesInformations;
