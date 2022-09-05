import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Invitation from './invitation';
import { Oval } from 'react-loader-spinner';

export default function Invitations() {
  const error = useSelector(state => state.invitation.errorInvitPrefet);
  const success = useSelector(state => state.invitation?.succesInvitPrefet);
  const loadingAccountPrefet = useSelector(state => state.invitation.loadingAccountPrefet);
  
  return (
    <div className="fr-container fr-my-10w">
      <p>INVITATION DE COMPTE</p>
      {success &&
        <div className="fr-alert fr-alert--success" style={{ marginBottom: '2rem' }} >
          <p className="fr-alert__title">{success}</p>
        </div>
      }
      {error &&
        <div className="fr-alert fr-alert--error" style={{ marginBottom: '2rem' }}>
          <p className="fr-alert__title">{error}</p>
        </div>
      }
      <div className="spinnerCustom">
        <Oval
          height={100}
          width={100}
          color="#060091"
          secondaryColor="white"
          visible={loadingAccountPrefet === true}
        />
      </div>
      <Invitation />
    </div>
  );
}
