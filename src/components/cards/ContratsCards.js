import React from 'react';
import PropTypes from 'prop-types';
import { formatMotifRupture } from '../../utils/formatagesUtils';
import dayjs from 'dayjs';

function ContratsCards({ misesEnRelationNouvelleRupture, misesEnRelationFinaliseeRupture, misesEnRelationFinalisee, conseiller }) {
  const checkMotifRupture = motif => !!(motif === 'licenciement' || motif === 'demission');

  return (
    <>
      <div className="fr-grid-row fr-col-12 display-desktop color-text color-title-subpart">
        {misesEnRelationNouvelleRupture &&
        <div className="fr-card fr-col-12 fr-p-4w">
          <div className="fr-card__body" style={{ padding: '0 0' }}>
            <div>
              <div className="fr-grid-row" style={{ alignItems: 'center' }}>
                <div className="fr-col-3">
                  <p className="fr-badge fr-badge--warning">Rupture en cours</p>
                </div>
                <div className="fr-col-3">
                  <div>
                    <strong className="fr-text--md">Rupture initi&eacute;e</strong><br/>
                    {misesEnRelationNouvelleRupture?.emetteurRupture?.date ?
                      <span className="fr-text--regular fr-text--md">
                        {dayjs(misesEnRelationNouvelleRupture?.emetteurRupture?.date).format('DD/MM/YYYY')}
                      </span> : <span>-</span>
                    }
                  </div>
                </div>
                <div className="fr-col-3">
                  <div>
                    <strong className="fr-text--md">Motif</strong><br/>
                    <span className="fr-text--regular fr-text--md">
                      {formatMotifRupture(misesEnRelationNouvelleRupture?.motifRupture)}
                    </span>
                  </div>
                </div>
                <div className="fr-col-3">
                  <div>
                    <strong className="fr-text--md">&Eacute;tat du dossier</strong><br/>
                    <span className="fr-text--regular fr-text--md">
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
                  <div className="fr-col-3">
                    <p className="fr-badge fr-badge--success">Contrat en cours</p>
                  </div>
                  <div className="fr-col-3">
                    <div>
                      <strong className="fr-text--md">Type de contrat</strong><br/>
                      {(!misesEnRelationFinalisee[0]?.typeDeContrat && !misesEnRelationNouvelleRupture?.typeDeContrat) &&
                        <span className="fr-text--regular fr-text--md">-</span>
                      }
                      {misesEnRelationFinalisee[0]?.typeDeContrat ?
                        <span className="fr-text--regular fr-text--md">{misesEnRelationFinalisee[0].typeDeContrat}</span> :
                        <span className="fr-text--regular fr-text--md">{misesEnRelationNouvelleRupture?.typeDeContrat}</span>
                      }
                    </div>
                  </div>
                  <div className="fr-col-3">
                    <div>
                      <strong className="fr-text--md">D&eacute;but de contrat</strong><br/>
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
                  <div className="fr-col-3">
                    <div>
                      <strong className="fr-text--md">Fin de contrat</strong><br/>
                      {(!misesEnRelationFinalisee[0]?.dateFinDeContrat && !misesEnRelationNouvelleRupture?.dateFinDeContrat) &&
                        <span className="fr-text--regular fr-text--md">En attente de pi&egrave;ces justificatives</span>
                      }
                      {misesEnRelationFinalisee[0]?.dateFinDeContrat &&
                        <span className="fr-text--regular fr-text--md">
                          {dayjs(misesEnRelationFinalisee[0].dateFinDeContrat).format('DD/MM/YYYY')}
                        </span>
                      }
                      {misesEnRelationNouvelleRupture?.dateFinDeContrat &&
                        <span className="fr-text--regular fr-text--md">
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
              // eslint-disable-next-line max-len
              className={`fr-card fr-col-12 fr-p-4w contrat-terminer ${misesEnRelationFinalisee.length > 0 || misesEnRelationNouvelleRupture ? 'fr-mt-3w' : ''}`}
              key={idx}
              style={{ paddingLeft: '1rem' }}
            >
              <div className="fr-card__body" style={{ padding: '0 0' }}>
                <div>
                  <div className="fr-grid-row" style={{ alignItems: 'center' }}>
                    <div className="badge">
                      <p className="fr-badge fr-badge--error">Contrat Termin&eacute;</p>
                    </div>
                    <div className={`${checkMotifRupture(miseEnRelation?.motifRupture) ? 'structure-long' : 'structure-court'}`}>
                      <strong className="fr-text--md" title={miseEnRelation?.structureObj?.nom}>
                        {miseEnRelation?.structureObj?.nom?.length > 15 ?
                          `${miseEnRelation?.structureObj?.nom.substring(0, 15)}...` : miseEnRelation?.structureObj?.nom
                        }
                      </strong><br/>
                      <span className="fr-text--md">ID - {miseEnRelation?.structureObj?.idPG}</span>
                    </div>
                    <div className={`${checkMotifRupture(miseEnRelation?.motifRupture) ? 'fr-col-2' : 'type-contrat'}`}>
                      <div>
                        <strong className="fr-text--md">Type de contrat</strong><br/>
                        <span className="fr-text--regular fr-text--md">{miseEnRelation?.typeDeContrat ?? '-'}</span>
                      </div>
                    </div>
                    <div className="fr-col-2">
                      <div>
                        <strong className="fr-text--md">D&eacute;but de contrat</strong><br/>
                        {miseEnRelation?.dateDebutDeContrat ?
                          <span className="fr-text--regular fr-text--md">
                            {dayjs(miseEnRelation?.dateDebutDeContrat).format('DD/MM/YYYY')}
                          </span> : <span>-</span>
                        }
                      </div>
                    </div>
                    <div className={`${checkMotifRupture(miseEnRelation?.motifRupture) ? 'fr-col-2' : 'fin-contrat'}`}>
                      <div>
                        <strong className="fr-text--md">Fin de contrat</strong><br/>
                        {miseEnRelation?.dateRupture ?
                          <span className="fr-text--regular fr-text--md">
                            {dayjs(miseEnRelation?.dateRupture).format('DD/MM/YYYY')}
                          </span> : <span>-</span>
                        }
                      </div>
                    </div>
                    <div className={`${checkMotifRupture(miseEnRelation?.motifRupture) ? 'motif-court' : 'motif-long'}`}>
                      <div>
                        <strong className="fr-text--md">Motif</strong><br/>
                        <span className="fr-text--regular fr-text--md" title={miseEnRelation?.motifRupture}>
                          {miseEnRelation?.motifRupture.length > 27 ?
                            `${miseEnRelation?.motifRupture.substring(0, 27)}...` : formatMotifRupture(miseEnRelation?.motifRupture)
                          }
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
                <div className="fr-col-3">
                  <p className="fr-badge fr-badge--info">Formation</p>
                </div>
                <div className="fr-col-3">
                  <div>
                    <strong className="fr-text--md">Formation certifi&eacute;(e)</strong><br/>
                    <span className="fr-text--regular fr-text--md">{conseiller?.certifie ? 'Oui' : 'Non'}</span>
                  </div>
                </div>
                <div className="fr-col-3">
                  <div>
                    <strong className="fr-text--md">D&eacute;but de formation</strong><br/>
                    {conseiller?.datePrisePoste ?
                      <span className="fr-text--regular fr-text--md">
                        {dayjs(conseiller?.datePrisePoste).format('DD/MM/YYYY')}
                      </span> : <span>-</span>
                    }
                  </div>
                </div>
                <div className="fr-col-3">
                  <div>
                    <strong className="fr-text--md">Fin de formation</strong><br/>
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
    </>
  );
}

ContratsCards.propTypes = {
  misesEnRelationNouvelleRupture: PropTypes.object,
  misesEnRelationFinaliseeRupture: PropTypes.object,
  misesEnRelationFinalisee: PropTypes.object,
  conseiller: PropTypes.object,
};

export default ContratsCards;
