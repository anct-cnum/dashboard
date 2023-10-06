import React from 'react';
import PropTypes from 'prop-types';

const ValidatedBanner = ({ setShowValidateBanner }) => {

  function closeBanner() {
    setShowValidateBanner(false);
    localStorage.setItem('bannerClosed', 'true');
  }

  return (
    <div className="fr-notice fr-py-3w banner success background">
      <div className="fr-container success responsive__banner">
        <div className="fr-notice__body responsive__banner" style={{ paddingLeft: '5px' }}>
          <div>
            <p className="fr-notice__title title__color">
              <span className="fr-icon-checkbox-fill icon__color fr-mr-2w" aria-hidden="true"></span>
              Votre demande de reconventionnement a &eacute;t&eacute; prise en compte.
            </p>
            <p className="fr-text--md" style={{ marginLeft: '41px' }}>
             Ci-dessous, vous pouvez d&eacute;sormais proc&eacute;der &agrave; la saisie
             des contrats de vos conseillers ou aux recrutements de vos futurs conseillers.
            </p>
          </div>
          <div className="banner__button_progress_reconventionnement">
            <button className="fr-icon-close-line" onClick={() => closeBanner()}></button>
          </div>
        </div>
      </div>
    </div>
  );
};

ValidatedBanner.propTypes = {
  setShowValidateBanner: PropTypes.func,
};

export default ValidatedBanner;
