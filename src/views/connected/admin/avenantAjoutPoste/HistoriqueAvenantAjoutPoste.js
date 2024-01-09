import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function HistoriqueAvenantAjoutPoste({ avenant }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  return (
    <>
      <td>{avenant?.idPG}</td>
      <td>{avenant?.siret}</td>
      <td>
        {avenant?.emetteurAvenant?.date ?
          <span>{dayjs(avenant.emetteurAvenant.date).format('DD/MM/YYYY')}</span> :
          <span>Non renseign&eacute;e</span>
        }
      </td>
      <td>{avenant?.nbPostesAvantDemande ?? '-'}</td>
      <td>{avenant?.nbPostesApresDemande ?? '-'}</td>
      <td>{avenant?.variation ?? '-'}</td>
      <td style={{ width: '13rem' }}>Ajout</td>
      <td>{avenant?.numero ?? '-'}</td>
      <td>{avenant?.codeDepartement ?? '-'}</td>
      <td>{avenant?.departement ?? '-'}</td>
      <td>{avenant?.region ?? '-'}</td>
      <td>{avenant?.phaseConventionnement ?? '-'}</td>
      <td>
        <button
          className="fr-btn fr-btn fr-icon-eye-line fr-ml-auto"
          title="D&eacute;tail"
          onClick={() => window.open(`/${roleActivated}/demandes/convention/${avenant?.idStructure}?type=avenant-ajout-poste&demande=${avenant?.id}`)}>
        </button>
      </td>
    </>
  );
}

HistoriqueAvenantAjoutPoste.propTypes = {
  avenant: PropTypes.object,
};

export default HistoriqueAvenantAjoutPoste;
