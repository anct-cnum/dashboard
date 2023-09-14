import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { coordinateurActions } from '../../../../actions';

const BannerConfirmationAvisPrefet = ({ structure }) => {
  const dispatch = useDispatch();

  const closeBanner = () => {
    dispatch(coordinateurActions.closeBannerAvisPrefet(structure?.id));
  };

  const checkTypeAvisFavorable = () => {
    if (structure?.avisPrefet === 'favorable') {
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
              Un avis {checkTypeAvisFavorable() ? 'favorable' : 'défavorable'} &agrave; &eacute;t&eacute; attribu&eacute; &agrave; {structure?.nom}.
            </p>
            <p className="fr-text fr-text--sm">
              La structure sera notifi&eacute;e apr&egrave;s d&eacute;cision du comit&eacute; de s&eacute;lection.
            </p>
          </div>
          <button
            title="Masquer le message"
            style={{ marginLeft: 'auto' }}
            className="fr-icon-close-line icon__color"
            onClick={closeBanner}></button>
        </div>
      </div>
    </div>
  );
};

BannerConfirmationAvisPrefet.propTypes = {
  structure: PropTypes.object,
};

export default BannerConfirmationAvisPrefet;
