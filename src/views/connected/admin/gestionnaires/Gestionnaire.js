import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { gestionnaireActions, alerteEtSpinnerActions } from '../../../../actions';
import FormSuppressionGestionnaire from './FormSuppressionGestionnaire';

function Gestionnaire({ gestionnaire }) {
  const dispatch = useDispatch();
  const [confirmSuppressionGestionnaire, setConfirmSuppressionGestionnaire] = useState(false);

  const resendInvitGestionnaire = () => {
    window.scrollTo(0, 0);
    dispatch(gestionnaireActions.resendInvitGestionnaire(gestionnaire._id));
    dispatch(alerteEtSpinnerActions.getMessageAlerte({
      type: 'success',
      message: 'L\'email d\'invitation a été envoyé !',
      status: null, description: null
    }));
  };

  return (
    <>
      <tr>
        <td>{gestionnaire?.roles.join(',') || '-'}</td>
        <td>{gestionnaire?.name || '-'}</td>
        <td>{gestionnaire?.reseau || '-'}</td>
        <td>{gestionnaire?.nom || '-'}</td>
        <td>{gestionnaire?.prenom || '-'}</td>
        <td>{gestionnaire?.tokenCreatedAt ? dayjs(gestionnaire?.tokenCreatedAt).format('DD/MM/YYYY') : '-'}</td>
        <td>{gestionnaire?.passwordCreated ? 'Oui' : 'Non' || '-'}</td>
        <td>
          <div className="btn-actions-gestionnaires">
            <button
              className="fr-btn fr-icon-mail-line fr-mr-2w"
              title="D&eacute;tail"
              onClick={resendInvitGestionnaire}/>
            <button
              className="fr-btn fr-icon-delete-line delete-gestionnaire"
              onClick={() => {
                setConfirmSuppressionGestionnaire(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}/>
          </div>
          {confirmSuppressionGestionnaire &&
          <FormSuppressionGestionnaire setConfirmSuppressionGestionnaire={setConfirmSuppressionGestionnaire} idGestionnaire={gestionnaire?._id} />
          }
        </td>
      </tr>
    </>
  );
}

Gestionnaire.propTypes = {
  gestionnaire: PropTypes.object,
};

export default Gestionnaire;
