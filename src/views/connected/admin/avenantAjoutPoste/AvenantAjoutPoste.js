import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function AvenantAjoutPoste({ avenant }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const demandesCoselec = avenant?.demandesCoselec?.find(demande => demande.type === 'ajout' && demande.statut === 'en_cours');

  return (
    <>
      <td>{avenant?.idPG}</td>
      <td>{avenant?.nom}</td>
      <td>
        {demandesCoselec?.emetteurAvenant?.date ?
          <span>{dayjs(demandesCoselec.emetteurAvenant.date).format('DD/MM/YYYY')}</span> :
          <span>Non renseign&eacute;e</span>
        }
      </td>
      <td>-</td>
      <td>{demandesCoselec?.nombreDePostesSouhaites ?? '-'}</td>
      <td style={{ width: '13rem' }}>Avenant · ajout de poste</td>
      <td>
        <button
          className="fr-btn"
          title="D&eacute;tail"
          onClick={() => window.open(`/${roleActivated}/demandes/convention/${avenant?._id}?type=avenant-ajout-poste&demande=${demandesCoselec?.id}`)}>
          Voir la demande
        </button>
      </td>
    </>
  );
}

AvenantAjoutPoste.propTypes = {
  avenant: PropTypes.object,
};

export default AvenantAjoutPoste;
