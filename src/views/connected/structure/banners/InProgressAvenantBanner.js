import React from 'react';
import PropTypes from 'prop-types';
import { pluralize } from '../../../../utils/formatagesUtils';
import dayjs from 'dayjs';
import { StatutConventionnement } from '../../../../utils/enumUtils';

const InProgressAvenantBanner = ({ structure }) => {
  const isRetrait = structure?.lastDemandeCoselec?.type === 'retrait';
  const isInitie = structure?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_INITIÉ ||
  structure?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_EN_COURS;
  const nombre = isRetrait ?
    structure?.lastDemandeCoselec?.nombreDePostesRendus :
    structure?.lastDemandeCoselec?.nombreDePostesSouhaites;
  const pluralizedText = pluralize(
    isRetrait ? `la restitution d'un poste subventionné` : `un nouveau poste subventionné`,
    isRetrait ? `la restitution d'un poste subventionné` : 'un nouveau poste subventionné',
    isRetrait ? `la restitution de ${nombre} postes subventionnés` : ` ${nombre} nouveaux postes subventionnés`,
    nombre
  );
  
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
             Vous avez demand&eacute;{' '}
              {pluralizedText}{' '}
            le
              {
                structure?.lastDemandeCoselec?.emetteurAvenant?.date ?
                  dayjs(structure?.lastDemandeCoselec?.emetteurAvenant?.date).format('DD/MM/YYYY') :
                  'Non renseignée'
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
InProgressAvenantBanner.propTypes = {
  structure: PropTypes.object,
};

export default InProgressAvenantBanner;
