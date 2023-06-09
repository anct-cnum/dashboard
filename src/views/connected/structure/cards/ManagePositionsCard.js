import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { pluralize } from '../../../../utils/formatagesUtils';
import { calcNbJoursAvantDateFinContrat } from '../../../../utils/calculateUtils';
import usePopinGestionPostes from '../hooks/usePopinGestionPostes';
import PopinGestionPostes from '../popins/popinGestionPostes';
import { StatutConventionnement } from '../../../../utils/enumUtils';

const ManagePositionsCard = ({ structure }) => {

  const isReconventionnement = structure?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ;
  const dossier = isReconventionnement ? structure?.conventionnement?.dossierReconventionnement :
    structure?.conventionnement?.dossierConventionnement;
  const urlDossier = isReconventionnement ? structure?.urlDossierReconventionnement : structure?.urlDossierConventionnement;
  const phase = isReconventionnement ? 'Conventionnement phase 2' : 'Conventionnement phase 1';
  const { actionType, step, setStep, handlePopin } = usePopinGestionPostes();

  const displayText = structure => {
    if (structure?.lastDemandeCoselec?.type === 'ajout') {
      if (structure?.lastDemandeCoselec?.statut === 'initiee') {
        return 'demandés';
      } else if (structure?.lastDemandeCoselec?.statut === 'validee') {
        return 'obtenu';
      } else if (structure?.lastDemandeCoselec?.statut === 'refusee') {
        return 'refusé';
      }
    } else {
      return 'vacants rendu';
    }
  };
  

  return (
    <>
      {
        step > 0 && <PopinGestionPostes
          step={step}
          setStep={setStep}
          actionType={actionType}
        />
      }
      <div className="fr-card fr-card--no-border fr-mb-4w" style={{ backgroundColor: '#E8EDFF' }}>
        <div className="fr-card__body">
          <div className="fr-card__content">
            <div className="fr-grid-row fr-grid-row--middle">
              <h4 className="fr-grid-row fr-grid-row--middle">{phase}</h4>
              <p className="fr-badge fr-badge--warning fr-ml-auto">
                {
                  calcNbJoursAvantDateFinContrat(structure?.dossierReconventionnement?.dateFinProchainContrat) > 0 ?
                    calcNbJoursAvantDateFinContrat(structure?.dossierReconventionnement?.dateFinProchainContrat) : ''
                }
                {pluralize(
                  'La date de fin du premier contrat est dépassée',
                  ' jour restant avant la fin du premier contrat',
                  ' jours restants avant la fin du premier contrat',
                  calcNbJoursAvantDateFinContrat(structure?.dossierReconventionnement?.dateFinProchainContrat)
                )}
              </p>
            </div>
            <p className="fr-card__desc fr-text--lg fr-text--regular">Date de d&eacute;but : {
              dossier?.dateDerniereModification ?
                <span>
                  le&nbsp;{dayjs(dossier?.dateDerniereModification).format('DD/MM/YYYY')}
                </span> :
                <span>
                  date inconnue
                </span>
            }</p>
            <div className="fr-card__desc">
              <p className="fr-text--md fr-text--bold" style={{ color: '#000091' }}>
                {structure?.posteValiderCoselec} - {pluralize(
                  'poste de conseiller',
                  'poste de conseiller',
                  'postes de conseiller',
                  structure?.posteValiderCoselec
                )}
                {' '}
                <span className="fr-text--regular fr-text--md">
                  {pluralize(
                    'validé pour ce conventionnement',
                    'validé pour ce conventionnement',
                    'validés pour ce conventionnement',
                    structure?.posteValiderCoselec
                  )}
                </span>
              </p>
              {structure?.lastDemandeCoselec &&
             <>
               <div className="fr-col-12 fr-mt-1w">
                 <hr style={{ borderWidth: '0.5px' }} />
               </div>
               <p className="fr-text--md fr-text--bold" style={{ color: '#000091' }}>
              Avenant - {
                   structure?.lastDemandeCoselec?.statut === 'validee' ?
                     structure?.lastDemandeCoselec?.nombreDePostesAccordes :
                     structure?.lastDemandeCoselec?.nombreDePostesSouhaites
                 } postes de conseiller {' '}
                 <span className="fr-text--regular fr-text--md">
                   {displayText(structure)} {' '}{' '}
                   le {dayjs(structure?.lastDemandeCoselec?.date).format('DD/MM/YYYY')}
                 </span>
               </p>
               <div className="fr-col-12 fr-my-1w">
                 <hr style={{ borderWidth: '0.5px' }} />
               </div>
             </>
              }
              <div>
                <ul className="fr-btns-group fr-btns-group--inline-md">
                  <li>
                    <button className="fr-btn fr-btn--secondary"
                      disabled={structure?.demandesCoselec.length > 0 && structure?.lastDemandeCoselec?.statut !== 'validee'}
                      onClick={() => {
                        handlePopin('add', 1);
                      }}>
                    Ajouter un poste
                    </button>
                  </li>
                  <li>
                    <button className="fr-btn fr-btn--secondary"
                      disabled={structure?.demandesCoselec.length > 0 && structure?.lastDemandeCoselec?.statut !== 'validee'}
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
};

export default ManagePositionsCard;
