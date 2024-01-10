import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

function Conventionnement({ conventionnement, typeConvention }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const formatAvisPrefet = avisPrefet => {
    switch (avisPrefet) {
      case 'POSITIF':
        return <div className="square-icone-checkbox"><span className="fr-icon-checkbox-circle-fill" aria-hidden="true" /></div>;
      case 'NEGATIF':
        return <div className="square-icone-close"><span className="fr-icon-close-circle-fill" aria-hidden="true" /></div>;
      default:
        return '';
    }
  };

  return (
    <>
      <td className="uppercase-letter">
        <span className="fr-text--bold">{conventionnement?.nom}</span><br />
        <span>ID {conventionnement?.idPG}</span>
      </td>
      <td>
        {conventionnement?.dateDeCreation ?
          <span>{dayjs(conventionnement?.dateDeCreation).format('DD/MM/YYYY')}</span> :
          <span>Non renseign&eacute;e</span>
        }
      </td>
      <td>{conventionnement?.nombreConseillersCoselec ?? '-'}</td>
      {typeConvention === 'conventionnement' &&
        <td>{formatAvisPrefet(conventionnement?.prefet?.avisPrefet)}</td>
      }
      <td>Conventionnement initial</td>
      <td>
        <Link className="fr-btn fr-icon-eye-line fr-btn--icon-left" to={{
          pathname: `/${roleActivated}/demandes/convention/${conventionnement?._id}`,
          search: `?type=conventionnement`,
        }}
        state={{ 'origin': `/${roleActivated}/demandes/conventions`, typeConvention }}>
          D&eacute;tails
        </Link>
      </td>
    </>
  );
}

Conventionnement.propTypes = {
  conventionnement: PropTypes.object,
  typeConvention: PropTypes.string,
};

export default Conventionnement;
