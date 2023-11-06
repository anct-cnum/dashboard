import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import pinCoordinateur from '../../../../assets/icons/pin-coordinateur.svg';
import { Tooltip } from 'react-tooltip';

function Contrat({ contrat }) {
  const dateDeLaDemande = contrat => {
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
        <td>
          <div className="fr-grid-row" style={{ alignItems: 'center' }}>
            {formatStatutContrat(contrat?.statut, contrat?.contratCoordinateur)}
            {contrat?.contratCoordinateur &&
              <>
                <div
                  data-tooltip-content="Conseiller numérique Coordinateur"
                  data-tooltip-float="true"
                  data-tooltip-id={`tooltip-cnfs-candidat-non-mise-en-relation${contrat?.structureObj?.idPG}`}
                >
                  <img src={pinCoordinateur} alt="logo CNFS" className="fr-mt-1w" style={{ height: '34px' }} />
                </div>
                <Tooltip variant="light" id={`tooltip-cnfs-candidat-non-mise-en-relation${contrat?.structureObj?.idPG}`} className="infobulle" />
              </>
            }
          </div>
        </td>
        <td>
          {contrat?.statut === 'recrutee' ?
            <button
              className="fr-btn"
              title="D&eacute;tail"
              onClick={() => window.open(`/admin/demandes/contrat/candidat/${contrat?.conseillerObj?._id}/${contrat?._id}`)}>
              Voir la demande
            </button> : <button
              className="fr-btn"
              title="D&eacute;tail"
              onClick={() => window.open(`/admin/demandes/contrat/conseiller/${contrat?.conseillerObj?._id}/${contrat?._id}`)}>
              Voir la demande
            </button>
          }
        </td>
      </tr>
    </>
  );
}

Contrat.propTypes = {
  contrat: PropTypes.object,
};

export default Contrat;
