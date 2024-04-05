import React from 'react';
import PropTypes from 'prop-types';

const BannerConfirmationAvisPrefet = ({ nomStructure, avisPrefet, closeBanner, idDemande }) => {
  const checkTypeAvisFavorable = () => {
    if (avisPrefet === 'favorable') {
      return true;
    }
    return false;
  };

  return (
    <div className={`fr-notice fr-py-3w banner ${checkTypeAvisFavorable() ? 'success' : 'warning'} background fr-mb-2w`}>
      <div className={`fr-container responsive__banner ${checkTypeAvisFavorable() ? 'success' : 'warning'}`}>
        <div style={{ display: 'flex', alignItems: 'center' }} className="fr-col-12">
          <span className="fr-icon-checkbox-fill icon__color fr-mr-2w" aria-hidden="true"></span>
          <div>
            <p className="fr-notice__title title__color">
              Un avis {avisPrefet} a &eacute;t&eacute; attribu&eacute; &agrave; {nomStructure}.
            </p>
            <p className="fr-text fr-text--sm">
              La structure sera notifi&eacute;e apr&egrave;s d&eacute;cision du comit&eacute; de s&eacute;lection.
            </p>
          </div>
          <button
            title="Masquer le message"
            style={{ marginLeft: 'auto' }}
            className="fr-icon-close-line icon__color"
            onClick={() => closeBanner(idDemande)}></button>
        </div>
      </div>
    </div>
  );
};

BannerConfirmationAvisPrefet.propTypes = {
  nomStructure: PropTypes.string,
  avisPrefet: PropTypes.string,
  closeBanner: PropTypes.func,
  idDemande: PropTypes.string,
};

export default BannerConfirmationAvisPrefet;
