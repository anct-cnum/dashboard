import React from 'react';
import propTypes from 'prop-types';
import { pluralize } from '../../../../utils/formatagesUtils';

const HireAdvisorCard = ({ nbreConseillersActifs, nbPostesAttribuees }) => {
  return (
    <div className="fr-card fr-col-12 fr-mt-2w fr-p-3w">
      <div className="fr-card__body fr-p-0">
        <div>
          <div className="fr-grid-row responsive__card" style={{ alignItems: 'center' }}>
            <div className="fr-col-3 card__text">
              <div>
                <span className="fr-text--md fr-text--bold">{`${nbreConseillersActifs}/${nbPostesAttribuees}`}</span>
                <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                  {''}{' '}
                  {pluralize('Poste de conseiller actif', 'Poste de conseiller actif', 'Postes de conseiller actifs', nbreConseillersActifs)}
                </span>
              </div>
            </div>
            <div className="fr-col-3 fr-ml-auto card__text">
              <button className="fr-btn" disabled>
                Recruter un conseiller
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HireAdvisorCard.propTypes = {
  nbreConseillersActifs: propTypes.number,
  nbPostesAttribuees: propTypes.number,
};

export default HireAdvisorCard;
