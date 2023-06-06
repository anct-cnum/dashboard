import React from 'react';
import propTypes from 'prop-types';
import { pluralize } from '../../../../utils/formatagesUtils';
import { Link } from 'react-router-dom';

const HireAdvisorCard = ({ nbreConseillersActifs, nbreConseillersRenouveler, structure }) => {
  const nbConseillerActifTotal = nbreConseillersActifs + nbreConseillersRenouveler;
  return (
    <div className="fr-card fr-col-12 fr-mt-2w fr-p-3w">
      <div className="fr-card__body fr-p-0">
        <div>
          <div className="fr-grid-row responsive__card" style={{ alignItems: 'center' }}>
            <div className="fr-col-6 card__text">
              <div>
                <span className="fr-text--md fr-text--bold">{`${nbConseillerActifTotal}/${structure?.posteValiderCoselec}`}</span>
                <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                  {''}{' '}
                  {pluralize('Poste de conseiller actif', 'Poste de conseiller actif', 'Postes de conseiller actifs', nbConseillerActifTotal)}
                </span>
              </div>
            </div>
            <div className="fr-col-6 card__text" style={{ textAlign: 'end' }}>
              <Link to="/structure/candidats/nouvelle">
                <button disabled={nbConseillerActifTotal === structure?.posteValiderCoselec} className="fr-btn">
                  Recruter un conseiller
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HireAdvisorCard.propTypes = {
  nbreConseillersActifs: propTypes.number,
  nbreConseillersRenouveler: propTypes.number,
  structure: propTypes.object,
};

export default HireAdvisorCard;
