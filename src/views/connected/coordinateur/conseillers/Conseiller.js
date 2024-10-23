import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMatomo } from '@jonkoops/matomo-tracker-react';
import dayjs from 'dayjs';
import { Tooltip } from 'react-tooltip';
import { getAlertLevel, getGroupText } from '../../structure/utils/functionUtils';

function Conseiller({ conseiller }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const { trackEvent } = useMatomo();

  return (
    <tr>
      <td>{conseiller?.idPG}</td>
      <td style={{ maxWidth: '6.5rem' }}>{conseiller?.nom}</td>
      <td style={{ maxWidth: '7rem', overflowWrap: 'break-word' }}>{conseiller?.prenom}</td>
      <td style={{ width: '27rem' }}>{conseiller?.nomStructure}</td>
      <td style={{ width: '2rem' }}>{conseiller?.codeDepartement}</td>
      <td style={{ width: '7rem' }}>
        {conseiller?.dateDebutDeContrat ?
          dayjs(conseiller.dateDebutDeContrat).format('DD/MM/YYYY') :
          '-'}
      </td>
      <td style={{ width: '7rem' }}>
        {conseiller?.dateFinDeContrat ?
          dayjs(conseiller.dateFinDeContrat).format('DD/MM/YYYY') :
          '-'}
      </td>
      <td style={{ width: '4rem' }}>{conseiller?.craCount}</td>
      <td>
        <button
          className="fr-btn fr-icon-eye-line fr-mb-2w"
          title="D&eacute;tail"
          onClick={() => window.open(`/${roleActivated}/conseiller/${conseiller?._id}`)} />
        <Link
          onClick={() => trackEvent({ category: 'statistiques-conseillers', action: `click-${roleActivated}` })}
          className="fr-btn fr-icon-line-chart-line"
          title="Statistiques"
          to={`/statistiques-conseiller/${conseiller?._id}`}
          state={{ 'origin': `/${roleActivated}/liste-conseillers`, conseiller }}
        />
      </td>
    </tr>
  );
}

Conseiller.propTypes = {
  conseiller: PropTypes.object,
};

export default Conseiller;
