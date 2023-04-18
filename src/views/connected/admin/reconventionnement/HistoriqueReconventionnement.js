import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function HistoriqueReconventionnement({ reconventionnement }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const dossierReconventionnement = reconventionnement?.conventionnement?.dossierReconventionnement;
  return (
    <>
      <td>{reconventionnement?.idPG}</td>
      <td>{reconventionnement?.nom}</td>
      <td>
        {dossierReconventionnement?.dateDeCreation ?
          <span>{dayjs(dossierReconventionnement?.dateDeCreation).format('DD/MM/YYYY')}</span> :
          <span>Non renseign&eacute;e</span>
        }
      </td>
      <td>{dossierReconventionnement?.nbPostesAttribuees ?? '-'}</td>
      <td>Reconventionnement</td>
      <td>
        <button
          className="fr-btn fr-icon-eye-line"
          title="D&eacute;tail"
          onClick={() => window.open(`/${roleActivated}/demandes/convention/${reconventionnement?._id}`)}>
        </button>
      </td>
    </>
  );
}

HistoriqueReconventionnement.propTypes = {
  reconventionnement: PropTypes.object,
};

export default HistoriqueReconventionnement;
