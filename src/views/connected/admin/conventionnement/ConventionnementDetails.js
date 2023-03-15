import React from 'react';
import dayjs from 'dayjs';
import { pluralize } from '../../../../utils/formatagesUtils';
import PropTypes from 'prop-types';

function ConventionnementDetails({ conventionnement }) {
  const dossierConventionnement = conventionnement?.conventionnement?.dossierConventionnement;
  return (
    <div className="fr-card fr-card--no-border" style={{ backgroundColor: '#E8EDFF' }}>
      <div className="fr-card__body">
        <div className="fr-card__content">
          <h3 className="fr-card__title fr-h3">
            Conventionnement phase 1
          </h3>
          <p className="fr-card__desc fr-text--lg fr-text--regular">
            Demande initi&eacute;e {
              dossierConventionnement?.dateDeCreation ? `le ${dayjs(dossierConventionnement?.dateDeCreation).format('DD/MM/YYYY')}` : 'à une date inconnue'
            }
          </p>
          <p className="fr-card__desc fr-text--lg fr-text--bold" style={{ color: '#000091' }}>
            {pluralize(
              'Nombre de poste total demandé : ',
              'Nombre de poste total demandé : ',
              'Nombre de postes total demandés : ',
              conventionnement?.nombreConseillersSouhaites
            )}
            {conventionnement?.nombreConseillersSouhaites}
          </p>
          <div className="fr-card__start fr-mb-0" style={{ textAlign: 'end' }}>
            {conventionnement?.conventionnement?.statut === 'CONVENTIONNEMENT_VALIDÉ' ?
              <p className="fr-badge fr-badge--success">Demande validée</p> :
              <p className="fr-badge fr-badge--new">Demande en attente de validation</p>
            }
          </div>
        </div>
        <div className="fr-card__footer">
          <ul className="fr-btns-group fr-btns-group--icon-left fr-btns-group--inline-reverse fr-btns-group--inline-lg">
            {conventionnement?.conventionnement?.statut === 'CONVENTIONNEMENT_EN_COURS' &&
            <li>
              <button className="fr-btn" disabled>
                Valider la demande
              </button>
            </li>
            }
            <li className="fr-ml-auto">
              <div className="fr-grid-row" style={{ alignItems: 'baseline' }}>
                {dossierConventionnement?.statut === 'accepte' ?
                  <p className="fr-badge fr-badge--success fr-mr-3w" style={{ height: '20%' }}>Dossier complet</p> :
                  <p className="fr-badge fr-badge--error fr-mr-3w" style={{ height: '20%' }}>Dossier incomplet</p>
                }
                   
                <a className="fr-btn fr-btn--secondary" href={conventionnement?.url} target="_blank" rel="noopener noreferrer">
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

ConventionnementDetails.propTypes = {
  conventionnement: PropTypes.object,
};

export default ConventionnementDetails;
