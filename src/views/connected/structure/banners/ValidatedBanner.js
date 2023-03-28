import React from 'react';
import PropTypes from 'prop-types';

const ValidatedBanner = ({ structure }) => {
  return (
    <div
      className="fr-notice fr-py-4w banner success background"
      style={{ position: 'absolute', top: '173px', left: '0%', right: '0%' }}
    >
      <div className="fr-container success responsive__banner">
        <span className="fr-icon-checkbox-fill icon__color" aria-hidden="true"></span>
        <div className="fr-notice__body responsive__banner" style={{ paddingLeft: '20px' }}>
          <div>
            <p className="fr-notice__title title__color">
              Votre demande de reconventionnement a &eacute;t&eacute; accept&eacute; !
            </p>
            <p className="fr-text--md">
              Vous avez {structure?.conventionnement?.dossierReconventionnement?.nbPostesAttribues} postes à pourvoir d&egrave;s &agrave; pr&eacute;sent.
              En savoir plus sur comment recruter vos conseillers.
            </p>
          </div>
          <div className="banner__button">
            <span className="fr-icon-close-line" aria-hidden="true"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

ValidatedBanner.propTypes = {
  structure: PropTypes.object,
};

export default ValidatedBanner;
