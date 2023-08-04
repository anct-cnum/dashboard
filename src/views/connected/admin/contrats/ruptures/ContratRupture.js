import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

function ContratRupture({ contrat }) {

  return (
    <>
      <tr>
        <td>{contrat?.structureObj?.idPG}</td>
        <td>{contrat?.structureObj?.nom}</td>
        <td className="uppercase-letter">
          <span className="fr-text--bold">{contrat?.conseillerObj?.nom}&nbsp;</span>
          <span className="fr-text--bold">{contrat?.conseillerObj?.prenom}</span><br />
          <span>ID {contrat?.conseillerObj?.idPG}</span>
        </td>
        <td>{contrat?.emetteurRupture?.date ? dayjs(contrat.emetteurRupture.date).format('DD/MM/YYYY') : 'Non renseignée'}</td>
        <td>Rupture de contrat</td>
        <td>{contrat?.dossierIncompletRupture ? 'En attente de pièces' : 'Complet'}</td>
        <td>
          <button
            className="fr-btn"
            title="D&eacute;tail"
            onClick={() => window.open(`/admin/demandes/contrat/conseiller/${contrat?.conseillerObj?._id}/${contrat?._id}`)}>
            Voir la demande
          </button>
        </td>
      </tr>
    </>
  );
}

ContratRupture.propTypes = {
  contrat: PropTypes.object,
  statutContrat: PropTypes.string,
};

export default ContratRupture;
