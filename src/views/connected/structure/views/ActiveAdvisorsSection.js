import React from 'react';
import propTypes from 'prop-types';
import AdvisorCard from '../cards/AdvisorCard';
import { filterActiveAdvisors } from '../utils/functionUtils';

const ActiveAdvisorsSection = ({ structure, conseillersActifs, roleActivated }) => {

  const filteredActiveAdvisors = conseillersActifs?.filter(contrat => filterActiveAdvisors(contrat, structure)) || [];

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
