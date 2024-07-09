import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function HistoriqueContrat({ contrat, statutContrat }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const isExtended = statutContrat === 'prolongation_initiee' && contrat?.statut === 'finalisee' && contrat?.demandesDeProlongation;

  const dateDeLaDemande = contrat => {
    if (isExtended) {
      const demandeValidee = contrat.demandesDeProlongation?.find(demande => demande.statut === 'validee');
      return dayjs(demandeValidee?.dateDeLaDemande).format('DD/MM/YYYY');
    }
    if (contrat?.statut === 'finalisee_rupture' && contrat?.emetteurRupture?.date) {
      return dayjs(contrat.emetteurRupture.date).format('DD/MM/YYYY');
    }
    if (contrat?.statut === 'renouvelee' && contrat?.emetteurRenouvellement?.date) {
      return dayjs(contrat.emetteurRenouvellement.date).format('DD/MM/YYYY');
    }
    if (contrat?.statut === 'finalisee' && contrat?.emetteurRecrutement?.date) {
      return dayjs(contrat.emetteurRecrutement.date).format('DD/MM/YYYY');
    }
    if (contrat?.statut === 'finalisee' && contrat?.createdAt) {
      return dayjs(contrat.createdAt).format('DD/MM/YYYY');
    }
    return 'Non renseignée';
  };

  const dateFinDeContrat = contrat => {
    if (contrat?.dateRupture) {
      return dayjs(contrat.dateRupture).format('DD/MM/YYYY');
    }
    if (contrat?.dateFinDeContrat) {
      return dayjs(contrat.dateFinDeContrat).format('DD/MM/YYYY');
    }
    return '-';
  };

  const formatStatutContrat = statut => {
    if (isExtended) {
      return 'Prolongation';
    }
    switch (statut) {
      case 'finalisee_rupture':
        return 'Rupture de contrat';
      case 'finalisee':
        return 'Recrutement';
      case 'renouvelee':
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
          <span className="fr-text--bold">{contrat?.conseillerObj?.prenom}</span><br />
          <span>ID {contrat?.conseillerObj?.idPG}</span>
        </td>
        <td>{dateDeLaDemande(contrat)}</td>
        <td>{formatStatutContrat(contrat?.statut)}</td>
        <td style={{ maxWidth: '10rem', overflowWrap: 'break-word' }}>{contrat?.typeDeContrat ?? '-'}</td>
        <td>{contrat?.dateDebutDeContrat ? dayjs(contrat?.dateDebutDeContrat).format('DD/MM/YYYY') : '-'}</td>
        <td>{dateFinDeContrat(contrat)}</td>
        <td>
          {contrat?.statut === 'finalisee' ?
            <Link
              className="fr-btn fr-icon-eye-line"
              state={{ 'origin': `/${roleActivated}/historique/demandes/contrats`, statutContrat }}
              to={`/${roleActivated}/demandes/contrat/candidat/${contrat?.conseillerObj?._id}/${contrat?._id}`}
            >
            </Link> :
            <Link
              className="fr-btn fr-icon-eye-line"
              state={{ 'origin': `/${roleActivated}/historique/demandes/contrats`, statutContrat }}
              to={`/${roleActivated}/demandes/contrat/conseiller/${contrat?.conseillerObj?._id}/${contrat?._id}`}
            >
            </Link>
          }
        </td>
      </tr>
    </>
  );
}

HistoriqueContrat.propTypes = {
  contrat: PropTypes.object,
  statutContrat: PropTypes.string,
};

export default HistoriqueContrat;
