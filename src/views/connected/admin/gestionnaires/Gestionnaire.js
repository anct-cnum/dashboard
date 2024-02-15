import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { gestionnaireActions } from '../../../../actions';
import FormSuppressionGestionnaire from './FormSuppressionGestionnaire';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import FormSuppressionMultiRoleGestionnaire from './FormSuppressionMultiRoleGestionnnaire';

function Gestionnaire({ gestionnaire }) {
  const dispatch = useDispatch();
  const [confirmSuppressionGestionnaire, setConfirmSuppressionGestionnaire] = useState(false);
  const filtreRole = useSelector(state => state.filtresGestionnaires?.searchRole);
  const rolesGestionnaire = gestionnaire?.roles?.filter(role => role !== 'admin_coop' && role !== 'structure_coop');

  const resendInvitGestionnaire = () => {
    scrollTopWindow();
    dispatch(gestionnaireActions.resendInvitGestionnaire(gestionnaire._id));
  };

  const compteActif = gestionnaire => (gestionnaire?.sub ? 'Oui' : 'Non');

  const displayRoleGestionnaire = () => {
    if (filtreRole !== 'tous') {
      return rolesGestionnaire.filter(role => role === filtreRole);
    }
    return rolesGestionnaire;
  };

  return (
    <>
      <tr>
        <td>{displayRoleGestionnaire()?.join(',\n') || '-'}</td>
        <td>{gestionnaire?.name || '-'}</td>
        <td>{gestionnaire?.reseau || '-'}</td>
        <td>{gestionnaire?.nom || '-'}</td>
        <td>{gestionnaire?.prenom || '-'}</td>
        <td>{gestionnaire?.mailSentDate ? dayjs(gestionnaire?.mailSentDate).format('DD/MM/YYYY') : '-'}</td>
        <td>{compteActif(gestionnaire)}</td>
        <td>
          <button
            className="fr-btn fr-icon-mail-line fr-mb-2w"
            title="Envoyez une invitation"
            onClick={resendInvitGestionnaire}/>
          <button
            className="fr-btn fr-icon-delete-line"
            title="Supprimez le gestionnaire"
            disabled={gestionnaire?.roles?.includes('coordinateur')}
            onClick={() => {
              setConfirmSuppressionGestionnaire(true);
              scrollTopWindow();
            }}/>
          {(confirmSuppressionGestionnaire && rolesGestionnaire.length > 1) &&
            <FormSuppressionMultiRoleGestionnaire
              setConfirmSuppressionGestionnaire={setConfirmSuppressionGestionnaire}
              idGestionnaire={gestionnaire?._id}
              roles={rolesGestionnaire}
            />
          }
          {(confirmSuppressionGestionnaire && rolesGestionnaire.length === 1) &&
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
