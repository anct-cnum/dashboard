import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function HistoriqueConventionnement({ conventionnement }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const dossierConventionnement = conventionnement?.conventionnement.dossierConventionnement;

  return (
    <>
      <td>{conventionnement?.idPG}</td>
      <td>{conventionnement?.nom}</td>
      <td>
        {dossierConventionnement?.dateDeCreation ?
          <span>{dayjs(dossierConventionnement?.dateDeCreation).format('DD/MM/YYYY')}</span> :
          <span>Non renseign&eacute;e</span>
        }
      </td>
      <td>{conventionnement?.nombreConseillersCoselec ?? '-'}</td>
      <td>Conventionnement initial</td>
      <td style={{ textAlign: 'right' }}>
        <button
          className="fr-btn fr-icon-eye-line fr-ml-auto"
          title="D&eacute;tail"
          onClick={() => window.open(`/${roleActivated}/demandes/convention/${conventionnement?._id}`)}>
              Voir la demande
        </button>
      </td>
    </>
  );
}

HistoriqueConventionnement.propTypes = {
  conventionnement: PropTypes.object,
};

export default HistoriqueConventionnement;
