import React from 'react';
import propTypes from 'prop-types';
import EditContractCard from '../cards/EditContractCard';
import CompleteContractCard from '../cards/CompleteContractCard';
import { StatutConventionnement } from '../../../../utils/enumUtils';
import ExtendContractCard from '../cards/ExtendContractCard';
import { CompleteExtendContractCard } from '../cards';
import { getDemandeInitiee, isConventionnementOrReconventionnementValide } from '../utils/functionUtils';

const renderCard = (conseiller, idx, roleActivated, handleOpenModalContrat, structure) => {
  if (conseiller?.reconventionnement && conseiller?.statut !== 'renouvellement_initiee') {
    return (
      <EditContractCard
        conseiller={conseiller}
        roleActivated={roleActivated}
        handleOpenModalContrat={handleOpenModalContrat}
        key={idx}
      />
    );
  } else if (conseiller?.statut === 'renouvellement_initiee') {
    return (
      <CompleteContractCard
        conseiller={conseiller}
        roleActivated={roleActivated}
        handleOpenModalContrat={handleOpenModalContrat}
        structure={structure}
        key={idx}
      />
    );
  } else if (getDemandeInitiee(conseiller)) {
    return (
      <CompleteExtendContractCard
        conseiller={conseiller}
        roleActivated={roleActivated}
        handleOpenModalContrat={handleOpenModalContrat}
        structure={structure}
        key={idx}
      />
    );
  } else if (conseiller?.statut === 'finalisee') {
    return (
      <ExtendContractCard
        conseiller={conseiller}
        roleActivated={roleActivated}
        handleOpenModalContrat={handleOpenModalContrat}
        key={idx}
      />
    );
  }
  return null;
};

const RenewAdvisorsSection = ({
  structure,
  conseillersARenouveler,
  conseillersAProlonger,
  roleActivated,
  handleOpenModalContrat,
}) => {
  return (
    <div className="container fr-mt-4w">
      <h6 className="fr-text--bold">
        Contrats &agrave;{' '}
        {isConventionnementOrReconventionnementValide(structure) ?
          'renouveller' :
          'Prolonger'}
        ({conseillersARenouveler?.length + conseillersAProlonger?.length})
      </h6>
      {structure?.conventionnement?.statut ===
        StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ &&
        conseillersARenouveler?.map((conseiller, idx) =>
          renderCard(
            conseiller,
            idx,
            roleActivated,
            handleOpenModalContrat,
            structure
          )
        )}
      {conseillersAProlonger?.map((conseiller, idx) =>
        renderCard(
          conseiller,
          idx,
          roleActivated,
          handleOpenModalContrat,
          structure
        )
      )}
    </div>
  );
};

export default RenewAdvisorsSection;

RenewAdvisorsSection.propTypes = {
  structure: propTypes.object,
  conseillersARenouveler: propTypes.array,
  conseillersAProlonger: propTypes.array,
  roleActivated: propTypes.string,
  handleOpenModalContrat: propTypes.func,
};
