import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function AvenantRenduPoste({ avenant }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const indexDemandesCoselec = avenant?.demandesCoselec.findIndex(demande => demande.type === 'rendu' && demande.statut === 'en_cours');
  const demandesCoselec = avenant?.demandesCoselec[indexDemandesCoselec];

  return (
    <>
      <td>{avenant?.idPG}</td>
      <td>{avenant?.nom}</td>
      <td>
        {demandesCoselec?.date ?
          <span>{dayjs(demandesCoselec?.date).format('DD/MM/YYYY')}</span> :
          <span>Non renseign&eacute;e</span>
        }
      </td>
      <td>-</td>
      <td>{demandesCoselec?.nombreDePostes ?? '-'}</td>
      <td style={{ width: '13rem' }}>Avenant · poste rendu</td>
      <td>
        <button
          className="fr-btn"
          title="D&eacute;tail"
          onClick={() => window.open(`/${roleActivated}/demandes/convention/${avenant?._id}?type=avenant-rendu-poste&index=${indexDemandesCoselec}`)}>
          Voir la demande
        </button>
      </td>
    </>
  );
}

AvenantRenduPoste.propTypes = {
  avenant: PropTypes.object,
};

export default AvenantRenduPoste;
