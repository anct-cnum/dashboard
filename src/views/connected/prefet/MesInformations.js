import React from 'react';
import { useSelector } from 'react-redux';

function MesInformations() {

  const userAuth = useSelector(state => state.authentication.user);

  return (
    <div className="fr-mt-5w fr-mb-5w">
      <h2>Mon compte</h2>
      <p>Email : <b>{userAuth?.name}</b></p>
    </div>
  );
}

export default MesInformations;
