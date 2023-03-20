import React from 'react';
import COLORS from '../../../../../src/helpers/colors';

const ValidatedBanner = () => {
  return (
    <div
      className="fr-notice fr-py-4w"
      style={{ position: 'absolute', top: '173px', left: '0%', right: '0%', backgroundColor: COLORS.successBackground }}
    >
      <div className="fr-container" style={{ display: 'flex', alignItems: 'center' }}>
        <span className="fr-icon-checkbox-fill" aria-hidden="true" style={{ color: COLORS.successIcon }}></span>
        <div className="fr-notice__body fr-grid-row fr-grid-row--middle" style={{ paddingLeft: '20px' }}>
          <div>
            <p className="fr-notice__title" style={{ color: COLORS.successTitle }}>
              Votre demande de reconventionnement a été accepté !
            </p>
            <p className="fr-text--md" style={{ color: COLORS.successText }}>
              Vous avez 12 postes à pourvoir dès à présent. En savoir plus sur comment recruter vos
              conseillers.
            </p>
          </div>
          <div style={{ marginLeft: '21rem' }}>
            <span className="fr-icon-close-line" aria-hidden="true"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidatedBanner;
