import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

function CandidatureConseiller({ structure, statutDemande }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  const formatAvisPrefet = avisPrefet => {
    switch (avisPrefet) {
      case 'POSITIF':
        return <div className="square-icone-checkbox"><span className="fr-icon-checkbox-circle-fill" aria-hidden="true" /></div>;
      case 'NÉGATIF':
        return <div className="square-icone-close"><span className="fr-icon-close-circle-fill" aria-hidden="true" /></div>;
      default:
        return '';
    }
  };

  return (
    <tr>
      <td className="uppercase-letter">
        <span className="fr-text--bold">{structure?.nom}</span><br />
        <span>ID {structure?.idPG}</span>
      </td>
      <td>{structure?.codePostal}</td>
      <td>{structure?.createdAt ? dayjs(structure.createdAt).format('DD/MM/YYYY') : 'Non renseignée'}</td>
      {statutDemande === 'NOUVELLE' &&
        <td>{structure?.nombreConseillersSouhaites ? structure.nombreConseillersSouhaites : '-'}</td>
      }
      {(statutDemande === 'VALIDATION_COSELEC' || statutDemande === 'REFUS_COSELEC') &&
        <td>{structure?.nombreConseillersCoselec}</td>
      }
      <td>
        <div className="fr-grid-row" style={{ alignItems: 'center' }}>
          {formatAvisPrefet(structure?.prefet?.avisPrefet)}
          {structure?.prefet?.idStructureTransfert &&
            <>
              <div
                className="fr-mt-1w fr-ml-1w"
                data-tooltip-content="Transfert de poste"
                data-tooltip-float="true"
                data-tooltip-id={`tooltip-transfert-poste-${structure?.idPG}`}
              >
                <i className="ri-arrow-left-right-line" style={{ fontSize: '1.9rem' }}></i>
              </div>
              <Tooltip variant="light" id={`tooltip-transfert-poste-${structure?.idPG}`} className="infobulle" />
            </>
          }
        </div>
      </td>
      <td>
        <Link className="fr-btn fr-icon-eye-line fr-btn--icon-left" to={`/${roleActivated}/demandes/conseiller/${structure?._id}`}
          state={{ 'origin': `/${roleActivated}/demandes/conseillers`, statutDemande }}>
          D&eacute;tails
        </Link>
      </td>
    </tr>
  );
}

CandidatureConseiller.propTypes = {
  structure: PropTypes.object,
  statutDemande: PropTypes.string
};

export default CandidatureConseiller;
