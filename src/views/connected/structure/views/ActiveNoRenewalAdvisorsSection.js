import React from 'react';
import propTypes from 'prop-types';
import AdvisorCard from '../cards/AdvisorCard';

const ActiveNoRenewalAdvisorsSection = ({ structure, conseillersActifsNonRenouveles, roleActivated }) => {
  return (
    structure?.conventionnement?.statut === 'RECONVENTIONNEMENT_VALIDÉ' && (
      <div className="container fr-mt-4w">
        <h6 className="fr-text--bold">Vos conseillers actifs non renouvel&eacute;s ({conseillersActifsNonRenouveles?.length})</h6>
        {conseillersActifsNonRenouveles?.map((conseiller, idx) => {
          return <AdvisorCard conseiller={conseiller} roleActivated={roleActivated} key={idx} />;
        })}
      </div>
    )
  );
};

export default ActiveNoRenewalAdvisorsSection;

ActiveNoRenewalAdvisorsSection.propTypes = {
  structure: propTypes.object,
  conseiller: propTypes.object,
  roleActivated: propTypes.string,
  setMiseEnrelationId: propTypes.func,
  setOpenModalContrat: propTypes.func,
  handleOpenModalContrat: propTypes.func,
  conseillersActifsNonRenouveles: propTypes.array,
};
