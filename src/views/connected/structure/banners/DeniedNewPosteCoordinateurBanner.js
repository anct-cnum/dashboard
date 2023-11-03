import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { coordinateurActions } from '../../../../actions';

const DeniedNewPosteCoordinateurBanner = ({ idDemandeCoordinateur, idStructure }) => {
  const dispatch = useDispatch();

  function closeBanner() {
    dispatch(coordinateurActions.closeBanner(idDemandeCoordinateur, idStructure, 'banniereInformationAvisStructure'));
  }

  return (
    <div className="fr-notice fr-py-4w banner warning background">
      <div className="fr-container warning responsive__banner">
        <div style={{ display: 'flex', alignItems: 'center' }} className="fr-col-12">
          <span className="fr-icon-info-fill icon__color fr-mr-2w" aria-hidden="true"></span>
          <div>
            <p className="fr-notice__title title__color">
              Votre demande de poste de coordinateur a &eacute;t&eacute; refus&eacute;e.
            </p>
            <p className="fr-text fr-text--sm">
              Pour toutes question, veuillez contacter le service support Conseiller num&eacute;rique
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

DeniedNewPosteCoordinateurBanner.propTypes = {
  idDemandeCoordinateur: PropTypes.string,
  idStructure: PropTypes.string,
};

export default DeniedNewPosteCoordinateurBanner;
