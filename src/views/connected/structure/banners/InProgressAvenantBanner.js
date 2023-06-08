import React from 'react';
import PropTypes from 'prop-types';
import { pluralize } from '../../../../utils/formatagesUtils';
import dayjs from 'dayjs';

const InProgressAvenantBanner = ({ structure }) => (
  <div
    className="fr-notice fr-py-4w banner notice background"
    style={{ position: 'absolute', top: '173px', left: '0%', right: '0%' }}
  >
    <div className="fr-container notice responsive__banner">
      <span className="fr-icon-time-fill icon__color" aria-hidden="true"></span>
      <div className="fr-notice__body responsive__banner" style={{ paddingLeft: '20px' }}>
        <div>
          <p className="fr-notice__title title__color">
             Vous avez demandé{' '}
            {structure?.lastDemandeCoselec?.nombreDePostesSouhaites}{' '}
            {pluralize(
              'nouveau poste subventionné',
              'nouveau poste subventionné',
              'nouveaux postes subventionnés',
              structure?.lastDemandeCoselec?.nombreDePostesSouhaites
            )} le {dayjs(structure?.lastDemandeCoselec?.date).format('DD/MM/YYYY')}.
          </p>
          <p className="fr-text--md">
            Votre demande est en cours de traitement, vous aurez une réponse très prochainement.
          </p>
        </div>
      </div>
    </div>
  </div>
);

InProgressAvenantBanner.propTypes = {
  structure: PropTypes.object,
  roleActivated: PropTypes.string,
};

export default InProgressAvenantBanner;
