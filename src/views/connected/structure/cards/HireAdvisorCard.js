import React from 'react';

const HireAdvisorCard = () => {
  return (
    <div className="fr-card fr-col-12 fr-mt-2w fr-p-3w">
      <div className="fr-card__body fr-p-0">
        <div>
          <div className="fr-grid-row" style={{ alignItems: 'center' }}>
            <div className="fr-col-3">
              <div>
                <span className="fr-text--md fr-text--bold">3/4 </span>
                <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                  Postes de conseillers actifs
                </span>
              </div>
            </div>
            <div className="fr-col-3 fr-ml-auto" style={{ textAlign: 'end' }}>
              <button className="fr-btn">Recruter un conseiller</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireAdvisorCard;
