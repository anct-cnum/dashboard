import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function HistoriqueReconventionnement({ reconventionnement }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  return (
    <>
      <td>{reconventionnement?.idPG}</td>
      <td>{reconventionnement?.siret}</td>
      <td>
        {reconventionnement?.dateDeCreation ?
          <span>{dayjs(reconventionnement?.dateDeCreation).format('DD/MM/YYYY')}</span> :
          <span>Non renseign&eacute;e</span>
        }
      </td>
      <td>{reconventionnement?.nbPostesAvantDemande ?? '-'}</td>
      <td>{reconventionnement?.nbPostesAttribuees ?? '-'}</td>
      <td>{reconventionnement?.variation ?? '-'}</td>
      <td>Reconventionnement</td>
      <td>{reconventionnement?.numero ?? '-'}</td>
      <td>{reconventionnement?.codeDepartement ?? '-'}</td>
      <td>{reconventionnement?.departement ?? '-'}</td>
      <td>{reconventionnement?.region ?? '-'}</td>
      <td>{reconventionnement?.phaseConventionnement ?? '-'}</td>
      <td>
        <button
          className="fr-btn fr-icon-eye-line"
          title="D&eacute;tail"
          onClick={() => window.open(`/${roleActivated}/demandes/convention/${reconventionnement?._id}?type=reconventionnement`)}>
        </button>
      </td>
    </>
  );
}

HistoriqueReconventionnement.propTypes = {
  reconventionnement: PropTypes.object,
};

export default HistoriqueReconventionnement;
