import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import days from 'dayjs';
import COLORS from '../../../../../src/helpers/colors';

const InProgressBanner = ({ structure, roleActivated }) => {
  const navigate = useNavigate();
  return (
    <div
      className="fr-notice fr-py-4w"
      style={{ position: 'absolute', top: '173px', left: '0%', right: '0%', backgroundColor: COLORS.noticeBackground }}
    >
      <div className="fr-container" style={{ display: 'flex', alignItems: 'center' }}>
        <span className="fr-icon-time-fill" aria-hidden="true" style={{ color: COLORS.noticeIcon }}></span>
        <div className="fr-notice__body fr-grid-row fr-grid-row--middle" style={{ paddingLeft: '20px' }}>
          <div>
            <p className="fr-notice__title" style={{ color: COLORS.noticeTitle }}>
              Vous avez d&eacute;pos&eacute; une demande de reconventionnement le {days(structure?.conventionnement.derniereModification).format('DD/MM/YYYY')}
            </p>
            <p className="fr-text--md" style={{ color: COLORS.noticeText }}>
              Votre demande est en cours de traitement, vous aurez une r&eacute;ponse très prochainement.
            </p>
          </div>
          <div style={{ marginLeft: '16rem' }}>
            <button
              className="fr-btn fr-btn--secondary"
              data-fr-opened="false"
              aria-controls="fr-modal-2"
              onClick={() => navigate(`/${roleActivated}/structure/${structure?._id}`)}
            >
              Voir ma demande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

InProgressBanner.propTypes = {
  structure: PropTypes.object,
  roleActivated: PropTypes.string,
};

export default InProgressBanner;
