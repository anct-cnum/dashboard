import React from 'react';
import CompleteRequestBanner from '../banners/CompleteRequestBanner';
import InProgressBanner from '../banners/InProgressBanner';
import ValidatedBanner from '../banners/ValidatedBanner';
import RequestBanner from '../banners/RequestBanner';
import propTypes from 'prop-types';
import { StatutConventionnement } from '../../../../utils/enumUtils';

const ReconventionnementBanner = ({ structure, roleActivated, conseillersActifs, showValidateBanner, setShowValidateBanner, openModal, setOpenModal }) => {
  switch (structure?.conventionnement?.statut) {
    case StatutConventionnement.ENREGISTRÉ:
      return <CompleteRequestBanner structure={structure} />;
    case StatutConventionnement.RECONVENTIONNEMENT_EN_COURS:
      return <InProgressBanner structure={structure} roleActivated={roleActivated} />;
    case StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ:
      return (
        showValidateBanner && (
          <ValidatedBanner
            structure={structure}
            conseillersActifs={conseillersActifs}
            setShowValidateBanner={setShowValidateBanner}
          />
        )
      );
    case StatutConventionnement.CONVENTIONNEMENT_VALIDÉ:
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
