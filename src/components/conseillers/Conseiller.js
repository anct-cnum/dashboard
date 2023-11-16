import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMatomo } from '@jonkoops/matomo-tracker-react';
import { Tooltip } from 'react-tooltip';
import iconeCoordinateur from '../../assets/icons/icone-coordinateur.svg';

function Conseiller({ conseiller }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const { trackEvent } = useMatomo();

  return (
    <>
      <tr>
        <td>{conseiller?.idPG}</td>
        <td style={{ maxWidth: '6.5rem' }}>{conseiller?.nom}</td>
        <td style={{ maxWidth: '4rem', overflowWrap: 'break-word' }}>{conseiller?.prenom}</td>
        <td style={{ maxWidth: '15rem', overflowWrap: 'break-word' }}>
          <a className="email" href={'mailto:' + conseiller?.address}>
            {conseiller?.address}
          </a>
        </td>
        <td style={{ width: '27rem' }}>{conseiller?.nomStructure}</td>
        <td>
          <svg height="80" width="40">
            <circle cx="10" cy="43" r="8" fill={`${conseiller?.compteCoopActif ? '#18753C' : '#B34000'}`} />
          </svg>
        </td>
        <td className="center-text">
          {conseiller?.rupture}
        </td>
        <td className="center-text">
          { conseiller?.estCoordinateur === true &&
            <>
              <img src={iconeCoordinateur} className="image-coordinateur-list"
                data-tooltip-id={`tooltip-coordinateur${conseiller?.idPG}`} data-tooltip-content="Conseiller numérique Coordinateur"/>
              <Tooltip variant="light" id={`tooltip-coordinateur${conseiller?.idPG}`} className="infobulle" />
            </>
          }
        </td>
        <td>{conseiller?.craCount}</td>
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
    </>
  );
}

Conseiller.propTypes = {
  conseiller: PropTypes.object,
};

export default Conseiller;
