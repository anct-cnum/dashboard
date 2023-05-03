import React from 'react';
import propTypes from 'prop-types';
import dayjs from 'dayjs';

const CardsRenouvellement = ({ miseEnRelation, setOpenModal }) => {

  return (
    <div className="fr-card fr-mt-4w fr-card--no-border" style={{ backgroundColor: '#E8EDFF' }}>
      <div className="fr-card__body">
        <div className="fr-card__content fr-pb-2w">
          <h3 className="fr-card__title fr-h3">
            Demande de renouvellement de contrat
          </h3>
          {miseEnRelation?.emetteurRupture?.date &&
          <p className="fr-card__desc fr-text--lg fr-text--regular">
            Demande initi&eacute;e le {miseEnRelation ? dayjs(miseEnRelation.emetteurRupture.date).format('DD/MM/YYYY') : ''}
          </p>
          }
          <div className="fr-card__desc fr-grid-row fr-mt-3w fr-col-12">
            <div className="fr-col-12">
              <hr style={{ borderWidth: '0.5px' }} />
            </div>
            <div className="fr-card fr-card--no-background fr-card--no-border fr-col-12">
              <div className="fr-card__body fr-p-0">
                <div>
                  <div className="fr-grid-row" style={{ alignItems: 'center' }}>
                    <div className="fr-col-3 fr-col-xl-3">
                      <div>
                        <strong className="fr-text--md">Type de contrat</strong><br />
                        <span className="fr-text--regular fr-text--md">{miseEnRelation?.typeDeContrat ?? '-'}</span>
                      </div>
                    </div>
                    <div className="fr-col-3 fr-col-xl-3">
                      <div>
                        <strong className="fr-text--md">D&eacute;but de contrat</strong><br />
                        {miseEnRelation?.dateDebutDeContrat ?
                          <span className="fr-text--regular fr-text--md">
                            {dayjs(miseEnRelation?.dateDebutDeContrat).format('DD/MM/YYYY')}
                          </span> : <span>-</span>
                        }
                      </div>
                    </div>
                    <div className="fr-col-3 fr-col-xl-3">
                      <div>
                        <strong className="fr-text--md">Fin de contrat</strong><br />
                        {miseEnRelation?.dateFinDeContrat ?
                          <span className="fr-text--regular fr-text--md">
                            {dayjs(miseEnRelation?.dateFinDeContrat).format('DD/MM/YYYY')}
                          </span> : <span>-</span>
                        }
                      </div>
                    </div>
                    <div className="fr-col-3 fr-col-xl-3">
                      <div>
                        <strong className="fr-text--md">Salaire brut mensuel</strong><br />
                        <span className="fr-text--regular fr-text--md">{miseEnRelation?.salaireBrutMensuel ?? '-'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fr-col-12 fr-mt-2w">
              <hr style={{ borderWidth: '0.5px' }}/>
            </div>
          </div>
          <div className="fr-card__start fr-mb-0" style={{ textAlign: 'end' }}>
            {miseEnRelation?.statut === 'finalisee_rupture' ?
              <p className="fr-badge fr-badge--success">Demande valid&eacute;e</p> :
              <p className="fr-badge fr-badge--new">Demande en attente de validation</p>
            }
          </div>
        </div>
        <div className="fr-card__footer">
          <ul className="fr-btns-group fr-btns-group--icon-left fr-btns-group--inline-reverse fr-btns-group--inline-lg">
            {miseEnRelation?.statut === 'nouvelle_rupture' &&
            <li>
              <button
                className="fr-btn fr-btn--secondary"
              >
                Modifier la demande
              </button>
              <button
                className="fr-btn"
                onClick={() => setOpenModal(true)}
              >
                Valider la demande
              </button>
            </li>
            }
            <li className="fr-ml-auto">
              <a className="fr-btn fr-btn--secondary" href={miseEnRelation?.url} target="_blank" rel="noopener noreferrer">
                Voir le dossier D&eacute;marche Simplifi&eacute;e
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

CardsRenouvellement.propTypes = {
  miseEnRelation: propTypes.object,
  setOpenModal: propTypes.func,
};

export default CardsRenouvellement;
