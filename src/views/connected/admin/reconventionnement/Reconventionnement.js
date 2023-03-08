import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function Reconventionnement({ reconventionnement }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const dossierReconventionnement = reconventionnement?.dossierReconventionnement;
  return (
    <>
      <td>{reconventionnement?.idPG}</td>
      <td>{reconventionnement?.nom}</td>
      <td>
        {dossierReconventionnement?.dateDeCreation ? dayjs(dossierReconventionnement?.dateDeCreation).format('DD/MM/YYYY') : 'Non renseignée'}
      </td>
      <td>
        {dossierReconventionnement?.dateFinProchainContrat ? dayjs(dossierReconventionnement?.dateFinProchainContrat).format('DD/MM/YYYY') : 'Non renseignée'}
      </td>
      <td>{dossierReconventionnement?.nbPostesAttribuees}</td>
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
