import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import pinCoordinateur from '../../../../assets/icons/icone-coordinateur.svg';
import { Tooltip } from 'react-tooltip';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getDemandeInitiee } from '../../structure/utils/functionUtils';

function Contrat({ contrat, statutContrat }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const isInitiated = statutContrat === 'prolongation_initiee' && contrat?.statut === 'finalisee' && contrat?.demandesDeProlongation;

  const dateDeLaDemande = contrat => {
    if (isInitiated) {
      const demandeInitiee = getDemandeInitiee(contrat);
      return dayjs(demandeInitiee?.dateDeLaDemande).format('DD/MM/YYYY');
    }
    if (contrat?.statut === 'nouvelle_rupture' && contrat?.emetteurRupture?.date) {
      return dayjs(contrat.emetteurRupture.date).format('DD/MM/YYYY');
    }
    if (contrat?.statut === 'renouvellement_initiee' && contrat?.emetteurRenouvellement?.date) {
      return dayjs(contrat.emetteurRenouvellement.date).format('DD/MM/YYYY');
    }
    if (contrat?.statut === 'recrutee' && contrat?.emetteurRecrutement?.date) {
      return dayjs(contrat.emetteurRecrutement.date).format('DD/MM/YYYY');
    }
    if (contrat?.statut === 'recrutee' && contrat?.createdAt) {
      return dayjs(contrat.createdAt).format('DD/MM/YYYY');
    }
    return 'Non renseignée';
  };

  const formatStatutContrat = (statut, contratCoordinateur) => {
    switch (statut) {
      case 'nouvelle_rupture':
        return <span>Rupture de contrat</span>;
      case 'recrutee':
        return <span className={`${contratCoordinateur ? 'fr-mr-2w' : ''}`}>Recrutement</span>;
      case 'renouvellement_initiee':
        return <span>Renouvellement</span>;
      case 'finalisee':
        return <span>Prolongation</span>;
      default:
        return '';
    }
  };

  return (
    <>
      <tr>
        <td>{contrat?.structureObj?.idPG}</td>
        <td style={{ maxWidth: '12rem', overflowWrap: 'break-word' }}>{contrat?.structureObj?.nom}</td>
        <td style={{ maxWidth: '12rem', overflowWrap: 'break-word' }} className="uppercase-letter">
          <span className="fr-text--bold">{contrat?.conseillerObj?.nom}&nbsp;</span>
          <span className="fr-text--bold">{contrat?.conseillerObj?.prenom}</span><br />
          <span>ID {contrat?.conseillerObj?.idPG}</span>
        </td>
        <td>{dateDeLaDemande(contrat)}</td>
        <td>
          <div className="fr-grid-row" style={{ alignItems: 'center' }}>
            {formatStatutContrat(contrat?.statut, contrat?.contratCoordinateur)}
            {contrat?.contratCoordinateur && contrat?.statut !== 'renouvellement_initiee' &&
              <>
                <div
                  data-tooltip-content="Conseiller numérique coordinateur"
                  data-tooltip-float="true"
                  data-tooltip-id={`tooltip-coordinateur-candidat${contrat?.structureObj?.idPG}`}
                >
                  <img src={pinCoordinateur} alt="icône Conseiller numérique coordinateur" className="fr-mt-1w" style={{ height: '34px' }} />
                </div>
                <Tooltip variant="light" id={`tooltip-coordinateur-candidat${contrat?.structureObj?.idPG}`} className="infobulle" />
              </>
            }
          </div>
        </td>
        <td>
          {contrat?.statut === 'recrutee' ?
            <Link
              className="fr-btn"
              state={{ 'origin': `/${roleActivated}/demandes/contrats`, statutContrat }}
              to={`/admin/demandes/contrat/candidat/${contrat?.conseillerObj?._id}/${contrat?._id}`}
            >
              Voir la demande
            </Link> :
            <Link
              className="fr-btn"
              state={{ 'origin': `/${roleActivated}/demandes/contrats`, statutContrat }}
              to={`/admin/demandes/contrat/conseiller/${contrat?.conseillerObj?._id}/${contrat?._id}`}
            >
              Voir la demande
            </Link>
          }
        </td>
      </tr>
    </>
  );
}

Contrat.propTypes = {
  contrat: PropTypes.object,
  statutContrat: PropTypes.string,
};

export default Contrat;
