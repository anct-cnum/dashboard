import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import badgeFavorable from '../../../../assets/icons/badge-favorable.svg';
import badgeDefavorable from '../../../../assets/icons/badge-defavorable.svg';

function Coordinateur({ coordinateur }) {
  const formatAvisPrefet = avisPrefet => {
    switch (avisPrefet) {
      case 'favorable':
        return <img src={badgeFavorable} alt="badge favorable" style={{ height: '30px' }} />;
      case 'défavorable':
        return <img src={badgeDefavorable} alt="badge défavorable" style={{ height: '30px' }} />;
      default:
        return '';
    }
  };

  return (
    <>
      <tr>
        <td className="uppercase-letter">
          <span className="fr-text--bold">{coordinateur?.nom}</span><br />
          <span>ID {coordinateur?.idPG}</span>
        </td>
        <td>{coordinateur?.codePostal}</td>

        <td>{coordinateur?.dossier?.dateDeCreation ? dayjs(coordinateur.dossier?.dateDeCreation).format('DD/MM/YYYY') : 'Non renseignée'}</td>
        <td style={{ paddingTop: '1.32rem' }}>{formatAvisPrefet(coordinateur?.avisPrefet)}</td>
        <td>
          <button
            className="fr-btn fr-icon-eye-line fr-btn--icon-left"
            title="D&eacute;tail"
            onClick={() => window.open(`/admin/demandes/coordinateur/${coordinateur?.idStructure}?demande=${coordinateur?.id}`)}>
            D&eacute;tails
          </button>
        </td>
      </tr>
    </>
  );
}

Coordinateur.propTypes = {
  coordinateur: PropTypes.object,
};

export default Coordinateur;
