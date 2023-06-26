import React from 'react';
import PropTypes from 'prop-types';
import { pluralize } from '../../../../utils/formatagesUtils';
import dayjs from 'dayjs';
import PopinGestionPostes from '../popins/popinGestionPostes';
import usePopinGestionPostes from '../hooks/usePopinGestionPostes';
import { StatutConventionnement } from '../../../../utils/enumUtils';
import { displayNombreDePostes, displayStatutRequestText, getNombreDePostes } from '../utils/functionUtils';

const ReconventionnementInfosCard = ({ structure }) => {
  const { actionType, step, setStep, handlePopin } = usePopinGestionPostes();

  const isReconventionnement = structure?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ;

  const displayBadge = () => {
    if (structure?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_INITIÉ) {
      return <p className="fr-badge fr-badge--warning fr-ml-auto">RECONVENTIONNEMENT ENREGISTR&Eacute;</p>;
    }
    if (structure?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_EN_COURS) {
      return <p className="fr-badge fr-badge--info fr-ml-auto">RECONVENTIONNEMENT EN COURS</p>;
    }
    if (structure?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ) {
      return <p className="fr-badge fr-badge--success fr-ml-auto">RECONVENTIONNEMENT VALID&Eacute;</p>;
    }
    return null;
  };
 

  function isButtonDisabled(structure) {
    return (structure?.demandesCoselec?.length > 0 && structure?.lastDemandeCoselec?.statut === 'en_cours') ||
      structure?.conventionnement?.statut !== StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ;
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
            <div className="fr-card__desc">
              <p className="fr-text--md fr-text--bold" style={{ color: '#000091' }}>
                {
                  pluralize(
                    ' poste de conseiller',
                    ' poste de conseiller',
                    ' postes de conseiller',
                    structure?.posteValiderCoselec,
                    true
                  )
                }
                {' '}
                {isReconventionnement ? (
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
                ) : (
                  <span className="fr-text--regular fr-text--md">
                    {pluralize(
                      'demandé pour ce conventionnement',
                      'demandé pour ce conventionnement',
                      'demandés pour ce conventionnement',
                      structure?.conventionnement?.dossierReconventionnement?.nbPostesAttribuees,
                    )
                    }</span>
                )}
              </p>
              {
                structure?.demandesCoselec.some(demande => demande.phaseConventionnement === '2') &&
             <>
               <div className="fr-col-12 fr-mt-1w">
                 <hr style={{ borderWidth: '0.5px' }} />
               </div>
               {
                 structure.demandesCoselec
                 .filter(demande => demande.phaseConventionnement === '2')
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
                 )) }
               <div className="fr-col-12 fr-my-1w">
                 <hr style={{ borderWidth: '0.5px' }} />
               </div>
             </>
              }
              <div>
                <ul className="fr-btns-group fr-btns-group--inline-md">
                  <li>
                    <button className="fr-btn fr-btn--secondary"
                      disabled={
                        isButtonDisabled(structure)
                      }
                      onClick={() => {
                        handlePopin('add', 1);
                      }}>
                    Ajouter un poste
                    </button>
                  </li>
                  <li>
                    <button className="fr-btn fr-btn--secondary"
                      disabled={isButtonDisabled(structure)}
                      onClick={() => {
                        handlePopin('remove', 1);
                      }}>
                    Rendre un poste
                    </button>
                  </li>
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
  positions: PropTypes.array,
  onPositionClick: PropTypes.func,
  structure: PropTypes.object,
};

export default ReconventionnementInfosCard;
