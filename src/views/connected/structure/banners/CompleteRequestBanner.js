import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import days from 'dayjs';
import COLORS from '../../../../../src/helpers/colors';

const CompleteRequestBanner = ({ structure }) => {
  const navigate = useNavigate();
  return (
    <div
      className="fr-notice fr-py-3w"
      style={{ position: 'absolute', top: '173px', left: '0%', right: '0%', backgroundColor: COLORS.warningBackground }}
    >
      <div className="fr-container" style={{ display: 'flex', alignItems: 'center' }}>
        <span className="fr-icon-warning-fill" aria-hidden="true" style={{ color: COLORS.warningIcon }}></span>
        <div className="fr-notice__body fr-grid-row fr-grid-row--middle" style={{ paddingLeft: '20px' }}>
          <div>
            <p className="fr-notice__title" style={{ color: COLORS.warningTitle }}>
              Demande de reconventionnement en cours
            </p>
            <p className="fr-text--md" style={{ color: COLORS.warningText }}>
              Finalisez votre demande pour lancer le reconventionnement de votre structure
            </p>
            <p className="fr-text--xs" style={{ color: COLORS.warningText }}>
              Dernière modification le {days(structure?.conventionnement.derniereModification).format('DD/MM/YYYY')}
            </p>
          </div>
          <div style={{ marginLeft: '17.7rem' }}>
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
