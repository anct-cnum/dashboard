import React from 'react';
import propTypes from 'prop-types';
import EditContractCard from '../cards/EditContractCard';
import CompleteContractCard from '../cards/CompleteContractCard';
import { StatutConventionnement } from '../../../../utils/enumUtils';

const renderCard = (conseiller, idx, roleActivated, setMiseEnrelationId, setOpenModalContrat, handleOpenModalContrat, structure) => {
  if (conseiller?.reconventionnement && conseiller?.statut !== 'renouvellement_initiee') {
    return (
      <EditContractCard
        conseiller={conseiller}
        roleActivated={roleActivated}
        setMiseEnrelationId={setMiseEnrelationId}
        setOpenModalContrat={setOpenModalContrat}
        handleOpenModalContrat={handleOpenModalContrat}
        key={idx}
      />
    );
  } else if (conseiller?.statut === 'renouvellement_initiee') {
    return (
      <CompleteContractCard
        conseiller={conseiller}
        roleActivated={roleActivated}
        setOpenModalContrat={setOpenModalContrat}
        handleOpenModalContrat={handleOpenModalContrat}
        structure={structure}
        key={idx}
      />
    );
  }
  return null;
};

const RenewAdvisorsSection = ({
  structure,
  conseillersARenouveler,
  roleActivated,
  setMiseEnrelationId,
  setOpenModalContrat,
  handleOpenModalContrat,
}) => {
  return (
    structure?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ && (
      <div className="container fr-mt-4w">
        <h6 className="fr-text--bold">Contrats &agrave; renouveller ({conseillersARenouveler?.length})</h6>
        {conseillersARenouveler?.map((conseiller, idx) =>
          renderCard(conseiller, idx, roleActivated, setMiseEnrelationId, setOpenModalContrat, handleOpenModalContrat, structure)
        )}
      </div>
    )
  );
};

export default RenewAdvisorsSection;

RenewAdvisorsSection.propTypes = {
  structure: propTypes.object,
  conseillersARenouveler: propTypes.array,
  roleActivated: propTypes.string,
  setMiseEnrelationId: propTypes.func,
  setOpenModalContrat: propTypes.func,
  handleOpenModalContrat: propTypes.func,
};
