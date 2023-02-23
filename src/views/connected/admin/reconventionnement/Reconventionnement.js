import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function Reconventionnement({ reconventionnement }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  return (
    <>
      <tr>
        <td>{reconventionnement?.idPG}</td>
        <td>{reconventionnement?.nomStructure}</td>
        <td>{reconventionnement?.dateDeCreation ? dayjs(reconventionnement?.dateDeCreation).format('DD/MM/YYYY') : 'Non renseignée'}</td>
        <td>{reconventionnement?.dateFinProchainContrat ? dayjs(reconventionnement?.dateFinProchainContrat).format('DD/MM/YYYY') : 'Non renseignée'}</td>
        <td>{reconventionnement?.nbPostesAttribuees}</td>
        <td>{reconventionnement?.type}</td>
        <td>
          <button
            className="fr-btn"
            title="D&eacute;tail"
            onClick={() => window.open(`/${roleActivated}/demandes/convention/${reconventionnement?._id}`)}>
              Voir la demande
          </button>
        </td>
      </tr>
    </>
  );
}

Reconventionnement.propTypes = {
  reconventionnement: PropTypes.object,
};

export default Reconventionnement;
