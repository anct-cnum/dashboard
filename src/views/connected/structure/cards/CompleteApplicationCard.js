import React from 'react';
import propType from 'prop-types';
import { badgeStatutDossierDS } from '../../../../utils/formatagesUtils';

const CompleteApplicationCard = ({ structure, formatTitreDossierDemarcheSimplifiee }) => (
  <>
    <div className="fr-card fr-col-12 fr-mt-2w fr-p-3w">
      <div className="fr-card__body fr-p-0">
        <div>
          <div className="fr-grid-row responsive__wide-card" style={{ alignItems: 'center' }}>
            <div className="fr-col-3 card__text">
              <div>
                <strong className="fr-text--md fr-text--bold">ID de votre structure</strong>
                <br />
                <span className="fr-text--regular fr-text--md">
                  {structure?.idPG}
                </span>
              </div>
            </div>
            <div className="fr-col-3 card__text">
              <div>
                <strong className="fr-text--md fr-text--bold">
                  N° Siret de votre structure
                </strong>
                <br />
                <span className="fr-text--regular fr-text--md">
                  {structure?.siret}
                </span>
              </div>
            </div>
            <div className="fr-col-6 card__text" style={{ textAlign: 'end' }}>
              {badgeStatutDossierDS(structure?.conventionnement?.dossierReconventionnement?.statut)}
              <a
                href={structure?.urlDossierReconventionnement}
                target="_blank"
                rel="noopener noreferrer"
                className="fr-btn card__button"
              >
                {formatTitreDossierDemarcheSimplifiee(structure)} mon dossier
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    {!structure?.conventionnement?.dossierReconventionnement?.numero &&
      <div className="fr-notice fr-notice--info">
        <div className="fr-container">
          <div className="fr-notice__body" style={{ display: 'flex', alignItems: 'center' }}>
            <p className="fr-notice__title">
              Les dossiers cr&eacute;&eacute;s sont mis &agrave; jour chaque nuit. Vous pourrez confirmer votre reconventionnement
              le jour suivant la cr&eacute;ation de votre dossier D&eacute;marches-Simplifi&eacute;es.
            </p>
          </div>
        </div>
      </div>
    }
  </>
);

CompleteApplicationCard.propTypes = {
  structure: propType.object,
  formatTitreDossierDemarcheSimplifiee: propType.func,
};

export default CompleteApplicationCard;
