import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Coordinateur({ coordinateur }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  const formatAvisPrefet = avisPrefet => {
    switch (avisPrefet) {
      case 'favorable':
        return <div className="square-icone-checkbox"><span className="fr-icon-checkbox-circle-fill" aria-hidden="true" /></div>;
      case 'défavorable':
        return <div className="square-icone-close"><span className="fr-icon-close-circle-fill" aria-hidden="true" /></div>;
      default:
        return '';
    }
  };

  return (
    <tr>
      <td className="uppercase-letter">
        <span className="fr-text--bold">{coordinateur?.nom}</span><br />
        <span>ID {coordinateur?.idPG}</span>
      </td>
      <td>{coordinateur?.codePostal}</td>
      <td>{coordinateur?.dossier?.dateDeCreation ? dayjs(coordinateur.dossier?.dateDeCreation).format('DD/MM/YYYY') : 'Non renseignée'}</td>
      <td>{formatAvisPrefet(coordinateur?.avisPrefet)}</td>
      <td>
        <Link className="fr-btn fr-icon-eye-line fr-btn--icon-left" to={{
          pathname: `/${roleActivated}/demandes/coordinateur/${coordinateur?.idStructure}`,
          search: `?demande=${coordinateur?.id}`,
        }}
        state={{ 'origin': `/${roleActivated}/demandes/coordinateurs` }}>
          D&eacute;tails
        </Link>
      </td>
    </tr>
  );
}

Coordinateur.propTypes = {
  coordinateur: PropTypes.object,
};

export default Coordinateur;
