import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

function ConventionnementDetails({ conventionnement }) {
  const dossierReconventionnement = conventionnement?.conventionnement?.dossierReconventionnement;
  return (
    <>
      <h2>Candidature</h2>
      <div className="fr-card">
        <div className="fr-card__body">
          <div className="fr-card__header fr-mt-4w">
            <h3 className="fr-card__title fr-h3">
              Recrutement conseiller
            </h3>
            {conventionnement?.prefet?.avisPrefet === 'POSITIF' &&
              <p className="fr-badge fr-badge--success badge-avis-prefet">Avis pr&eacute;fet favorable</p>
            }
            {conventionnement?.prefet?.avisPrefet === 'NÉGATIF' &&
              <p className="fr-badge fr-badge--error badge-avis-prefet">Avis pr&eacute;fet d&eacute;favorable</p>
            }
            {!['POSITIF', 'NÉGATIF'].includes(conventionnement?.prefet?.avisPrefet) &&
              <p className="fr-badge fr-badge--new badge-avis-prefet">Avis pr&eacute;fet non renseign&eacute;</p>
            }
            <p className="fr-card__desc fr-text--lg fr-text--regular">
              Date de candidature&nbsp;:&nbsp;
              {dossierReconventionnement?.dateDeCreation ?
                <span>le&nbsp;{dayjs(dossierReconventionnement.dateDeCreation).format('DD/MM/YYYY')}</span> :
                <span>Non renseign&eacute;e</span>
              }
            </p>
          </div>
          <div className="fr-card__content">
            <div className="commentaire-prefet">
              <span><strong>Commentaire pr&eacute;fet&nbsp;:&nbsp;</strong></span>
              {conventionnement?.prefet?.commentairePrefet ?
                <p className="fr-mt-2w fr-mb-0">{conventionnement?.prefet?.commentairePrefet}</p> :
                <p className="fr-mt-2w fr-mb-0">Non renseign&eacute;</p>
              }
            </div>
            <div className="fr-container questionnaire">
              <h6 className="fr-text--bold fr-mb-4w">R&eacute;ponses au questionnaire D&eacute;marches-Simplifi&eacute;es</h6>
              {conventionnement?.questionnaire?.map((question, idx) =>
                <div key={idx}>
                  {question.titre &&
                    <p className="fr-text--bold fr-text--xl">{question.titre}</p>
                  }
                  <p className="fr-text--bold">{question.enoncer}</p>
                  {question.files?.length > 0 &&
                    question.files?.map((file, idx) =>
                      <div key={idx} className="fr-mb-4w">
                        <a href={file?.url} target="_blank" rel="noopener noreferrer">{file?.filename}</a>
                      </div>
                    )
                  }
                  {question.reponse &&
                    <p>{question.reponse}</p>
                  }
                  {idx + 1 < conventionnement?.questionnaire?.length &&
                    <hr />
                  }
                </div>
              )}
            </div>
          </div>
          {conventionnement?.statut === 'CREEE' &&
            <div className="fr-card__footer">
              <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg">
                <li>
                  <button className="fr-btn fr-btn--secondary">
                    Refuser la candidature
                  </button>
                </li>
                <li>
                  <button className="fr-btn">
                    Valider la candidature
                  </button>
                </li>
              </ul>
            </div>
          }
        </div>
      </div>
    </>
  );
}

ConventionnementDetails.propTypes = {
  conventionnement: PropTypes.object,
};

export default ConventionnementDetails;
