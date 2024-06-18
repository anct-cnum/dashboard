import React from 'react';
import propTypes from 'prop-types';
import AdvisorCard from '../cards/AdvisorCard';
import { validTypeDeContratWithoutEndDate } from '../../../../utils/formatagesUtils';
import { checkStructurePhase2 } from '../utils/functionUtils';
import { isContractExpiring } from '../../../../utils/calculateUtils';

const ActiveAdvisorsSection = ({ structure, conseillersActifs, roleActivated }) => {

  const isReconventionnementValide = checkStructurePhase2(structure?.conventionnement?.statut);

  const filterActiveAdvisors = conseiller => {
    if (isReconventionnementValide) {
      return (
        (!validTypeDeContratWithoutEndDate(conseiller?.typeDeContrat) &&
        conseiller?.phaseConventionnement &&
        conseiller?.statut === 'finalisee' &&
        !isContractExpiring(conseiller?.dateFinDeContrat)) ||
        (validTypeDeContratWithoutEndDate(conseiller?.typeDeContrat))
      );
    }

    return true;
  };

  const filteredActiveAdvisors = conseillersActifs?.filter(filterActiveAdvisors) || [];

  return (
    filteredActiveAdvisors.length > 0 &&
       <div className="container fr-mt-4w">
         <h6 className="fr-text--bold">Vos conseillers actifs ({filteredActiveAdvisors?.length})</h6>
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
