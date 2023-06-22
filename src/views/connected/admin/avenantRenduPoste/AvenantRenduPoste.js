import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function AvenantRenduPoste({ avenant }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  return (
    <>
      <td>{avenant?.idPG}</td>
      <td>{avenant?.nom}</td>
      <td>
        {avenant?.emetteurAvenant?.date ?
          <span>{dayjs(avenant.emetteurAvenant.date).format('DD/MM/YYYY')}</span> :
          <span>Non renseign&eacute;e</span>
        }
      </td>
      <td>-</td>
      <td>{avenant?.nombreDePostesRendus ?? '-'}</td>
      <td style={{ width: '13rem' }}>Avenant · poste rendu</td>
      <td>
        <button
          className="fr-btn"
          title="D&eacute;tail"
          onClick={() => window.open(`/${roleActivated}/demandes/convention/${avenant?.idStructure}?type=avenant-rendu-poste&demande=${avenant?.id}`)}>
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
