import React from 'react';
import PropTypes from 'prop-types';
import days from 'dayjs';
import { StatutConventionnement } from '../../../../utils/enumUtils';

const InProgressBanner = ({ structure }) => {
  const isInitie = structure?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_INITIÉ ||
  structure?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_EN_COURS;
  return (
    <div
      className="fr-notice fr-py-4w banner notice background"
      style={{ position: 'absolute', top: isInitie ? '289px' : '173px', left: '0%', right: '0%' }}
    >
      <div className="fr-container notice responsive__banner">
        <span className="fr-icon-time-fill icon__color" aria-hidden="true"></span>
        <div className="fr-notice__body responsive__banner" style={{ paddingLeft: '20px' }}>
          <div>
            <p className="fr-notice__title title__color">
              Vous avez d&eacute;pos&eacute; une demande de reconventionnement
              {structure?.conventionnement?.dossierReconventionnement?.dateDerniereModification ?
                ` le ${days(structure.conventionnement.dossierReconventionnement.dateDerniereModification).format('DD/MM/YYYY')}` :
                ' non renseignée'
              }
            </p>
            <p className="fr-text--md">
              Votre demande est en cours de traitement, vous aurez une r&eacute;ponse tr&egrave;s prochainement.
            </p>
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
