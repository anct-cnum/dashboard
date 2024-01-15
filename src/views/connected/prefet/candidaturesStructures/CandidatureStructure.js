import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function CandidatureStructure({ structure }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  const formatAvisPrefet = avisPrefet => {
    switch (avisPrefet) {
      case 'POSITIF':
        return <div className="square-icone-checkbox"><span className="fr-icon-checkbox-circle-fill" aria-hidden="true" /></div>;
      case 'NÉGATIF':
        return <div className="square-icone-close"><span className="fr-icon-close-circle-fill" aria-hidden="true" /></div>;
      default:
        return '';
    }
  };

  return (
    <tr>
      <td className="uppercase-letter">
        <span className="fr-text--bold">{structure?.nom}</span><br />
        <span>ID {structure?.idPG}</span>
      </td>
      <td>{structure?.codePostal}</td>
      <td>{structure?.createdAt ? dayjs(structure.createdAt).format('DD/MM/YYYY') : 'Non renseignée'}</td>
      <td>{formatAvisPrefet(structure?.prefet?.avisPrefet)}</td>
      <td>
        <Link className="fr-btn fr-icon-eye-line fr-btn--icon-left" to={`/${roleActivated}/demandes/conseiller/${structure?._id}`}
          state={{ 'origin': `/${roleActivated}/demandes/conseillers` }}>
          D&eacute;tails
        </Link>
      </td>
    </tr>
  );
}

CandidatureStructure.propTypes = {
  structure: PropTypes.object,
};

export default CandidatureStructure;
