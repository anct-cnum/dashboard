import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { structureActions } from '../../../../actions';
import { pluralize } from '../../../../utils/formatagesUtils';
import { StatutConventionnement } from '../../../../utils/enumUtils';

const ValidatedAvenantBanner = ({ structure }) => {
  const dispatch = useDispatch();
  const isRefusee = structure?.lastDemandeCoselec?.type === 'ajout' && structure?.lastDemandeCoselec?.statut === 'refusee';
  const isReconventionnement = structure?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ;
  function closeBanner() {
    dispatch(structureActions.closeBanner('avenant', structure?._id));
  }

  const getTypeDemandeText = () => {
    if (isRefusee) {
      return 'demandé';
    } else {
      return structure?.lastDemandeCoselec?.type === 'ajout' ? 'obtenu' : 'rendu';
    }
  };
  

  const getPosteDemandeText = () => {
    if (isRefusee) {
      return pluralize('poste', 'poste', 'postes', structure?.lastDemandeCoselec?.nombreDePostesSouhaites);
    }
    return structure?.lastDemandeCoselec?.type === 'ajout' ?
      pluralize('poste', 'poste', 'postes', structure?.lastDemandeCoselec?.nombreDePostesAccordes) :
      pluralize('poste vacant', 'poste vacant', 'postes vacants', structure?.lastDemandeCoselec?.nombreDePostesRendus);
    
  };

  const getInfoText = () => {
    if (isRefusee) {
      return 'La demande a été refusée.';
    } else {
      return structure?.lastDemandeCoselec?.type === 'ajout' ?
        pluralize(
          'Le poste obtenu permettra de recruter un autre conseiller pour votre structure.',
          'Le poste obtenu permettra de recruter un autre conseiller pour votre structure.',
          'Les postes obtenus permettront de recruter d\'autres conseillers pour votre structure.',
          structure?.lastDemandeCoselec?.nombreDePostesAccordes
        ) :
        pluralize(
          `Il vous reste ${structure?.posteValiderCoselec} poste subventionné dès à présent. 
          Le poste rendu permettra de subventionné un autre poste de conseiller pour une autre structure en demande.`,
          `Il vous reste ${structure?.posteValiderCoselec} poste subventionné dès à présent. 
          Le poste rendu permettra de subventionné un autre poste de conseiller pour une autre structure en demande.`,
          `Il vous reste ${structure?.posteValiderCoselec} postes subventionnés dès à présent. 
          Les postes rendus permettront de subventionnés d'autres postes de conseillers pour une autre structure en demande.`,
          structure?.lastDemandeCoselec?.posteValiderCoselec
        );
    }
  };

  const getDisplayNumber = (structure, isRefusee) => {
    if (isRefusee) {
      return structure?.lastDemandeCoselec?.nombreDePostesSouhaites;
    }
    return structure?.lastDemandeCoselec?.type === 'ajout' ?
      `${structure?.lastDemandeCoselec?.nombreDePostesAccordes}/${structure?.lastDemandeCoselec?.nombreDePostesSouhaites}` :
      structure?.lastDemandeCoselec?.nombreDePostesRendus;
    
  };

  return (
    <div className={`fr-notice fr-py-4w banner ${isRefusee ? 'warning' : 'success'} background`}>
      <div className={`fr-container ${isRefusee ? 'warning' : 'success'} responsive__banner`}>
        <span className={`fr-icon-${isRefusee ? 'error' : 'checkbox'}-fill icon__color`} aria-hidden="true"></span>
        <div className={`fr-notice__body responsive__banner ${isRefusee ? 'warning' : ''}`} style={{ paddingLeft: '20px' }}>
          <div>
            <p className="fr-notice__title title__color">
              Vous avez {getTypeDemandeText()} {getDisplayNumber(structure, isRefusee)}{' '}
              {getPosteDemandeText()} pour votre conventionnement {isReconventionnement ? 'phase 2' : 'phase 1'}.
            </p>
            <p className="fr-text--md">{getInfoText()}</p>
          </div>
          <div className="banner__button_progress_avenant">
            <button className="fr-icon-close-line" onClick={() => closeBanner()}></button>
          </div>
        </div>
      </div>
    </div>
  );
};

ValidatedAvenantBanner.propTypes = {
  structure: PropTypes.object,
};

export default ValidatedAvenantBanner;
