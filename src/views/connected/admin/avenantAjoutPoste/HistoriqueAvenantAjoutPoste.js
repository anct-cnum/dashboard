import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

function HistoriqueAvenantAjoutPoste({ avenant, typeConvention }) {
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
        {avenant?.dateDeLaDemande ?
          <span>{dayjs(avenant.dateDeLaDemande).format('DD/MM/YYYY')}</span> :
          <span>Non renseign&eacute;e</span>
        }
      </td>
      <td>
        {avenant?.dateDeCoselec ?
          <span>{dayjs(avenant.dateDeCoselec).format('DD/MM/YYYY')}</span> :
          <span>Non renseign&eacute;e</span>
        }
      </td>
      <td>{avenant?.nombreDePostesAccordes ?? '-'}</td>
      <td style={{ width: '13rem' }}>Avenant · ajout de poste</td>
      {typeConvention === 'avenantAjoutPoste' && <td style={{ width: '13rem' }}>{formatAvisPrefet(avenant?.prefet?.avis)}</td>}
      <td>
        <Link className="fr-btn fr-icon-eye-line fr-btn--icon-left" to={{
          pathname: `/${roleActivated}/demandes/convention/${avenant?.idStructure}`,
          search: `?type=avenant-ajout-poste&demande=${avenant?.id}`,
        }}
        state={{ 'origin': `/${roleActivated}/historique/demandes/conventions`, typeConvention }}>
          D&eacute;tails
        </Link>
      </td>
    </>
  );
}

HistoriqueAvenantAjoutPoste.propTypes = {
  avenant: PropTypes.object,
  typeConvention: PropTypes.string,
};

export default HistoriqueAvenantAjoutPoste;
