import React from 'react';
import PropTypes from 'prop-types';
import { pluralize } from '../../../../utils/formatagesUtils';
import dayjs from 'dayjs';
import PopinGestionPostes from '../popins/PopinGestionPostes';
import usePopinGestionPostes from '../hooks/usePopinGestionPostes';
import { PhaseConventionnement, StatutConventionnement } from '../../../../utils/enumUtils';
import { checkStructurePhase2, displayNombreDePostes, displayStatutRequestText, getNombreDePostes } from '../utils/functionUtils';
import { Tooltip } from 'react-tooltip';

const ReconventionnementInfosCard = ({ structure, nbreConseillersActifs, nbreConseillersRenouveler, nbreConseillersEnCoursDeRecrutement }) => {
  const { actionType, step, setStep, handlePopin } = usePopinGestionPostes();
  const nbConseillerActifTotal = nbreConseillersActifs + nbreConseillersRenouveler + nbreConseillersEnCoursDeRecrutement;
  const texteTooltip = `Une demande est en cours d'instruction. Vous ne pouvez faire aucune action pendant cette période.`;

  const displayBadge = () => {
    if (structure?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_INITIÉ) {
      return <p className="fr-badge fr-badge--warning fr-ml-auto">RECONVENTIONNEMENT ENREGISTR&Eacute;</p>;
    }
    if (structure?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ) {
      return <p className="fr-badge fr-badge--success fr-ml-auto">RECONVENTIONNEMENT VALID&Eacute;</p>;
    }
    return null;
  };


  function isRemoveButtonDisabled(structure) {
    return (structure?.demandesCoselec?.length > 0 && structure?.lastDemandeCoselec?.statut === 'en_cours') ||
      !checkStructurePhase2(structure?.conventionnement?.statut);
  }

  // eslint-disable-next-line no-unused-vars
  function isAddButtonDisabled(structure) {
    return structure?.demandesCoselec?.length > 0 &&
      structure?.lastDemandeCoselec?.statut === 'en_cours';
  }

  return (
    <>
      {
        step > 0 && <PopinGestionPostes
          step={step}
          setStep={setStep}
          actionType={actionType}
        />
      }
      <div className="fr-card fr-mb-4w">
        <div className="fr-card__body">
          <div className="fr-card__content">
            <div className="fr-grid-row fr-grid-row--middle">
              <h4 className="fr-grid-row fr-grid-row--middle">Conventionnement phase 2</h4>
              {displayBadge()}
            </div>
            <p className="fr-card__desc fr-text--lg fr-text--regular">Date de d&eacute;but : {
              structure?.conventionnement?.dossierReconventionnement?.dateDeCreation ?
                <span>
                  le&nbsp;{dayjs(structure?.conventionnement?.dossierReconventionnement?.dateDeCreation).format('DD/MM/YYYY')}
                </span> :
                <span>
                  date inconnue
                </span>
            }</p>
            {structure?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ &&
              <div className="fr-card__desc">
                <p className="fr-text--md">
                  Nombre de
                  {pluralize(
                    ' poste demandé',
                    ' poste demandé',
                    ' postes demandés',
                    structure?.conventionnement?.dossierReconventionnement?.nbPostesAttribuees
                  )}
                  &nbsp;:&nbsp;{structure?.conventionnement?.dossierReconventionnement?.nbPostesAttribuees}
                </p>
              </div>
            }
            <div className="fr-card__desc">
              <p className="fr-text--md fr-text--bold" style={{ color: '#000091' }}>
                {
                  pluralize(
                    ' poste de conseiller',
                    ' poste de conseiller',
                    ' postes de conseillers',
                    structure?.posteValiderCoselec,
                    true
                  )
                }
                {' '}
                <span className="fr-text--regular fr-text--md">
                  {
                    pluralize(
                      'validé pour ce conventionnement',
                      'validé pour ce conventionnement',
                      'validés pour ce conventionnement',
                      structure?.posteValiderCoselec,
                    )
                  }
                </span>
              </p>
              {
                structure?.demandesCoselec?.some(demande => demande.phaseConventionnement === PhaseConventionnement.PHASE_2) &&
                <>
                  <div className="fr-col-12 fr-mt-1w">
                    <hr style={{ borderWidth: '0.5px' }} />
                  </div>
                  {
                    structure?.demandesCoselec
                    .filter(demande => demande?.phaseConventionnement === PhaseConventionnement.PHASE_2)
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
                            le {structure?.lastDemandeCoselec?.emetteurAvenant?.date ?
                            dayjs(structure?.lastDemandeCoselec?.emetteurAvenant?.date).format('DD/MM/YYYY') : 'Non renseignée'}
                        </span>
                      </p>
                    ))}
                  <div className="fr-col-12 fr-my-1w">
                    <hr style={{ borderWidth: '0.5px' }} />
                  </div>
                </>
              }
              <div>
                <ul className="fr-btns-group fr-btns-group--inline-md">
                  {/* <li>
                    <button className="fr-btn fr-btn--secondary"
                      disabled={isAddButtonDisabled(structure)}
                      data-tooltip-id="tooltip-bouton-ajout-poste"
                      data-tooltip-content={texteTooltip}
                      onClick={() => {
                        handlePopin('add', 1);
                      }}>
                      Ajouter un poste
                    </button>
                    {isAddButtonDisabled(structure) &&
                      <Tooltip variant="light" id="tooltip-bouton-ajout-poste" className="infobulle" />
                    }
                  </li> */}
                  <li>
                    <button className="fr-btn fr-btn--secondary"
                      disabled={isRemoveButtonDisabled(structure) || nbConseillerActifTotal >= structure?.posteValiderCoselec}
                      data-tooltip-id="tooltip-bouton-rendre-poste"
                      data-tooltip-content={texteTooltip}
                      onClick={() => {
                        handlePopin('remove', 1);
                      }}>
                      Rendre un poste
                    </button>
                    {(isRemoveButtonDisabled(structure) || nbConseillerActifTotal >= structure?.posteValiderCoselec) &&
                      <Tooltip variant="light" id="tooltip-bouton-rendre-poste" className="infobulle" />
                    }
                  </li>
                  {structure?.conventionnement?.dossierReconventionnement?.numero &&
                    <li className="fr-ml-auto">
                      <a
                        href={structure?.urlDossierReconventionnement}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fr-btn"
                      >
                        <i className="ri-folder-2-line fr-mr-1w"></i>
                        Voir le dossier D&eacute;marche Simplifi&eacute;e
                      </a>
                    </li>
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ReconventionnementInfosCard.propTypes = {
  structure: PropTypes.object,
  nbreConseillersActifs: PropTypes.number,
  nbreConseillersRenouveler: PropTypes.number,
  nbreConseillersEnCoursDeRecrutement: PropTypes.number,
};

export default ReconventionnementInfosCard;
