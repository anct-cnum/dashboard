import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

function HistoriqueReconventionnement({ reconventionnement, typeConvention }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  return (
    <>
      <td className="uppercase-letter">
        <span className="fr-text--bold">{reconventionnement?.nom}</span><br />
        <span>ID {reconventionnement?.idPG}</span>
      </td>
      <td>
        {reconventionnement?.dateDeCreation ?
          <span>{dayjs(reconventionnement?.dateDeCreation).format('DD/MM/YYYY')}</span> :
          <span>Non renseign&eacute;e</span>
        }
      </td>
      <td>{reconventionnement?.nbPostesAttribuees ?? '-'}</td>
      <td>Reconventionnement</td>
      <td>
        <Link className="fr-btn fr-icon-eye-line fr-btn--icon-left" to={{
          pathname: `/${roleActivated}/demandes/convention/${reconventionnement?._id}`,
          search: `?type=reconventionnement`,
        }}
        state={{ 'origin': `/${roleActivated}/historique/demandes/conventions`, typeConvention }}>
          D&eacute;tails
        </Link>
      </td>
    </>
  );
}

HistoriqueReconventionnement.propTypes = {
  reconventionnement: PropTypes.object,
  typeConvention: PropTypes.string,
};

export default HistoriqueReconventionnement;
