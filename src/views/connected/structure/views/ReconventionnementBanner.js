import React from 'react';
import CompleteRequestBanner from '../banners/CompleteRequestBanner';
import InProgressBanner from '../banners/InProgressBanner';
import ValidatedBanner from '../banners/ValidatedBanner';
import RequestBanner from '../banners/RequestBanner';
import propTypes from 'prop-types';

const ReconventionnementBanner = ({ structure, roleActivated, conseillersActifs, showValidateBanner, setShowValidateBanner, openModal, setOpenModal }) => {
  switch (structure?.conventionnement?.statut) {
    case 'ENREGISTRÉ':
      return <CompleteRequestBanner openModal={openModal} setOpenModal={setOpenModal} structure={structure}/>;
    case 'RECONVENTIONNEMENT_EN_COURS':
      return <InProgressBanner structure={structure} roleActivated={roleActivated} />;
    case 'RECONVENTIONNEMENT_VALIDÉ':
      return (
        showValidateBanner && (
          <ValidatedBanner
            structure={structure}
            conseillersActifs={conseillersActifs}
            setShowValidateBanner={setShowValidateBanner}
          />
        )
      );
    case 'CONVENTIONNEMENT_VALIDÉ':
      if (structure?.conventionnement?.dossierReconventionnement) {
        return <CompleteRequestBanner openModal={openModal} setOpenModal={setOpenModal} structure={structure}/>;
      }
      return <RequestBanner openModal={openModal} setOpenModal={setOpenModal} />;
    default:
      return null;
  }
};

ReconventionnementBanner.propTypes = {
  structure: propTypes.object,
  conseillersActifs: propTypes.array,
  showValidateBanner: propTypes.bool,
  setShowValidateBanner: propTypes.func,
  openModal: propTypes.bool,
  setOpenModal: propTypes.func,
  roleActivated: propTypes.string,
};

export default ReconventionnementBanner;
