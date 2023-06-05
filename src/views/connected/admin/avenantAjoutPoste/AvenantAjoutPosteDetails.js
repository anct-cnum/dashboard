import React from 'react';
import dayjs from 'dayjs';
import { badgeStatutDossierDS, pluralize } from '../../../../utils/formatagesUtils';
import PropTypes from 'prop-types';

function AvenantAjoutPosteDetails({ avenant }) {
  const demandesCoselec = avenant?.demandesCoselec?.find(demande => demande.statut === 'en_cours' && demande.type === 'ajout');
  return (
    <div className="fr-card fr-card--no-border" style={{ backgroundColor: '#E8EDFF' }}>
      <div className="fr-card__body">
        <div className="fr-card__content">
          <h3 className="fr-card__title fr-h3">
            Avenant · ajout de poste
          </h3>
          <p className="fr-card__desc fr-text--lg fr-text--regular">
            Demande initi&eacute;e&nbsp;
            {demandesCoselec?.date ?
              <span>le&nbsp;{dayjs(demandesCoselec?.date).format('DD/MM/YYYY')}</span> :
              <span>&agrave; une date inconnue</span>
            }
          </p>
          <p className="fr-card__desc fr-text--lg" style={{ color: '#000091', width: '54%' }}>
            <strong className="fr-text--bold">
              Demande de {demandesCoselec?.nombreDePostes}{pluralize(
                ' poste de conseiller subventionné supplémentaire ',
                ' poste de conseiller subventionné supplémentaire ',
                ' postes de conseillers subventionnés supplémentaires ',
                demandesCoselec?.nombreDePostes
              )}
            </strong>
            en plus{pluralize(
              ' d\'un ',
              ' d\'un ',
              ' des ',
              avenant?.nombreConseillersCoselec
            )}
            {avenant?.nombreConseillersCoselec}
            {pluralize(
              ' poste de conseiller validé ',
              ' poste de conseiller validé ',
              ' postes de conseillers validés ',
              avenant?.nombreConseillersCoselec
            )}
            pour ce conventionnement
          </p>
          <div className="fr-card__start fr-mb-0" style={{ textAlign: 'end' }}>
            {demandesCoselec?.statut === 'validée' ?
              <p className="fr-badge fr-badge--success">Demande valid&eacute;e</p> :
              <p className="fr-badge fr-badge--new">Demande en attente de validation</p>
            }
          </div>
        </div>
        <div className="fr-card__footer">
          <ul className="fr-btns-group fr-btns-group--icon-left fr-btns-group--inline-reverse fr-btns-group--inline-lg">
            {demandesCoselec?.statut === 'en_cours' &&
              <li>
                <button className="fr-btn" disabled>
                  Valider la demande
                </button>
              </li>
            }
            <li className="fr-ml-auto">
              <div className="fr-grid-row" style={{ alignItems: 'baseline' }}>
                {badgeStatutDossierDS(avenant?.dossierReconventionnement?.statut)}
                <a className="fr-btn fr-btn--secondary" href={avenant?.url} target="_blank" rel="noopener noreferrer">
                  Voir le dossier D&eacute;marche Simplifi&eacute;e
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

AvenantAjoutPosteDetails.propTypes = {
  avenant: PropTypes.object,
};

export default AvenantAjoutPosteDetails;
