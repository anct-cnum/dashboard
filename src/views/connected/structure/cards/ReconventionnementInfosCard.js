import React from 'react';
import PropTypes from 'prop-types';

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
          <p className="fr-card__desc fr-text--lg fr-text--regular">Date de d&eacute;but : 28/02/2023</p>
          <div className="fr-card__desc">
            <p className="fr-text--md fr-text--bold" style={{ color: '#000091' }}>
              {structure?.conventionnement?.dossierReconventionnement?.nbPostesAttribues} postes de conseillers{' '}
              {structure?.conventionnement?.statut === 'RECONVENTIONNEMENT_VALIDÉ' ? (
                <span className="fr-text--regular fr-text--md">valid&eacute; pour ce conventionnement</span>
              ) : (
                <span className="fr-text--regular fr-text--md">demand&eacute;s pour ce conventionnement</span>
              )}
            </p>
            <div className="fr-col-12 fr-mt-1w">
              <hr style={{ borderWidth: '0.5px' }} />
            </div>
            <p className="fr-text--md fr-text--bold" style={{ color: '#000091' }}>
              Avenant - 2 postes de conseillers vacants <span className="fr-text--regular fr-text--md">rendu le 00/00/0000</span>
            </p>
            <div className="fr-col-12 fr-my-1w">
              <hr style={{ borderWidth: '0.5px' }} />
            </div>
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
