import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { formatStatutContrat } from '../../../../utils/formatagesUtils';

function Contrat({ contrat }) {
  const dateDeLaDemande = contrat => {
    if (contrat?.statut === 'nouvelle_rupture' && contrat?.emetteurRupture?.date) {
      return dayjs(contrat.emetteurRupture.date).format('DD/MM/YYYY');
    }
    if (contrat?.statut === 'renouvellement' && contrat?.emetteurRenouvellement?.date) {
      return dayjs(contrat.emetteurRenouvellement.date).format('DD/MM/YYYY');
    }
    return 'Non renseignée';
  };

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
        <td>{dateDeLaDemande(contrat)}</td>
        <td>{formatStatutContrat(contrat?.statut)}</td>
        <td>
          <button
            disabled
            className="fr-btn"
            title="D&eacute;tail"
            onClick={() => window.open(`/admin/demandes/contrat/${contrat?._id}`)}>
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
