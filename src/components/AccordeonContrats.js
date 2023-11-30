import React from 'react';
import PropTypes from 'prop-types';
import { formatMotifRupture, formatTypeDeContrat, validTypeDeContratWithoutEndDate } from '../utils/formatagesUtils';
import dayjs from 'dayjs';

// eslint-disable-next-line max-len
function AccordeonContrats({ misesEnRelationNouvelleRupture, misesEnRelationFinaliseeRupture, misesEnRelationFinalisee, misesEnRelationTermineeNaturel, conseiller }) {

  return (
    <section className="fr-accordion display-mobile fr-mb-2w">
      <h3 className="fr-accordion__title">
        <button className="fr-accordion__btn fr-text--xl" aria-expanded="false" aria-controls="accordion-activiter">Voir les activités</button>
      </h3>
      <div className="fr-collapse color-text color-title-subpart" id="accordion-activiter">
        <div className="fr-grid-row fr-col-12">
          {misesEnRelationNouvelleRupture &&
            <div className="fr-card fr-col-12 fr-p-4w">
              <div className="fr-card__body" style={{ padding: '0 0' }}>
                <div>
                  <div className="fr-grid-row fr-grid-row--middle">
                    <div className="fr-col-12 fr-mb-2w">
                      <p className="fr-badge fr-badge--warning">Rupture en cours</p>
                    </div>
                    <div className="fr-col-12 fr-col-md-4 fr-mb-md-0 fr-mb-2w">
                      <div>
                        <strong className="fr-text--md">Rupture initi&eacute;e</strong><br />
                        {misesEnRelationNouvelleRupture?.emetteurRupture?.date ?
                          <span className="fr-text--regular fr-text--md">
                            {dayjs(misesEnRelationNouvelleRupture?.emetteurRupture?.date).format('DD/MM/YYYY')}
                          </span> : <span>-</span>
                        }
                      </div>
                    </div>
                    <div className="fr-col-12 fr-col-md-4 fr-mb-md-0 fr-mb-2w">
                      <div>
                        <strong className="fr-text--md">Motif</strong><br />
                        <span className="fr-text--regular fr-text--md">
                          {formatMotifRupture(misesEnRelationNouvelleRupture?.motifRupture)}
                        </span>
                      </div>
                    </div>
                    <div className="fr-col-12 fr-col-md-4">
                      <div>
                        <strong className="fr-text--md">&Eacute;tat du dossier</strong><br />
                        <span className="fr-text--regular fr-text--md">
                          {misesEnRelationNouvelleRupture?.dossierIncompletRupture === true && <>Incomplet</>}
                          {misesEnRelationNouvelleRupture?.dossierIncompletRupture === false && <>Nouvelle demande</>}
                          {misesEnRelationNouvelleRupture?.dossierIncompletRupture === undefined && <>Complet</>}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          {(misesEnRelationFinalisee?.length > 0 || misesEnRelationNouvelleRupture) &&
            <div className={`fr-card fr-col-12 fr-p-4w ${misesEnRelationNouvelleRupture ? 'fr-mt-3w' : ''}`}>
              <div className="fr-card__body" style={{ padding: '0 0' }}>
                <div>
                  <div className="fr-grid-row fr-grid-row--middle">
                    <div className="fr-col-12 fr-mb-2w">
                      <p className="fr-badge fr-badge--success">Contrat en cours</p>
                    </div>
                    <div className="fr-col-12 fr-col-md-4 fr-mb-md-0 fr-mb-2w">
                      <div>
                        <strong className="fr-text--md">Type de contrat</strong><br />
                        {(!misesEnRelationFinalisee[0]?.typeDeContrat && !misesEnRelationNouvelleRupture?.typeDeContrat) &&
                          <span className="fr-text--regular fr-text--md">-</span>
                        }
                        {misesEnRelationFinalisee[0]?.typeDeContrat ?
                          <span className="fr-text--regular fr-text--md">{formatTypeDeContrat(misesEnRelationFinalisee[0]?.typeDeContrat)}</span> :
                          <span className="fr-text--regular fr-text--md">{formatTypeDeContrat(misesEnRelationNouvelleRupture?.typeDeContrat)}</span>
                        }
                      </div>
                    </div>
                    <div className="fr-col-12 fr-col-md-4 fr-mb-md-0 fr-mb-2w">
                      <div>
                        <strong className="fr-text--md">D&eacute;but de contrat</strong><br />
                        {(!misesEnRelationFinalisee[0]?.dateDebutDeContrat && !misesEnRelationNouvelleRupture?.dateDebutDeContrat) &&
                          <span className="fr-text--regular fr-text--md">En attente de pi&egrave;ces justificatives</span>
                        }
                        {misesEnRelationFinalisee[0]?.dateDebutDeContrat &&
                          <span className="fr-text--regular fr-text--md">
                            {dayjs(misesEnRelationFinalisee[0].dateDebutDeContrat).format('DD/MM/YYYY')}
                          </span>
                        }
                        {misesEnRelationNouvelleRupture?.dateDebutDeContrat &&
                          <span className="fr-text--regular fr-text--md">
                            {dayjs(misesEnRelationNouvelleRupture.dateDebutDeContrat).format('DD/MM/YYYY')}
                          </span>
                        }
                      </div>
                    </div>
                    <div className="fr-col-12 fr-col-md-4">
                      <div>
                        <strong className="fr-text--md">Fin de contrat</strong><br />
                        {(!misesEnRelationFinalisee[0]?.dateFinDeContrat && !misesEnRelationNouvelleRupture?.dateFinDeContrat) &&
                          <>
                            {(validTypeDeContratWithoutEndDate(misesEnRelationNouvelleRupture?.typeDeContrat) ||
                              validTypeDeContratWithoutEndDate(misesEnRelationFinalisee[0]?.typeDeContrat)) ?
                              <span className="fr-text--regular fr-text--md">-</span> :
                              <span className="fr-text--regular fr-text--md">En attente de pi&egrave;ces justificatives</span>
                            }
                          </>
                        }
                        {misesEnRelationFinalisee[0]?.dateFinDeContrat &&
                          <>
                            {(
                              validTypeDeContratWithoutEndDate(misesEnRelationFinalisee[0]?.typeDeContrat)) ?
                              <span className="fr-text--regular fr-text--md">-</span> :
                              <span className="fr-text--regular fr-text--md">{dayjs(misesEnRelationFinalisee[0].dateFinDeContrat).format('DD/MM/YYYY')}</span>
                            }
                          </>
                        }
                        {misesEnRelationNouvelleRupture?.dateFinDeContrat &&
                          <>
                            {(
                              validTypeDeContratWithoutEndDate(misesEnRelationNouvelleRupture.dateFinDeContrat)) ?
                              <span className="fr-text--regular fr-text--md">-</span> :
                              <span className="fr-text--regular fr-text--md">
                                {dayjs(misesEnRelationNouvelleRupture.dateFinDeContrat).format('DD/MM/YYYY')}
                              </span>
                            }
                          </>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          {misesEnRelationFinaliseeRupture?.map(miseEnRelation =>
            <div
              className={`fr-card fr-col-12 fr-p-4w ${misesEnRelationFinalisee?.length > 0 || misesEnRelationNouvelleRupture ? 'fr-mt-3w' : ''}`}
              key={miseEnRelation?._id}
              style={{ paddingLeft: '1rem' }}
            >
              <div className="fr-card__body" style={{ padding: '0 0' }}>
                <div>
                  <div className="fr-grid-row fr-grid-row--middle">
                    <div className="fr-col-12 fr-mb-2w">
                      <p className="fr-badge fr-badge--error">Contrat Termin&eacute;</p>
                    </div>
                    <div className="fr-col-12 fr-mb-2w">
                      <strong className="fr-text--md fr-col-12 fr-mb-0">
                        {miseEnRelation?.structureObj?.nom}
                      </strong><br />
                      <span className="fr-text--md">ID - {miseEnRelation?.structureObj?.idPG}</span>
                    </div>
                    <div className="fr-col-12 fr-mb-md-0 fr-mb-2w fr-col-md-4">
                      <div>
                        <strong className="fr-text--md">Type de contrat</strong><br />
                        <span className="fr-text--regular fr-text--md">
                          {miseEnRelation?.typeDeContrat ? formatTypeDeContrat(miseEnRelation?.typeDeContrat) : '-'}
                        </span>
                      </div>
                    </div>
                    <div className="fr-col-12 fr-col-md-4 fr-mb-md-0 fr-mb-2w">
                      <div>
                        <strong className="fr-text--md">D&eacute;but de contrat</strong><br />
                        {miseEnRelation?.dateDebutDeContrat ?
                          <span className="fr-text--regular fr-text--md">
                            {dayjs(miseEnRelation?.dateDebutDeContrat).format('DD/MM/YYYY')}
                          </span> : <span>En attente de pi&egrave;ces justificatives</span>
                        }
                      </div>
                    </div>
                    <div className="fr-col-12 fr-col-md-4">
                      <div>
                        <strong className="fr-text--md" style={{ fontWeight: '500' }}>Fin de contrat</strong><br />
                        {miseEnRelation?.dateRupture ?
                          <span className="fr-text--regular fr-text--md">
                            {dayjs(miseEnRelation?.dateRupture).format('DD/MM/YYYY')}
                          </span> : <span>-</span>
                        }
                      </div>
                    </div>
                    <div className="fr-col-12 fr-mt-2w">
                      <div>
                        <strong className="fr-text--md" style={{ fontWeight: '500' }}>Motif</strong><br />
                        <span className="fr-text--regular fr-text--md" title={miseEnRelation?.motifRupture}>
                          {formatMotifRupture(miseEnRelation?.motifRupture)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {misesEnRelationTermineeNaturel?.map(miseEnRelation =>
            <div
              // eslint-disable-next-line max-len
              className={`fr-card fr-col-12 fr-p-4w ${misesEnRelationFinalisee?.length > 0 || misesEnRelationNouvelleRupture || misesEnRelationFinaliseeRupture?.length > 0 ? 'fr-mt-3w' : ''}`}
              key={miseEnRelation?._id}
              style={{ paddingLeft: '1rem' }}
            >
              <div className="fr-card__body" style={{ padding: '0 0' }}>
                <div>
                  <div className="fr-grid-row fr-grid-row--middle">
                    <div className="fr-col-12 fr-mb-2w">
                      <p className="fr-badge fr-badge--error">Contrat Termin&eacute;</p>
                    </div>
                    <div className="fr-col-12 fr-mb-2w">
                      <strong className="fr-text--md fr-col-12 fr-mb-0">
                        {miseEnRelation?.structureObj?.nom}
                      </strong><br />
                      <span className="fr-text--md">ID - {miseEnRelation?.structureObj?.idPG}</span>
                    </div>
                    <div className="fr-col-12 fr-mb-md-0 fr-mb-2w fr-col-md-4">
                      <div>
                        <strong className="fr-text--md">Type de contrat</strong><br />
                        <span className="fr-text--regular fr-text--md">
                          {miseEnRelation?.typeDeContrat ? formatTypeDeContrat(miseEnRelation?.typeDeContrat) : '-'}
                        </span>
                      </div>
                    </div>
                    <div className="fr-col-12 fr-col-md-4 fr-mb-md-0 fr-mb-2w">
                      <div>
                        <strong className="fr-text--md">D&eacute;but de contrat</strong><br />
                        {miseEnRelation?.dateDebutDeContrat ?
                          <span className="fr-text--regular fr-text--md">
                            {dayjs(miseEnRelation?.dateDebutDeContrat).format('DD/MM/YYYY')}
                          </span> : <span>-</span>
                        }
                      </div>
                    </div>
                    <div className="fr-col-12 fr-col-md-4">
                      <div>
                        <strong className="fr-text--md" style={{ fontWeight: '500' }}>Fin de contrat</strong><br />
                        {miseEnRelation?.dateFinDeContrat ?
                          <span className="fr-text--regular fr-text--md">
                            {dayjs(miseEnRelation?.dateFinDeContrat).format('DD/MM/YYYY')}
                          </span> : <span>-</span>
                        }
                      </div>
                    </div>
                    <div className="fr-col-12 fr-mt-2w">
                      <div>
                        <strong className="fr-text--md" style={{ fontWeight: '500' }}>Motif</strong><br />
                        <span className="fr-text--regular fr-text--md">
                          Non reconduction du contrat
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="fr-card fr-col-12 fr-mt-3w fr-p-4w">
            <div className="fr-card__body" style={{ padding: '0 0' }}>
              <div>
                <div className="fr-grid-row fr-grid-row--middle">
                  <div className="fr-col-12 fr-mb-2w">
                    <p className="fr-badge fr-badge--info">Formation</p>
                  </div>
                  <div className="fr-col-12 fr-col-md-4 fr-mb-md-0 fr-mb-2w">
                    <div>
                      <strong className="fr-text--md" style={{ fontWeight: '500' }}>Formation certifi&eacute;(e)</strong><br />
                      <span className="fr-text--regular fr-text--md">{conseiller?.certifie ? 'Oui' : 'Non'}</span>
                    </div>
                  </div>
                  <div className="fr-col-12 fr-col-md-4 fr-mb-md-0 fr-mb-2w">
                    <div>
                      <strong className="fr-text--md" style={{ fontWeight: '500' }}>D&eacute;but de formation</strong><br />
                      {conseiller?.datePrisePoste ?
                        <span className="fr-text--regular fr-text--md">
                          {dayjs(conseiller?.datePrisePoste).format('DD/MM/YYYY')}
                        </span> : <span>-</span>
                      }
                    </div>
                  </div>
                  <div className="fr-col-12 fr-col-md-4">
                    <div>
                      <strong className="fr-text--md" style={{ fontWeight: '500' }}>Fin de formation</strong><br />
                      {conseiller?.dateFinFormation ?
                        <span className="fr-text--regular fr-text--md">
                          {dayjs(conseiller?.dateFinFormation).format('DD/MM/YYYY')}
                        </span> : <span>-</span>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

AccordeonContrats.propTypes = {
  misesEnRelationNouvelleRupture: PropTypes.object,
  misesEnRelationFinaliseeRupture: PropTypes.array,
  misesEnRelationFinalisee: PropTypes.array,
  misesEnRelationTermineeNaturel: PropTypes.array,
  conseiller: PropTypes.object,
};

export default AccordeonContrats;
