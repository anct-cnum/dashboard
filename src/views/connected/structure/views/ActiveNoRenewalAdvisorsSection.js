import React from 'react';
import propTypes from 'prop-types';
import AdvisorCard from '../cards/AdvisorCard';
import { StatutConventionnement } from '../../../../utils/enumUtils';

const ActiveNoRenewalAdvisorsSection = ({ structure, conseillersActifsNonRenouveles }) => {
  return (
    structure?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ && (
      <div className="container fr-mt-4w">
        <h6 className="fr-text--bold">Vos conseillers actifs non renouvel&eacute;s ({conseillersActifsNonRenouveles?.length})</h6>
        {conseillersActifsNonRenouveles?.map((conseiller, idx) => {
          return <AdvisorCard conseiller={conseiller} key={idx} />;
        })}
      </div>
    )
  );
};

export default ActiveNoRenewalAdvisorsSection;

ActiveNoRenewalAdvisorsSection.propTypes = {
  structure: propTypes.object,
  conseillersActifsNonRenouveles: propTypes.array,
};
