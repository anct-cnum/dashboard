import React from 'react';
import {
  CompleteRequestBanner,
  InProgressBanner,
  ValidatedBanner,
  DeniedBanner,
  ValidatedAvenantBanner,
  ValidatedRenouvellementBanner,
  InProgressAvenantBanner,
  RequestBanner
} from '../banners/index';
import propTypes from 'prop-types';
import { StatutConventionnement } from '../../../../utils/enumUtils';

const Banners = ({
  structure,
  roleActivated,
  conseillersActifs,
  showValidateBanner,
  setShowValidateBanner,
  openModal,
  setOpenModal,
  bannieresRenouvellementValide,
  setBannieresRenouvellementValide,
}) => {
  let reconventionnementBannerComponent = null;

  switch (structure?.conventionnement?.statut) {
    case StatutConventionnement.RECONVENTIONNEMENT_INITIÉ:
      reconventionnementBannerComponent = <CompleteRequestBanner structure={structure} />;
      break;
    case StatutConventionnement.RECONVENTIONNEMENT_EN_COURS:
      reconventionnementBannerComponent = <InProgressBanner structure={structure} roleActivated={roleActivated} />;
      break;
    case StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ:
      reconventionnementBannerComponent = showValidateBanner && (
        <ValidatedBanner
          structure={structure}
          conseillersActifs={conseillersActifs}
          setShowValidateBanner={setShowValidateBanner}
        />
      );
      break;
    case StatutConventionnement.CONVENTIONNEMENT_VALIDÉ:
      reconventionnementBannerComponent = <RequestBanner openModal={openModal} setOpenModal={setOpenModal} />;
      break;
    case StatutConventionnement.RECONVENTIONNEMENT_REFUSÉ:
      reconventionnementBannerComponent = showValidateBanner && (
        <DeniedBanner structure={structure} setShowValidateBanner={setShowValidateBanner} />
      );
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

  return (
    <>
      {reconventionnementBannerComponent}
      {inProgressAvenantBannerComponent}
      {validatedAvenantBannerComponent}
      {ValidatedRenouvellementBannerComponent}
    </>
  );
};


Banners.propTypes = {
  structure: propTypes.object,
  conseillersActifs: propTypes.array,
  showValidateBanner: propTypes.bool,
  setShowValidateBanner: propTypes.func,
  openModal: propTypes.bool,
  setOpenModal: propTypes.func,
  roleActivated: propTypes.string,
  bannieresRenouvellementValide: propTypes.array,
  setBannieresRenouvellementValide: propTypes.func,
  setBannerCount: propTypes.func,
};
export default Banners;
