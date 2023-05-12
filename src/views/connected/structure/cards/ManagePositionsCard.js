import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { pluralize } from '../../../../utils/formatagesUtils';

const ManagePositionsCard = ({ structure }) => {

  const isReconventionnement = structure?.conventionnement?.statut === 'RECONVENTIONNEMENT_VALIDÉ';
  const dossier = isReconventionnement ? structure?.conventionnement?.dossierReconventionnement : structure?.conventionnement?.dossierConventionnement;
  const urlDossier = isReconventionnement ? structure?.urlDossierReconventionnement : structure?.urlDossierConventionnement;
  const phase = isReconventionnement ? 'Conventionnement phase 2' : 'Conventionnement phase 1';

  return (
    <div className="fr-card fr-card--no-border fr-mb-4w" style={{ backgroundColor: '#E8EDFF' }}>
      <div className="fr-card__body">
        <div className="fr-card__content">
          <div className="fr-grid-row fr-grid-row--middle">
            <h4 className="fr-grid-row fr-grid-row--middle">{phase}</h4>
            <p className="fr-badge fr-badge--warning fr-ml-auto">
              - JOURS RESTANTS AVANT LA FIN DU PREMIER CONTRAT
            </p>
          </div>
          <p className="fr-card__desc fr-text--lg fr-text--regular">Date de d&eacute;but : {
            dossier?.dateDeValidation ?
              <span>
              le&nbsp;{dayjs(dossier?.dateDeValidation).format('DD/MM/YYYY')}
              </span> :
              <span>
              date inconnue
              </span>
          }</p>
          <div className="fr-card__desc">
            <p className="fr-text--md fr-text--bold" style={{ color: '#000091' }}>
              {structure?.coselec[0]?.nombreConseillersCoselec} - {pluralize(
                'poste de conseiller',
                'poste de conseiller',
                'postes de conseiller',
                structure?.coselec[0]?.nombreConseillersCoselec
              )}
              {' '}
              <span className="fr-text--regular fr-text--md">
                {pluralize(
                  'validé pour ce conventionnement',
                  'validé pour ce conventionnement',
                  'validés pour ce conventionnement',
                  structure?.coselec[0]?.nombreConseillersCoselec
                )}
              </span>
            </p>
            <div>
              <ul className="fr-btns-group fr-btns-group--inline-md">
                <li>
                  <button className="fr-btn fr-btn--secondary" disabled>Ajouter un poste</button>
                </li>
                <li>
                  <button className="fr-btn fr-btn--secondary" disabled>Rendre un poste</button>
                </li>
                <li className="fr-ml-auto">
                  <button className="fr-btn" onClick={
                    () => window.open(urlDossier)
                  }>
                    <i className="ri-folder-2-line fr-mr-1w"></i>Voir le dossier D&eacute;marche
                    Simplifi&eacute;e
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


ManagePositionsCard.propTypes = {
  positions: PropTypes.array,
  onPositionClick: PropTypes.func,
  structure: PropTypes.object,
};

export default ManagePositionsCard;
