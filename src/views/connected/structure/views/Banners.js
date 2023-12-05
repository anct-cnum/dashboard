import React from 'react';
import {
  CompleteRequestBanner,
  ValidatedBanner,
  ValidatedAvenantBanner,
  ValidatedRenouvellementBanner,
  InProgressAvenantBanner,
  RequestBanner,
  RefusRecrutementBanner
} from '../banners/index';
import propTypes from 'prop-types';
import { StatutConventionnement } from '../../../../utils/enumUtils';
import ValidatedRoleCoordoBanner from '../banners/ValidatedRoleCoordoBanner';

const Banners = ({
  structure,
  roleActivated,
  openModal,
  setOpenModal,
  bannieresRenouvellementValide,
  bannieresAjoutRoleCoordinateur,
  setBannieresAjoutRoleCoordinateur,
  setBannieresRenouvellementValide,
  misesEnRelation,
}) => {
  let reconventionnementBannerComponent = null;
  switch (structure?.conventionnement?.statut) {
    case StatutConventionnement.RECONVENTIONNEMENT_INITIÉ:
      reconventionnementBannerComponent = <CompleteRequestBanner structure={structure} />;
      break;
    case StatutConventionnement.CONVENTIONNEMENT_VALIDÉ:
      reconventionnementBannerComponent = <RequestBanner openModal={openModal} setOpenModal={setOpenModal} />;
      break;
    default:
      break;
  }

  const inProgressAvenantBannerComponent =
    structure?.lastDemandeCoselec?.statut === 'en_cours' && (
      <InProgressAvenantBanner structure={structure} roleActivated={roleActivated} />
    );

  const validatedAvenantBannerComponent = structure?.lastDemandeCoselec?.banniereValidationAvenant && (
    <ValidatedAvenantBanner
      structure={structure}
    />
  );

  const validatedReconventionnementBannerComponent = structure?.conventionnement?.dossierReconventionnement?.banniereValidation && (
    <ValidatedBanner
      structure={structure}
    />
  );

  const ValidatedRenouvellementBannerComponent = bannieresRenouvellementValide?.length > 0 &&
    bannieresRenouvellementValide?.map(conseiller => {
      return (
        <ValidatedRenouvellementBanner
          structure={structure}
          key={conseiller._id}
          conseiller={conseiller}
          setBannieresRenouvellementValide={setBannieresRenouvellementValide}
          bannieresRenouvellementValide={bannieresRenouvellementValide}
        />
      );
    });

  const validatedAjoutRoleCoordinateurBannerComponent = bannieresAjoutRoleCoordinateur?.length > 0 &&
    bannieresAjoutRoleCoordinateur?.map(conseiller => {
      return (
        <ValidatedRoleCoordoBanner
          structure={structure}
          key={conseiller._id}
          conseiller={conseiller}
          setBannieresAjoutRoleCoordinateur={setBannieresAjoutRoleCoordinateur}
          bannieresAjoutRoleCoordinateur={bannieresAjoutRoleCoordinateur}
        />
      );
    }
    );

  const refusRecrutementBannerComponent = misesEnRelation?.filter(i => i.banniereRefusRecrutement === true)?.length > 0 &&
    misesEnRelation.filter(i => i.banniereRefusRecrutement === true)?.map(conseiller => {
      return (
        <RefusRecrutementBanner
          key={conseiller._id}
          conseiller={conseiller}
          structure={structure}
        />
      );
    }
    );

  return (
    <>
      {reconventionnementBannerComponent}
      {inProgressAvenantBannerComponent}
      {validatedAvenantBannerComponent}
      {ValidatedRenouvellementBannerComponent}
      {validatedReconventionnementBannerComponent}
      {validatedAjoutRoleCoordinateurBannerComponent}
      {refusRecrutementBannerComponent}
    </>
  );
};


Banners.propTypes = {
  structure: propTypes.object,
  openModal: propTypes.bool,
  setOpenModal: propTypes.func,
  roleActivated: propTypes.string,
  bannieresRenouvellementValide: propTypes.array,
  setBannieresRenouvellementValide: propTypes.func,
  bannieresAjoutRoleCoordinateur: propTypes.array,
  setBannieresAjoutRoleCoordinateur: propTypes.func,
  misesEnRelation: propTypes.array,
};
export default Banners;
