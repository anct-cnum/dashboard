import React from 'react';
import PropTypes from 'prop-types';
import { formatMotifRupture } from '../utils/formatagesUtils';
import dayjs from 'dayjs';

function AccordeonActiviter({ misesEnRelationNouvelleRupture, misesEnRelationFinaliseeRupture, misesEnRelationFinalisee, conseiller }) {

  return (
    <section className="fr-accordion display-mobile fr-mb-2w">
      <h3 className="fr-accordion__title">
        <button className="fr-accordion__btn fr-text--xl" aria-expanded="false" aria-controls="accordion-106">Voir les activités</button>
      </h3>
      <div className="fr-collapse" id="accordion-106">
        <div className="fr-grid-row fr-col-12">
          {misesEnRelationNouvelleRupture &&
        <div className="fr-card fr-col-12 fr-p-4w">
          <div className="fr-card__body" style={{ padding: '0 0' }}>
            <div>
              <div className="fr-grid-row" style={{ alignItems: 'center' }}>
                <div className="fr-col-12 fr-mb-2w">
                  <p className="fr-badge fr-badge--warning">Rupture en cours</p>
                </div>
                <div className="fr-col-12 fr-col-md-4 fr-mb-md-0 fr-mb-2w">
                  <div>
                    <span className="fr-text--md" style={{ fontWeight: '500' }}>Rupture initi&eacute;e</span><br/>
                    {misesEnRelationNouvelleRupture?.emetteurRupture?.date ?
                      <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                        {dayjs(misesEnRelationNouvelleRupture?.emetteurRupture?.date).format('DD/MM/YYYY')}
                      </span> : <span>-</span>
                    }
                  </div>
                </div>
                <div className="fr-col-12 fr-col-md-4 fr-mb-md-0 fr-mb-2w">
                  <div>
                    <span className="fr-text--md" style={{ fontWeight: '500' }}>Motif</span><br/>
                    <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                      {formatMotifRupture(misesEnRelationNouvelleRupture?.motifRupture)}
                    </span>
                  </div>
                </div>
                <div className="fr-col-12 fr-col-md-4">
                  <div>
                    <span className="fr-text--md" style={{ fontWeight: '500' }}>Etat du dossier</span><br/>
                    <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                      {misesEnRelationNouvelleRupture?.dossierIncompletRupture ? 'Incomplet' : 'Complet'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          }
          {(misesEnRelationFinalisee.length > 0 || misesEnRelationNouvelleRupture) &&
          <div className={`fr-card fr-col-12 fr-p-4w ${misesEnRelationNouvelleRupture ? 'fr-mt-3w' : ''}`}>
            <div className="fr-card__body" style={{ padding: '0 0' }}>
              <div>
                <div className="fr-grid-row" style={{ alignItems: 'center' }}>
                  <div className="fr-col-12 fr-mb-2w">
                    <p className="fr-badge fr-badge--success">Contrat en cours</p>
                  </div>
                  <div className="fr-col-12 fr-col-md-4 fr-mb-md-0 fr-mb-2w">
                    <div>
                      <span className="fr-text--md" style={{ fontWeight: '500' }}>Type de contrat</span><br/>
                      <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>-</span>
                    </div>
                  </div>
                  <div className="fr-col-12 fr-col-md-4 fr-mb-md-0 fr-mb-2w">
                    <div>
                      <span className="fr-text--md" style={{ fontWeight: '500' }}>Début de contrat</span><br/>
                      {misesEnRelationFinalisee[0]?.dateRecrutement ?
                        <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                          {dayjs(misesEnRelationFinalisee[0]?.dateRecrutement).format('DD/MM/YYYY')}
                        </span> :
                        <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                          {dayjs(misesEnRelationNouvelleRupture?.dateRecrutement).format('DD/MM/YYYY')}
                        </span>
                      }
                    </div>
                  </div>
                  <div className="fr-col-12 fr-col-md-4">
                    <div>
                      <span className="fr-text--md" style={{ fontWeight: '500' }}>Fin de contrat</span><br/>
                      {(!misesEnRelationFinalisee[0]?.dateFinDeContrat && !misesEnRelationNouvelleRupture?.dateFinDeContrat) &&
                        <span>-</span>
                      }
                      {misesEnRelationFinalisee[0]?.dateFinDeContrat &&
                        <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                          {dayjs(misesEnRelationFinalisee[0]?.dateFinDeContrat).format('DD/MM/YYYY')}
                        </span>
                      }
                      {misesEnRelationNouvelleRupture?.dateFinDeContrat &&
                        <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                          {dayjs(misesEnRelationNouvelleRupture.dateFinDeContrat).format('DD/MM/YYYY')}
                        </span>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          }
          {misesEnRelationFinaliseeRupture?.map((miseEnRelation, idx) =>
            <>
              <div
                className={`fr-card fr-col-12 fr-p-4w ${misesEnRelationFinalisee.length > 0 || misesEnRelationNouvelleRupture ? 'fr-mt-3w' : ''}`}
                key={idx}
                style={{ paddingLeft: '1rem' }}
              >
                <div className="fr-card__body" style={{ padding: '0 0' }}>
                  <div>
                    <div className="fr-grid-row" style={{ alignItems: 'center' }}>
                      <div className="fr-col-12 fr-mb-2w">
                        <p className="fr-badge fr-badge--error">Contrat Termin&eacute;</p>
                      </div>
                      <div className="fr-col-12">
                        <div className="fr-grid-row fr-col-12">
                          <span className="fr-text--md fr-col-12 fr-mb-0" style={{ fontWeight: '500' }}>Nom de la structure</span><br/>
                          <span className="fr-text--regular fr-text--md fr-col-12 fr-mb-0" style={{ color: '#666666' }}>
                            {miseEnRelation?.structureObj?.nom}
                          </span>
                          <span className="fr-text--md" style={{ color: '#666666' }}>ID - {miseEnRelation?.structureObj?.idPG}</span>
                        </div>
                      </div>
                      <div className="fr-col-12 fr-mb-md-0 fr-mb-2w fr-col-md-4">
                        <div>
                          <span className="fr-text--md" style={{ fontWeight: '500' }}>Type de contrat</span><br/>
                          <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>-</span>
                        </div>
                      </div>
                      <div className="fr-col-12 fr-col-md-4 fr-mb-md-0 fr-mb-2w">
                        <div>
                          <span className="fr-text--md" style={{ fontWeight: '500' }}>D&eacute;but de contrat</span><br/>
                          {miseEnRelation?.dateRecrutement ?
                            <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                              {dayjs(miseEnRelation?.dateRecrutement).format('DD/MM/YYYY')}
                            </span> : <span>-</span>
                          }
                        </div>
                      </div>
                      <div className="fr-col-12 fr-col-md-4">
                        <div>
                          <span className="fr-text--md" style={{ fontWeight: '500' }}>Fin de contrat</span><br/>
                          {miseEnRelation?.dateRupture ?
                            <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                              {dayjs(miseEnRelation?.dateRupture).format('DD/MM/YYYY')}
                            </span> : <span>-</span>
                          }
                        </div>
                      </div>
                      <div className="fr-col-12 fr-mt-2w">
                        <div>
                          <span className="fr-text--md" style={{ fontWeight: '500' }}>Motif</span><br/>
                          <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }} title={miseEnRelation?.motifRupture}>
                            {formatMotifRupture(miseEnRelation?.motifRupture)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="fr-card fr-col-12 fr-mt-3w fr-p-4w">
            <div className="fr-card__body" style={{ padding: '0 0' }}>
              <div>
                <div className="fr-grid-row" style={{ alignItems: 'center' }}>
                  <div className="fr-col-12 fr-mb-2w">
                    <p className="fr-badge fr-badge--info">Formation</p>
                  </div>
                  <div className="fr-col-12 fr-col-md-4 fr-mb-md-0 fr-mb-2w">
                    <div>
                      <span className="fr-text--md" style={{ fontWeight: '500' }}>Formation certifié(e)</span><br/>
                      <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>{conseiller?.certifie ? 'Oui' : 'Non'}</span>
                    </div>
                  </div>
                  <div className="fr-col-12 fr-col-md-4 fr-mb-md-0 fr-mb-2w">
                    <div>
                      <span className="fr-text--md" style={{ fontWeight: '500' }}>Début de formation</span><br/>
                      {conseiller?.datePrisePoste ?
                        <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                          {dayjs(conseiller?.datePrisePoste).format('DD/MM/YYYY')}
                        </span> : <span>-</span>
                      }
                    </div>
                  </div>
                  <div className="fr-col-12 fr-col-md-4">
                    <div>
                      <span className="fr-text--md" style={{ fontWeight: '500' }}>Fin de formation</span><br/>
                      {conseiller?.dateFinFormation ?
                        <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
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

AccordeonActiviter.propTypes = {
  setForm: PropTypes.func,
  misesEnRelationNouvelleRupture: PropTypes.object,
  misesEnRelationFinaliseeRupture: PropTypes.object,
  misesEnRelationFinalisee: PropTypes.object,
  conseiller: PropTypes.object,
};
export default AccordeonActiviter;

