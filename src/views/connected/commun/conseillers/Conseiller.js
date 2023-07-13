import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMatomo } from '@jonkoops/matomo-tracker-react';

function Conseiller({ conseiller }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const { trackEvent } = useMatomo();
console.log(conseiller.statut);
  return (
    <>
      <tr>
        <td>{conseiller?.idPG}</td>
        <td style={{ maxWidth: '8rem' }}>{conseiller?.nom}</td>
        <td style={{ maxWidth: '8rem' }}>{conseiller?.prenom}</td>
        <td style={{ width: '20rem' }}>
          <a className="email"href={'mailto:' + conseiller?.address}>
            {conseiller?.address}
          </a>
        </td>
        <td style={{ width: '15rem' }}>{conseiller?.nomStructure}</td>
        <td className="center-text">
          {conseiller.rupture}
        </td>
        <td className="center-text">
          {conseiller?.estCoordinateur ? 'Oui' : 'Non' }
        </td>
        <td>{conseiller?.craCount}</td>
        <td>
          {conseiller.statut === 'finalisee' &&
          <button
            className="fr-btn fr-icon-eye-line fr-mb-2w"
            title="D&eacute;tail"
            onClick={() => window.open(`/${roleActivated}/conseiller/${conseiller?._id}`)}/>
          }
          <Link
            onClick={() => trackEvent({ category: 'statistiques-conseillers', action: `click-${roleActivated}` })}
            className="fr-btn fr-icon-line-chart-line"
            title="Statistiques"
            to={`/statistiques-conseiller/${conseiller?._id}`}
            state={{ 'origin': '/liste-conseillers', conseiller }}
          />
        </td>
      </tr>
    </>
  );
}

Conseiller.propTypes = {
  conseiller: PropTypes.object,
};

export default Conseiller;
