import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { pluralize, formatNomConseiller } from '../../../../utils/formatagesUtils';
import { calcNbJoursAvantDateFinContrat } from '../../../../utils/calculateUtils';
import { getNombreDePostes, displayStatutRequestText, displayNombreDePostes } from '../utils/functionUtils';
import { PhaseConventionnement } from '../../../../utils/enumUtils';

const ConventionnementInfosCard = ({ structure, roleActivated }) => {

  return (
    <div className="fr-card fr-mb-4w">
      <div className="fr-card__body">
        <div className="fr-card__content">
          <div className="fr-grid-row fr-grid-row--middle">
            <h4 className="fr-grid-row fr-grid-row--middle">Conventionnement phase 1</h4>
            <p className="fr-badge fr-badge--warning fr-ml-auto">
              {
                calcNbJoursAvantDateFinContrat(structure?.conventionnement?.dossierConventionnement?.dateFinProchainContrat) > 0 ?
                  calcNbJoursAvantDateFinContrat(structure?.conventionnement?.dossierConventionnement?.dateFinProchainContrat) : ''
              }
              {pluralize(
                'La date de fin du premier contrat est dépassée',
                ' jour restant avant la fin du premier contrat',
                ' jours restants avant la fin du premier contrat',
                calcNbJoursAvantDateFinContrat(structure?.conventionnement?.dossierConventionnement?.dateFinProchainContrat)
              )}
            </p>
          </div>
          <p className="fr-card__desc fr-text--lg fr-text--regular">Date de d&eacute;but :
            {
              structure?.conventionnement?.dossierConventionnement?.dateDeValidation ?
                <span>
              le&nbsp;{dayjs(structure?.conventionnement?.dossierConventionnement?.dateDeValidation).format('DD/MM/YYYY')}
                </span> :
                <span>
                  {' '}date inconnue
                </span>
            }
          </p>
          <div className="fr-card__desc">
            <p className="fr-text--md fr-text--bold" style={{ color: '#000091' }}>
              {structure?.posteValiderCoselecConventionnement} - {pluralize(
                'poste de conseiller',
                'poste de conseiller',
                'postes de conseillers',
                structure?.posteValiderCoselecConventionnement
              )}
              {' '}
              <span className="fr-text--regular fr-text--md">
                {pluralize(
                  'validé pour ce conventionnement',
                  'validé pour ce conventionnement',
                  'validés pour ce conventionnement',
                  structure?.posteValiderCoselecConventionnement
                )}
              </span>
            </p>
            {
              structure?.demandesCoselec.some(demande => demande.phaseConventionnement === PhaseConventionnement.PHASE_1) &&
             <>
               <div className="fr-col-12 fr-mt-1w">
                 <hr style={{ borderWidth: '0.5px' }} />
               </div>
               {
                 structure?.demandesCoselec
                 .filter(demande => demande.phaseConventionnement === PhaseConventionnement.PHASE_1)
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
            <div className="fr-grid-row">
              <div>
                <p className="fr-text--bold" style={{ marginBottom: 0 }}>{pluralize(
                  'Profil recruté',
                  'Profil recruté',
                  'Profils recrutés',
                  structure?.conseillersRecruter?.length
                )}
                </p>
                {structure?.conseillersRecruter?.map((conseiller, idx) =>
                  <ul key={idx}style={{ listStyleType: 'none', padding: 0 }}>
                    <li>
                      <button
                        style={{ paddingLeft: 0, marginBottom: 0 }}
                        title="D&eacute;tail"
                        className="fr-text"
                        onClick={() => window.open(`/${roleActivated}/conseiller/${conseiller?._id}`)}>
                        {conseiller?.idPG}&nbsp;-&nbsp;{formatNomConseiller(conseiller)}
                      </button>
                    </li>
                  </ul>
                )}
              </div>
              <div className="fr-ml-auto fr-my-auto">
                <a className="fr-btn" href={structure?.urlDossierConventionnement} target="_blank" rel="noopener noreferrer">
                  <i className="ri-folder-2-line fr-mr-1w"></i>
                  Voir le dossier D&eacute;marche Simplifi&eacute;e
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ConventionnementInfosCard.propTypes = {
  structure: PropTypes.object,
  roleActivated: PropTypes.string
};

export default ConventionnementInfosCard;
