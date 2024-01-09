import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function HistoriqueConventionnement({ conventionnement }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  return (
    <>
      <td>{conventionnement?.idPG}</td>
      <td>{conventionnement?.siret}</td>
      <td>
        {conventionnement?.dateDeCreation ?
          <span>{dayjs(conventionnement?.dateDeCreation).format('DD/MM/YYYY')}</span> :
          <span>Non renseign&eacute;e</span>
        }
      </td>
      <td>{conventionnement?.nbPostesAvantDemande ?? '-'}</td>
      <td>{conventionnement?.nombreConseillersCoselec ?? '-'}</td>
      <td>{conventionnement?.variation ?? '-'}</td>
      <td>Conventionnement initial</td>
      <td>{conventionnement?.numero ?? '-'}</td>
      <td>{conventionnement?.codeDepartement ?? '-'}</td>
      <td>{conventionnement?.departement ?? '-'}</td>
      <td>{conventionnement?.region ?? '-'}</td>
      <td>{conventionnement?.phaseConventionnement ?? '-'}</td>
      <td style={{ textAlign: 'right' }}>
        <button
          className="fr-btn fr-icon-eye-line fr-ml-auto"
          title="D&eacute;tail"
          onClick={() => window.open(`/${roleActivated}/demandes/convention/${conventionnement?._id}?type=conventionnement`)}>
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
