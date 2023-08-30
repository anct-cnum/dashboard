import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

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
            onClick={() => window.open(`/${roleActivated}/demandes/coordinateur/${coordinateur?.idStructure}?demande=${coordinateur?.id}`)}>
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
