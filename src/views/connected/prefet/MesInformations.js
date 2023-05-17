import React from 'react';
import { useSelector } from 'react-redux';
import AccountCard from '../../../components/cards/AccountCard';

function MesInformations() {

  const userAuth = useSelector(state => state.authentication.user);

  return (
    <>
      <h2 className="fr-h2" style={{ color: '#000091' }}>Mon profil</h2>
      <AccountCard email={userAuth?.name}/>
    </>
  );
}

export default MesInformations;
