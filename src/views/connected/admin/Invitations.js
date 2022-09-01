import React from 'react';
import { useSelector } from 'react-redux';
import Invitation from './invitation';
  
export default function Invitations() {
  
  const roleActivated = useSelector(state => state.authentication.roleActivated);
  // const error = useSelector(state => state.invitation.error);
  // const success = useSelector(state => state.invitation.error);
  return (
    <div className="fr-container fr-my-10w">
      <p>INVITATION DE COMPTE</p>
      <div className="fr-alert fr-alert--success" style={{ marginBottom: '2rem' }}>
        {/* <div className="fr-alert fr-alert--success" style={{ float: 'right', width: '50%' }}> */}
        <p className="fr-alert__title">Succès de l&#39;envoi</p>
        <p>Description</p>
      </div>
      <div className="fr-alert fr-alert--error" style={{ marginBottom: '2rem' }}>
        <p className="fr-alert__title">Erreur : titre du message</p>
        <p>Description</p>
      </div>
      <Invitation />
    </div>
  );
}
