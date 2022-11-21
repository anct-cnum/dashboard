import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import InvitationGrandReseau from './informations/MultiCompte';

function MesInformations() {

  const userAuth = useSelector(state => state.authentication.user);

  return (
    <div className="fr-mt-5w fr-mb-5w">
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
