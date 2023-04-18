import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { formatStatutContrat } from '../../../../utils/formatagesUtils';

function Contrat({ contrat }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  return (
    <>
      <tr>
        <td>{contrat?.structureObj?.idPG}</td>
        <td>{contrat?.structureObj?.nom}</td>
        <td className="uppercase-letter">
          <span className="fr-text--bold">{contrat?.conseillerObj?.nom}&nbsp;</span>
          <span className="fr-text--bold">{contrat?.conseillerObj?.prenom}</span><br/>
          <span>ID {contrat?.conseillerObj?.idPG}</span>
        </td>
        <td>
          {contrat?.dateRecrutement ?
            <span>{dayjs(contrat.dateRecrutement).format('DD/MM/YYYY')}</span> :
            <span>Non renseign&eacute;e</span>
          }
        </td>
        <td>{formatStatutContrat(contrat?.statut)}</td>
        <td>
          <button
            className="fr-btn"
            title="D&eacute;tail"
            onClick={() => window.open(`/${roleActivated}/demandes/contrat/${contrat?._id}`)}>
              Voir la demande
          </button>
        </td>
      </tr>
    </>
  );
}

Contrat.propTypes = {
  contrat: PropTypes.object,
};

export default Contrat;
