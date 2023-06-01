import React from 'react';
import propTypes from 'prop-types';
import { pluralize } from '../../../../utils/formatagesUtils';
import { StatutConventionnement } from '../../../../utils/enumUtils';
import { Link } from 'react-router-dom';

const HireAdvisorCard = ({ nbreConseillersActifs, structure }) => {
  const isReconventionnement = structure?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ;
  const nbPostesAttribuees = isReconventionnement ? structure?.conventionnement?.dossierReconventionnement?.nbPostesAttribuees :
    structure?.posteValiderCoselec;

  return (
    <div className="fr-card fr-col-12 fr-mt-2w fr-p-3w">
      <div className="fr-card__body fr-p-0">
        <div>
          <div className="fr-grid-row responsive__card" style={{ alignItems: 'center' }}>
            <div className="fr-col-6 card__text">
              <div>
                <span className="fr-text--md fr-text--bold">{`${nbreConseillersActifs}/${nbPostesAttribuees}`}</span>
                <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                  {''}{' '}
                  {pluralize('Poste de conseiller actif', 'Poste de conseiller actif', 'Postes de conseiller actifs', nbreConseillersActifs)}
                </span>
              </div>
            </div>
            <div className="fr-col-6 card__text" style={{ textAlign: 'end' }}>
              <Link className="fr-btn" disabled={nbreConseillersActifs === nbPostesAttribuees} to="/structure/candidats/nouvelle">
                Recruter un conseiller
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
  structure: propTypes.object,
};

export default HireAdvisorCard;
