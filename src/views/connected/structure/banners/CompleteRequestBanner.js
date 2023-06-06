import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import days from 'dayjs';

const CompleteRequestBanner = ({ structure }) => {
  const navigate = useNavigate();
  return (
    <div
      className="fr-notice fr-py-3w banner warning background"
      style={{ position: 'absolute', top: '173px', left: '0%', right: '0%' }}
    >
      <div className="fr-container warning responsive__banner">
        <span className="fr-icon-warning-fill icon__color" aria-hidden="true"></span>
        <div className="fr-notice__body responsive__banner" style={{ paddingLeft: '20px' }}>
          <div className="banner__text">
            <p className="fr-notice__title title__color">
              Demande de reconventionnement en cours
            </p>
            <p className="fr-text--md">
              Finalisez votre demande pour lancer le reconventionnement de votre structure
            </p>
            <p className="fr-text--xs">
              Derni&egrave;re modification
              {structure?.conventionnement?.dossierReconventionnement?.dateDerniereModification ?
                ` le ${days(structure.conventionnement.dossierReconventionnement.dateDerniereModification).format('DD/MM/YYYY')}` :
                ' non renseignée'
              }
            </p>
          </div>
          <div className="banner__button">
            <button
              className="fr-btn"
              data-fr-opened="false"
              aria-controls="fr-modal-2"
              onClick={() => navigate('/structure/demande-de-reconventionnement')}
            >
              Compl&eacute;ter ma demande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CompleteRequestBanner.propTypes = {
  structure: PropTypes.object,
  roleActivated: PropTypes.string,
};

export default CompleteRequestBanner;
