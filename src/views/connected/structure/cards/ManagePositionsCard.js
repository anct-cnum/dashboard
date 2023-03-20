import React from 'react';
import PropTypes from 'prop-types';

const ManagePositionsCard = () => {
  return (
    <div className="fr-card fr-card--no-border fr-mb-4w" style={{ backgroundColor: '#E8EDFF' }}>
      <div className="fr-card__body">
        <div className="fr-card__content">
          <div className="fr-grid-row fr-grid-row--middle">
            <h4 className="fr-grid-row fr-grid-row--middle">Conventionnement phase 1</h4>
            <p className="fr-badge fr-badge--warning fr-ml-auto">
              6 JOURS RESTANTS AVANT LA FIN DU PREMIER CONTRAT
            </p>
          </div>
          <p className="fr-card__desc fr-text--lg fr-text--regular">Date de d&eacute;but : 28/02/2023</p>
          <div className="fr-card__desc">
            <p className="fr-text--md fr-text--bold" style={{ color: '#000091' }}>
              4 postes de conseillers{' '}
              <span className="fr-text--regular fr-text--md">valid&eacute; pour ce conventionnement</span>
            </p>
            <div>
              <ul className="fr-btns-group fr-btns-group--inline-md">
                <li>
                  <button className="fr-btn fr-btn--secondary">Ajouter un poste</button>
                </li>
                <li>
                  <button className="fr-btn fr-btn--secondary">Rendre un poste</button>
                </li>
                <li className="fr-ml-auto">
                  <button className="fr-btn">
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
};

export default ManagePositionsCard;
