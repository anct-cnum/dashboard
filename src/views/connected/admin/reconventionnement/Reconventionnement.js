import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function Reconventionnement({ reconventionnement }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  return (
    <>
      <td>{reconventionnement?.idPG}</td>
      <td>{reconventionnement?.nom}</td>
      <td>
        {reconventionnement?.dateDeCreation ?
          <span>{dayjs(reconventionnement?.dateDeCreation).format('DD/MM/YYYY')}</span> :
          <span>Non renseign&eacute;e</span>
        }
      </td>
      <td>
        {reconventionnement?.dateFinProchainContrat ?
          <span>{dayjs(reconventionnement?.dateFinProchainContrat).format('DD/MM/YYYY')}</span> :
          <span>Non renseign&eacute;e</span>
        }
      </td>
      <td>{reconventionnement?.nbPostesAttribuees ?? '-'}</td>
      <td>Reconventionnement</td>
      <td>
        <button
          className="fr-btn"
          title="D&eacute;tail"
          onClick={() => window.open(`/${roleActivated}/demandes/convention/${reconventionnement?._id}?type=reconventionnement`)}>
            Voir la demande
        </button>
      </td>
    </>
  );
}

Reconventionnement.propTypes = {
  reconventionnement: PropTypes.object,
};

export default Reconventionnement;
