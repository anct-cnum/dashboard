import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

function HistoriqueContrat({ contrat }) {
  const dateDeLaDemande = contrat => {
    if (contrat?.statut === 'nouvelle_rupture' && contrat?.emetteurRupture?.date) {
      return dayjs(contrat.emetteurRupture.date).format('DD/MM/YYYY');
    }
    if (contrat?.statut === 'renouvellement' && contrat?.emetteurRenouvellement?.date) {
      return dayjs(contrat.emetteurRenouvellement.date).format('DD/MM/YYYY');
    }
    return 'Non renseignée';
  };

  const formatStatutContrat = statut => {
    switch (statut) {
      case 'nouvelle_rupture':
        return 'Rupture de contrat';
      case 'recrutee':
        return 'Recrutement';
      case 'renouvellement':
        return 'Renouvellement';
      default:
        return '';
    }
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
        <td>CDD</td>
        <td>15/02/1998</td>
        <td>15/02/1998</td>
        <td>
          <button
            disabled
            className="fr-btn fr-icon-eye-line"
            title="D&eacute;tail"
            onClick={() => window.open(`/admin/demandes/contrat/${contrat?._id}`)}>
          </button>
        </td>
      </tr>
    </>
  );
}

HistoriqueContrat.propTypes = {
  contrat: PropTypes.object,
};

export default HistoriqueContrat;
