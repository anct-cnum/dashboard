import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { conventionActions } from '../../../../actions';

const BannerConfirmationRefusCandidature = ({ structure }) => {
  const dispatch = useDispatch();
  const formatAvis = structure?.statut === 'VALIDE_COSELEC' ? 'validée' : 'refusée';
console.log(structure);
  const closeBanner = () => {
    dispatch(conventionActions.closeBanner(structure?.id, 'banniereValidationCoselec'));
  };

  const checkTypeAvis = () => {
    if (structure?.statut === 'VALIDE_COSELEC') {
      return true;
    }
    return false;
  };

  return (
    <div className={`fr-notice fr-py-3w banner ${checkTypeAvis() ? 'success' : 'warning'} background fr-mb-2w`}>
      <div className={`fr-container responsive__banner ${checkTypeAvis() ? 'success' : 'warning'}`}>
        <div style={{ display: 'flex', alignItems: 'center' }} className="fr-col-12">
          <span className="fr-icon-checkbox-fill icon__color fr-mr-2w" aria-hidden="true"></span>
          <div>
            <p className="fr-notice__title title__color">
              L&rsquo;attribution de poste(s) de conseiller(s) a &eacute;t&eacute; {formatAvis} par
              le comit&eacute; de s&eacute;lection pour la structure {structure.nom}.
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

BannerConfirmationRefusCandidature.propTypes = {
  structure: PropTypes.object,
};

export default BannerConfirmationRefusCandidature;
