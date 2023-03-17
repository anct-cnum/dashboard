import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function Conventionnement({ conventionnement }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const dossierConventionnement = conventionnement?.conventionnement.dossierConventionnement;

  return (
    <>
      <td>{conventionnement?.idPG}</td>
      <td>{conventionnement?.nom}</td>
      <td>{dossierConventionnement?.dateDeCreation ? dayjs(dossierConventionnement?.dateDeCreation).format('DD/MM/YYYY') : 'Non renseignée'}</td>
      <td>{conventionnement?.dateFinProchainContrat ? dayjs(conventionnement?.dateFinProchainContrat).format('DD/MM/YYYY') : 'Non renseignée'}</td>
      <td>{conventionnement?.nombreConseillersCoselec}</td>
      <td>Conventionnement</td>
      <td>
        <button
          className="fr-btn"
          title="D&eacute;tail"
          onClick={() => window.open(`/${roleActivated}/demandes/convention/${conventionnement?._id}`)}>
              Voir la demande
        </button>
      </td>
    </>
  );
}

Conventionnement.propTypes = {
  conventionnement: PropTypes.object,
};

export default Conventionnement;
