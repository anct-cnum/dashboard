import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { pluralize } from '../../../../utils/formatagesUtils';

function Conventionnement({ structure, typeConvention }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const formatAvisPrefet = avisPrefet => {
    switch (avisPrefet) {
      case 'POSITIF':
        return <p className="fr-badge fr-badge--success">favorable</p>;
      case 'NÉGATIF':
        return <p className="fr-badge fr-badge--error">d&eacute;favorable</p>;
      default:
        return '';
    }
  };

  return (
    <>
      <td className="uppercase-letter">
        <span className="fr-text--bold">{structure?.nom}</span><br />
        <span>ID {structure?.idPG}</span>
      </td>
      <td>
        {structure?.createdAt ?
          <span>{dayjs(structure.createdAt).format('DD/MM/YYYY')}</span> :
          <span>Non renseign&eacute;e</span>
        }
      </td>
      <td>{pluralize(
        'poste',
        'poste',
        'postes',
        structure?.nombreConseillersSouhaites ? structure?.nombreConseillersSouhaites : 0,
        true
      )}
      {structure?.prefet?.idStructureTransfert &&
          <>
            &nbsp;(Transfert)
          </>
      }
      </td>
      <td>Conventionnement initial</td>
      {typeConvention === 'conventionnement' &&
        <td>{formatAvisPrefet(structure?.prefet?.avisPrefet)}</td>
      }
      <td style={{ textAlign: 'end', width: '28rem', paddingLeft: '0' }}>
        <Link className="fr-btn" to={{
          pathname: `/${roleActivated}/demandes/convention/${structure?._id}`,
          search: `?type=conventionnement`,
        }}
        state={{ 'origin': `/${roleActivated}/demandes/conventions`, typeConvention }}>
          Traiter la demande
        </Link>
      </td>
    </>
  );
}

Conventionnement.propTypes = {
  structure: PropTypes.object,
  typeConvention: PropTypes.string,
};

export default Conventionnement;
