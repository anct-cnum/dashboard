import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function HistoriqueAvenantAjoutPoste({ avenant, structure }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  return (
    <>
      <td>{structure?.idPG}</td>
      <td>{structure?.nom}</td>
      <td>
        {avenant?.emetteurAvenant?.date ?
          <span>{dayjs(avenant.emetteurAvenant.date).format('DD/MM/YYYY')}</span> :
          <span>Non renseign&eacute;e</span>
        }
      </td>
      <td>{avenant?.nombreDePostesAccordes ?? '-'}</td>
      <td style={{ width: '13rem' }}>Avenant · ajout de poste</td>
      <td>
        <button
          className="fr-btn fr-btn fr-icon-eye-line fr-ml-auto"
          title="D&eacute;tail"
          onClick={() => window.open(`/${roleActivated}/demandes/convention/${structure?._id}?type=avenant-ajout-poste&demande=${avenant?.id}`)}>
        </button>
      </td>
    </>
  );
}

HistoriqueAvenantAjoutPoste.propTypes = {
  avenant: PropTypes.object,
  structure: PropTypes.object,
};

export default HistoriqueAvenantAjoutPoste;
