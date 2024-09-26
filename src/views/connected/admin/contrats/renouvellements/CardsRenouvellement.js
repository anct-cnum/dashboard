import React from 'react';
import propTypes from 'prop-types';
import dayjs from 'dayjs';
import { formatTypeDeContrat } from '../../../../../utils/formatagesUtils';
import { ModalMode } from '../../../../../utils/enumUtils';
import { getDemandeInitiee, getSalaire } from '../../../structure/utils/functionUtils';

const CardsRenouvellement = ({ miseEnRelation, setOpenModal, urlDossierDS, handleOpenModalContrat }) => {
  const demandeInitiee = getDemandeInitiee(miseEnRelation);
  return (
    <div className="fr-card fr-mt-4w fr-card--no-border background-cards-contrat">
      <div className="fr-card__body">
        <div className="fr-card__content fr-pb-2w">
          <h3 className="fr-card__title fr-h3">
            {
              demandeInitiee ?
                'Demande de prolongation de contrat' :
                'Demande de renouvellement de contrat'
            }
          </h3>
          {miseEnRelation?.emetteurRenouvellement?.date &&
            <p className="fr-card__desc fr-text--lg fr-text--regular">
              Demande initi&eacute;e le {miseEnRelation ? dayjs(miseEnRelation.emetteurRenouvellement.date).format('DD/MM/YYYY') : ''}
            </p>
          }
          <div className="fr-card__desc fr-grid-row fr-mt-3w fr-col-12">
            <div className="fr-col-12">
              <hr style={{ borderWidth: '0.5px' }} />
            </div>
            <div className="fr-card fr-card--no-background fr-card--no-border fr-col-12 color-text color-title-subpart">
              <div className="fr-card__body fr-p-0">
                <div>
                  <div className="fr-grid-row" style={{ alignItems: 'center' }}>
                    <div className="fr-col-12 fr-mt-2w fr-mt-md-0 fr-col-md-3">
                      <div>
                        <strong className="fr-text--md">Type de contrat</strong><br />
                        <span
                          className="fr-text--regular fr-text--md"
                          title={miseEnRelation?.typeDeContrat ? formatTypeDeContrat(miseEnRelation?.typeDeContrat) : ''}
                        >
                          {miseEnRelation?.typeDeContrat ?
                            <>
                              {miseEnRelation?.typeDeContrat?.length > 15 ?
                                `${formatTypeDeContrat(miseEnRelation?.typeDeContrat)?.substring(0, 15)}...` :
                                formatTypeDeContrat(miseEnRelation?.typeDeContrat)
                              }
                            </> : '-'
                          }
                        </span>
                      </div>
                    </div>
                    <div className="fr-col-12 fr-mt-2w fr-mt-md-0 fr-col-md-3">
                      <div>
                        <strong className="fr-text--md">D&eacute;but de contrat</strong><br />
                        {miseEnRelation?.dateDebutDeContrat ?
                          <span className="fr-text--regular fr-text--md">
                            {dayjs(miseEnRelation?.dateDebutDeContrat).format('DD/MM/YYYY')}
                          </span> : <span>-</span>
                        }
                      </div>
                    </div>
                    <div className="fr-col-12 fr-mt-2w fr-mt-md-0 fr-col-md-3">
                      <div>
                        <strong className="fr-text--md">Fin de contrat</strong><br />
                        {!miseEnRelation?.dateFinDeContrat &&
                          <span className="fr-text--regular fr-text--md">-</span>
                        }
                        {miseEnRelation?.dateFinDeContrat &&
                          <span className="fr-text--regular fr-text--md">
                            {dayjs(demandeInitiee ?
                              demandeInitiee?.dateDeFinSouhaitee :
                              miseEnRelation?.dateFinDeContrat).format('DD/MM/YYYY')}
                          </span>
                        }
                      </div>
                    </div>
                    <div className="fr-col-12 fr-mt-2w fr-mt-md-0 fr-col-md-3">
                      <div>
                        <strong className="fr-text--md">Salaire brut mensuel</strong><br />
                        <span className="fr-text--regular fr-text--md">
                          {getSalaire(miseEnRelation) === '' ? '-' : `${getSalaire(miseEnRelation)} €` }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fr-col-12 fr-mt-2w">
              <hr style={{ borderWidth: '0.5px' }} />
            </div>
          </div>
          <div className="fr-card__start fr-mb-0" style={{ textAlign: 'end' }}>
            {miseEnRelation?.statut === 'finalisee' && !demandeInitiee ?
              <p className="fr-badge fr-badge--success">Demande valid&eacute;e</p> :
              <p className="fr-badge fr-badge--new">Demande en attente de validation</p>
            }
          </div>
        </div>
        <div className="fr-card__footer">
          <ul className="fr-btns-group fr-btns-group--icon-left fr-btns-group--inline-reverse fr-btns-group--inline-lg">
            {(miseEnRelation?.statut === 'renouvellement_initiee' || demandeInitiee) &&
              <li>
                <button
                  className="fr-btn fr-btn--secondary"
                  onClick= {
                    demandeInitiee ?
                      () => handleOpenModalContrat(ModalMode.PROLONGATION) :
                      () => handleOpenModalContrat(ModalMode.EDITION)
                  }
                >
                  Modifier la demande
                </button>
                <button
                  className="fr-btn"
                  aria-controls="fr-modal-3"
                  onClick={() => setOpenModal(true)}
                >
                  Valider la demande
                </button>
              </li>
            }
            <li className="fr-ml-auto">
              <a className="fr-btn fr-btn--secondary" href={urlDossierDS} target="_blank" rel="noopener noreferrer">
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
  setOpenModalContrat: propTypes.func,
  urlDossierDS: propTypes.string,
  handleOpenModalContrat: propTypes.func,
};

export default CardsRenouvellement;
