import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function Reconventionnement({ reconventionnement }) {
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
      <td>
        {dossierReconventionnement?.dateFinProchainContrat ?
          <span>{dayjs(dossierReconventionnement?.dateFinProchainContrat).format('DD/MM/YYYY')}</span> :
          <span>Non renseign&eacute;e</span>
        }
      </td>
      <td>{dossierReconventionnement?.nbPostesAttribuees ?? '-'}</td>
      <td>Reconventionnement</td>
      <td>
        <button
          className="fr-btn"
          title="D&eacute;tail"
          onClick={() => window.open(`/${roleActivated}/demandes/convention/${reconventionnement?._id}`)}>
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
