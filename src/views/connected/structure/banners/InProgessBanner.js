import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import days from 'dayjs';

const InProgressBanner = ({ structure, roleActivated }) => {
  const navigate = useNavigate();
  return (
    <div
      className="fr-notice fr-py-4w banner notice background"
      style={{ position: 'absolute', top: '173px', left: '0%', right: '0%' }}
    >
      <div className="fr-container notice responsive__banner">
        <span className="fr-icon-time-fill icon__color" aria-hidden="true"></span>
        <div className="fr-notice__body responsive__banner" style={{ paddingLeft: '20px' }}>
          <div>
            <p className="fr-notice__title title__color">
              Vous avez d&eacute;pos&eacute; une demande de reconventionnement le {
                structure?.conventionnement.derniereModification ? days(structure?.conventionnement?.derniereModification).format('DD/MM/YYYY') : '-'
              }
            </p>
            <p className="fr-text--md">
              Votre demande est en cours de traitement, vous aurez une r&eacute;ponse tr&egrave;s prochainement.
            </p>
          </div>
          <div className="banner__button_progress">
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
