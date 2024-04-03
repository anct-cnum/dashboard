import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { pluralize } from '../../../../utils/formatagesUtils';

function AvenantAjoutPoste({ avenant, typeConvention }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  const formatAvisPrefet = avisPrefet => {
    switch (avisPrefet) {
      case 'favorable':
        return <p className="fr-badge fr-badge--success">favorable</p>;
      case 'défavorable':
        return <p className="fr-badge fr-badge--error">d&eacute;favorable</p>;
      default:
        return '';
    }
  };

  return (
    <>
      <td className="uppercase-letter">
        <span className="fr-text--bold">{avenant?.nom}</span><br />
        <span>ID {avenant?.idPG}</span>
      </td>
      <td>
        {avenant?.emetteurAvenant?.date ?
          <span>{dayjs(avenant.emetteurAvenant.date).format('DD/MM/YYYY')}</span> :
          <span>Non renseign&eacute;e</span>
        }
      </td>
      <td>
        {pluralize(
          'poste',
          'poste',
          'postes',
          avenant?.nombreDePostesSouhaites,
          true
        )}
        {avenant?.prefet?.idStructureTransfert &&
          <>
            &nbsp;(Transfert)
          </>
        }
      </td>
      <td style={{ width: '13rem' }}>Avenant · ajout de poste</td>
      {typeConvention === 'avenantAjoutPoste' && <td style={{ width: '13rem' }}>{formatAvisPrefet(avenant?.prefet?.avis)}</td>}
      <td style={{ textAlign: 'end', width: '25rem', paddingLeft: '0' }}>
        <Link className="fr-btn" to={{
          pathname: `/${roleActivated}/demandes/convention/${avenant?.idStructure}`,
          search: `?type=avenant-ajout-poste&demande=${avenant?.id}`,
        }}
        state={{ 'origin': `/${roleActivated}/demandes/conventions`, typeConvention }}>
          Traiter la demande
        </Link>
      </td>
    </>
  );
}

AvenantAjoutPoste.propTypes = {
  avenant: PropTypes.object,
  typeConvention: PropTypes.string,
};

export default AvenantAjoutPoste;
