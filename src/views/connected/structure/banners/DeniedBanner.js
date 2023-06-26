import React from 'react';
import PropTypes from 'prop-types';
import days from 'dayjs';

const DeniedBanner = ({ structure, setShowValidateBanner }) => {

  function closeBanner() {
    setShowValidateBanner(false);
    localStorage.setItem('bannerClosed', 'true');
  }

  return (
    <div
      className="fr-notice fr-py-4w banner warning background"
    >
      <div className="fr-container warning responsive__banner">
        <span className="fr-icon-error-fill icon__color" aria-hidden="true"></span>
        <div className="fr-notice__body responsive__banner" style={{ paddingLeft: '20px' }}>
          <div>
            <p className="fr-notice__title title__color">
              Vous avez d&eacute;pos&eacute; une demande de reconventionnement
              {structure?.conventionnement?.dossierReconventionnement?.dateDerniereModification ?
                ` le ${days(structure.conventionnement.dossierReconventionnement.dateDerniereModification).format('DD/MM/YYYY')}` :
                ' non renseignée'
              }
            </p>
            <p className="fr-text--md">
            Votre demande &agrave; &eacute;t&eacute; refus&eacute;e.
            </p>
          </div>
        </div>
        <span
          className="fr-icon-close-line banner__button_progress_reconventionnement_denied"
          aria-hidden="true"
          onClick={closeBanner}
        ></span>
      </div>
    </div>
  );
};

DeniedBanner.propTypes = {
  structure: PropTypes.object,
  roleActivated: PropTypes.string,
  setShowValidateBanner: PropTypes.func,
};

export default DeniedBanner;
