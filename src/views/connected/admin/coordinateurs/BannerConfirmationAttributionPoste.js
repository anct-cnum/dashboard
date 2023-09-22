import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { coordinateurActions } from '../../../../actions';

const BannerConfirmationAttributionPoste = ({ coordinateur }) => {
  const dispatch = useDispatch();

  const closeBanner = () => {
    dispatch(coordinateurActions.closeBannerAvisPrefet(coordinateur?.id, coordinateur?.idStructure, 'banniereValidationAvisAdmin'));
  };

  const checkTypeAvisFavorable = () => {
    if (coordinateur?.statut === 'validee') {
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
              L&rsquo;attribution d&rsquo;un poste de coordinateur a &eacute;t&eacute; valid&eacute;
              par le comit&eacute; de s&eacute;lection pour la structure {coordinateur?.nomStructure}.
            </p>
            <p className="fr-text fr-text--sm">
              La structure sera notifi&eacute;e sur son espace.
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

BannerConfirmationAttributionPoste.propTypes = {
  coordinateur: PropTypes.object,
};

export default BannerConfirmationAttributionPoste;
