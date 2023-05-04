import React from 'react';
import propTypes from 'prop-types';
import EditContractCard from '../cards/EditContractCard';
import CompleteContractCard from '../cards/CompleteContractCard';

const renderCard = (conseiller, idx, roleActivated, setMiseEnrelationId, setOpenModalContrat, handleOpenModalContrat) => {

  if (conseiller?.reconventionnement && conseiller?.statut !== 'renouvellement_initié') {
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
  } else if (conseiller?.statut === 'renouvellement_initié') {
    return (
      <CompleteContractCard
        conseiller={conseiller}
        roleActivated={roleActivated}
        setOpenModalContrat={setOpenModalContrat}
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
  roleActivated,
  setMiseEnrelationId,
  setOpenModalContrat,
  handleOpenModalContrat,
}) => {
  return (
    structure?.conventionnement?.statut === 'RECONVENTIONNEMENT_VALIDÉ' && (
      <div className="container fr-mt-4w">
        <p className="fr-text--bold">Contrats &agrave; renouveller ({conseillersARenouveler?.length})</p>
        {conseillersARenouveler.map((conseiller, idx) =>
          renderCard(conseiller, idx, roleActivated, setMiseEnrelationId, setOpenModalContrat, handleOpenModalContrat)
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
