import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { gestionnaireActions } from '../../../../actions';
import FormSuppressionGestionnaire from './FormSuppressionGestionnaire';
import { scrollTopWindow } from '../../../../utils/exportsUtils';

function Gestionnaire({ gestionnaire }) {
  const dispatch = useDispatch();
  const [confirmSuppressionGestionnaire, setConfirmSuppressionGestionnaire] = useState(false);

  const resendInvitGestionnaire = () => {
    scrollTopWindow();
    dispatch(gestionnaireActions.resendInvitGestionnaire(gestionnaire._id));
  };

  const compteActif = gestionnaire => {
    if (gestionnaire?.migrationDashboard) {
      if (gestionnaire?.sub) {
        return 'Oui';
      } else {
        return 'Non';
      }
    }
    if (gestionnaire?.passwordCreated) {
      return 'Oui';
    } else {
      return 'Non';
    }
  };

  return (
    <>
      <tr>
        <td>{gestionnaire?.roles?.join(',') || '-'}</td>
        <td>{gestionnaire?.name || '-'}</td>
        <td>{gestionnaire?.reseau || '-'}</td>
        <td>{gestionnaire?.nom || '-'}</td>
        <td>{gestionnaire?.prenom || '-'}</td>
        <td>{gestionnaire?.tokenCreatedAt ? dayjs(gestionnaire?.tokenCreatedAt).format('DD/MM/YYYY') : '-'}</td>
        <td>{compteActif(gestionnaire)}</td>
        <td>
          <div className="btn-actions-gestionnaires">
            <button
              className="fr-btn fr-icon-mail-line fr-mr-2w"
              title="D&eacute;tail"
              disabled={!(gestionnaire.roles.includes('admin') || gestionnaire.roles.includes('grandReseau')) || !gestionnaire.migrationDashboard}
              onClick={resendInvitGestionnaire}/>
            <button
              className="fr-btn fr-icon-delete-line"
              onClick={() => {
                setConfirmSuppressionGestionnaire(true);
                scrollTopWindow();
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
