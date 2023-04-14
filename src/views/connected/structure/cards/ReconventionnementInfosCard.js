import React from 'react';
import PropTypes from 'prop-types';
import { pluralize } from '../../../../utils/formatagesUtils';
import dayjs from 'dayjs';

const ReconventionnementInfosCard = ({ structure }) => {
  const displayBadge = () => {
    if (structure?.conventionnement?.statut === 'ENREGISTRE') {
      return <p className="fr-badge fr-badge--warning fr-ml-auto">RECONVENTIONNEMENT ENREGISTRE</p>;
    }
    if (structure?.conventionnement?.statut === 'RECONVENTIONNEMENT_EN_COURS') {
      return <p className="fr-badge fr-badge--info fr-ml-auto">CONVENTIONNEMENT EN COURS</p>;
    }
    if (structure?.conventionnement?.statut === 'RECONVENTIONNEMENT_VALIDÉ') {
      return <p className="fr-badge fr-badge--success fr-ml-auto">RECONVENTIONNEMENT VALID&Eacute;</p>;
    }
    return null;
  };

  return (
    <div className="fr-card fr-mb-4w">
      <div className="fr-card__body">
        <div className="fr-card__content">
          <div className="fr-grid-row fr-grid-row--middle">
            <h4 className="fr-grid-row fr-grid-row--middle">Conventionnement phase 2</h4>
            {displayBadge()}
          </div>
          <p className="fr-card__desc fr-text--lg fr-text--regular">Date de d&eacute;but : {
            structure?.conventionnement?.dossierReconventionnement?.dateDeValidation ?
              <span>
              le&nbsp;{dayjs(structure?.conventionnement?.dossierReconventionnement?.dateDeValidation).format('DD/MM/YYYY')}
              </span> :
              <span>
              date inconnue
              </span>
          }</p>
          <div className="fr-card__desc">
            <p className="fr-text--md fr-text--bold" style={{ color: '#000091' }}>
              {
                pluralize(
                  ' poste de conseiller',
                  ' poste de conseiller',
                  ' postes de conseiller',
                  structure?.conventionnement?.dossierReconventionnement?.nbPostesAttribues,
                  true
                )
              }
              {' '}
              {structure?.conventionnement?.statut === 'RECONVENTIONNEMENT_VALIDÉ' ? (
                <span className="fr-text--regular fr-text--md">
                  {
                    pluralize(
                      'validé pour ce conventionnement',
                      'validé pour ce conventionnement',
                      'validés pour ce conventionnement',
                      structure?.conventionnement?.dossierReconventionnement?.nbPostesAttribues,
                    )
                  }
                </span>
              ) : (
                <span className="fr-text--regular fr-text--md">{
                  pluralize(
                    'demandé pour ce conventionnement',
                    'demandé pour ce conventionnement',
                    'demandés pour ce conventionnement',
                    structure?.conventionnement?.dossierReconventionnement?.nbPostesAttribues,
                  )
                }</span>
              )}
            </p>
            <div className="fr-col-12 fr-mt-1w">
              <hr style={{ borderWidth: '0.5px' }} />
            </div>
            <p className="fr-text--md fr-text--bold" style={{ color: '#000091' }}>
              Avenant - - postes de conseiller vacants <span className="fr-text--regular fr-text--md">rendu le -</span>
            </p>
            <div className="fr-col-12 fr-my-1w">
              <hr style={{ borderWidth: '0.5px' }} />
            </div>
            <div>
              <ul className="fr-btns-group fr-btns-group--inline-md">
                <li>
                  <button className="fr-btn fr-btn--secondary" disabled>Ajouter un poste</button>
                </li>
                <li>
                  <button className="fr-btn fr-btn--secondary" disabled>Rendre un poste</button>
                </li>
                <li className="fr-ml-auto">
                  <button className="fr-btn" disabled>
                    <i className="ri-folder-2-line fr-mr-1w"></i>Voir le dossier D&eacute;marche Simplifi&eacute;e
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

ReconventionnementInfosCard.propTypes = {
  positions: PropTypes.array,
  onPositionClick: PropTypes.func,
  structure: PropTypes.object,
};

export default ReconventionnementInfosCard;