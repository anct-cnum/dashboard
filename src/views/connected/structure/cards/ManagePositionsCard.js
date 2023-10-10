import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { pluralize } from '../../../../utils/formatagesUtils';
import { calcNbJoursAvantDateFinContrat } from '../../../../utils/calculateUtils';
import usePopinGestionPostes from '../hooks/usePopinGestionPostes';
import PopinGestionPostes from '../popins/popinGestionPostes';
import { PhaseConventionnement, StatutConventionnement } from '../../../../utils/enumUtils';
import { displayNombreDePostes, displayStatutRequestText, getNombreDePostes } from '../utils/functionUtils';

const ManagePositionsCard = ({ structure, cardStyle, hasBorder, nbreConseillersActifs, nbreConseillersEnCoursDeRecrutement, nbreConseillersRenouveler }) => {

  const isReconventionnement = structure?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ;
  const dossier = isReconventionnement ? structure?.conventionnement?.dossierReconventionnement :
    structure?.conventionnement?.dossierConventionnement;
  const nbConseillerActifTotal = nbreConseillersActifs + nbreConseillersRenouveler + nbreConseillersEnCoursDeRecrutement;
    
  const urlDossier = isReconventionnement ? structure?.urlDossierReconventionnement : structure?.urlDossierConventionnement;
  const phase = isReconventionnement ? 'Conventionnement phase 2' : 'Conventionnement phase 1';
  const { actionType, step, setStep, handlePopin } = usePopinGestionPostes();

  function isRemoveButtonDisabled(structure) {
    return structure?.demandesCoselec?.length > 0 && structure?.lastDemandeCoselec?.statut === 'en_cours';
  }

  function isAddButtonDisabled(structure) {
    return structure?.demandesCoselec?.length > 0 &&
     structure?.lastDemandeCoselec?.statut === 'en_cours' ||
     structure?.conventionnement?.statut !== StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ;
  }
  const className = hasBorder ?
    'fr-card fr-mb-4w' :
    'fr-card fr-card--no-border fr-mb-4w';

  return (
    <>
      {
        step > 0 && <PopinGestionPostes
          step={step}
          setStep={setStep}
          actionType={actionType}
        />
      }
      <div className={className} style={cardStyle}>
        <div className="fr-card__body">
          <div className="fr-card__content">
            <div className="fr-grid-row fr-grid-row--middle">
              <h4 className="fr-grid-row fr-grid-row--middle">{phase}</h4>
              {isReconventionnement && <p className="fr-badge fr-badge--warning fr-ml-auto">
                {
                  calcNbJoursAvantDateFinContrat(dossier?.dateFinProchainContrat) > 0 ?
                    calcNbJoursAvantDateFinContrat(dossier?.dateFinProchainContrat) : ''
                }
                {pluralize(
                  'La date de fin du premier contrat est dépassée',
                  ' jour restant avant la fin du premier contrat',
                  ' jours restants avant la fin du premier contrat',
                  calcNbJoursAvantDateFinContrat(dossier?.dateFinProchainContrat)
                )}
              </p>}
            </div>
            <p className="fr-card__desc fr-text--lg fr-text--regular">Date de d&eacute;but : {
              dossier?.dateDeCreation ?
                <span>
                  le&nbsp;{dayjs(dossier?.dateDeCreation).format('DD/MM/YYYY')}
                </span> :
                <span>
                  date inconnue
                </span>
            }</p>
            <div className="fr-card__desc">
              <p className="fr-text--md fr-text--bold" style={{ color: '#000091' }}>
                {isReconventionnement ? structure?.posteValiderCoselec :
                  structure?.posteValiderCoselecConventionnement}{' '}{pluralize(
                  'poste de conseiller',
                  'poste de conseiller',
                  'postes de conseiller',
                  isReconventionnement ? structure?.posteValiderCoselec :
                    structure?.posteValiderCoselecConventionnement
                )}
                {' '}
                <span className="fr-text--regular fr-text--md">
                  {pluralize(
                    'validé pour ce conventionnement',
                    'validé pour ce conventionnement',
                    'validés pour ce conventionnement',
                    isReconventionnement ? structure?.posteValiderCoselec :
                      structure?.posteValiderCoselecConventionnement
                  )}
                </span>
              </p>
              {(
                (isReconventionnement && structure?.demandesCoselec?.some(demande => demande.phaseConventionnement === PhaseConventionnement.PHASE_2)) ||
                (!isReconventionnement && structure?.demandesCoselec?.some(demande => demande.phaseConventionnement === PhaseConventionnement.PHASE_1))
              ) &&
             <>
               <div className="fr-col-12 fr-mt-1w">
                 <hr style={{ borderWidth: '0.5px' }} />
               </div>
               {
                 structure?.demandesCoselec
                 .filter(demande => isReconventionnement ?
                   demande?.phaseConventionnement === PhaseConventionnement.PHASE_2 :
                   demande?.phaseConventionnement === PhaseConventionnement.PHASE_1)
                 .map((demande, idx) => (
                   <p className="fr-text--md fr-text--bold" style={{ color: '#000091' }} key={idx}>
                      Avenant - {
                       displayNombreDePostes(demande)
                     } {pluralize(
                       'poste de conseiller',
                       'poste de conseiller',
                       'postes de conseillers',
                       getNombreDePostes(demande)
                     )} {' '}
                     <span className="fr-text--regular fr-text--md">
                       {displayStatutRequestText(demande)} {' '}{' '}
                   le {dayjs(demande?.emetteurAvenant?.date).format('DD/MM/YYYY')}
                     </span>
                   </p>
                 ))
               }
               <div className="fr-col-12 fr-my-1w">
                 <hr style={{ borderWidth: '0.5px' }} />
               </div>
             </>
              }
              <div>
                <ul className="fr-btns-group fr-btns-group--inline-md">
                  <li>
                    <button className="fr-btn fr-btn--secondary"
                      disabled={isAddButtonDisabled(structure)}
                      onClick={() => {
                        handlePopin('add', 1);
                      }}>
                    Ajouter un poste
                    </button>
                  </li>
                  <li>
                    <button className="fr-btn fr-btn--secondary"
                      disabled={isRemoveButtonDisabled(structure) || nbConseillerActifTotal >= structure?.posteValiderCoselec}
                      onClick={() => {
                        handlePopin('remove', 1);
                      }}>
                    Rendre un poste
                    </button>
                  </li>
                  <li className="fr-ml-auto">
                    <a
                      href={urlDossier}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="fr-btn"
                    >
                      <i className="ri-folder-2-line fr-mr-1w"></i>
                      Voir le dossier D&eacute;marche Simplifi&eacute;e
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


ManagePositionsCard.propTypes = {
  structure: PropTypes.object,
  cardStyle: PropTypes.object,
  hasBorder: PropTypes.bool,
  nbreConseillersActifs: PropTypes.number,
  nbreConseillersEnCoursDeRecrutement: PropTypes.number,
  nbreConseillersRenouveler: PropTypes.number,
};

export default ManagePositionsCard;
