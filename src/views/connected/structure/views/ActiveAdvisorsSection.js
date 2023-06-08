import React from 'react';
import propTypes from 'prop-types';
import AdvisorCard from '../cards/AdvisorCard';
import { StatutConventionnement } from '../../../../utils/enumUtils';
import { validTypeDeContratWithoutEndDate } from '../../../../utils/formatagesUtils';

const ActiveAdvisorsSection = ({ structure, conseillersActifs, roleActivated }) => {
  const isReconventionnementValide = structure?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ;

  const filterActiveAdvisors = conseiller => {
    if (isReconventionnementValide) {
      return (
        (!validTypeDeContratWithoutEndDate(conseiller?.typeDeContrat) && conseiller?.miseEnRelationConventionnement && conseiller?.statut === 'finalisee') ||
        (validTypeDeContratWithoutEndDate(conseiller?.typeDeContrat) && conseiller?.reconventionnement)
      );
    }

    return true;
  };

  const filteredActiveAdvisors = conseillersActifs?.filter(filterActiveAdvisors) || [];

  return (
    <div className="container fr-mt-4w">
      <p className="fr-text--bold">Vos conseillers actifs ({filteredActiveAdvisors?.length})</p>
      {filteredActiveAdvisors?.map((conseiller, idx) => (
        <AdvisorCard conseiller={conseiller} roleActivated={roleActivated} key={idx} />
      ))}
    </div>
  );
};

export default ActiveAdvisorsSection;

ActiveAdvisorsSection.propTypes = {
  structure: propTypes.object,
  conseillersActifs: propTypes.array,
  roleActivated: propTypes.string,
};
