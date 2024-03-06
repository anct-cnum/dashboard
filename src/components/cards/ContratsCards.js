import React from 'react';
import PropTypes from 'prop-types';
import { formatMotifRupture, formatTypeDeContrat, validTypeDeContratWithoutEndDate } from '../../utils/formatagesUtils';
import dayjs from 'dayjs';

function ContratsCards({ misesEnRelationNouvelleRupture, misesEnRelationSansMission, misesEnRelationFinalisee, conseiller }) {
  return (
    <>
      <div className="fr-grid-row fr-col-12 display-desktop color-text color-title-subpart">
        {misesEnRelationNouvelleRupture &&
          <div className="fr-card fr-col-12 fr-p-4w fr-mb-3w">
            <div className="fr-card__body" style={{ padding: '0 0' }}>
              <div>
                <div className="fr-grid-row fr-grid-row--middle">
                  <div className="fr-col-3">
                    <p className="fr-badge fr-badge--warning">Rupture en cours</p>
                  </div>
                  <div className="fr-col-3">
                    <div>
                      <strong className="fr-text--md">Rupture initi&eacute;e</strong><br />
                      {misesEnRelationNouvelleRupture?.emetteurRupture?.date ?
                        <span>
                          {dayjs(misesEnRelationNouvelleRupture?.emetteurRupture?.date).format('DD/MM/YYYY')}
                        </span> : <span>-</span>
                      }
                    </div>
                  </div>
                  <div className="fr-col-3">
                    <div>
                      <strong className="fr-text--md">Motif</strong><br />
                      <span>
                        {formatMotifRupture(misesEnRelationNouvelleRupture?.motifRupture)}
                      </span>
                    </div>
                  </div>
                  <div className="fr-col-3">
                    <div>
                      <strong className="fr-text--md">&Eacute;tat du dossier</strong><br />
                      <span>
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
          <div className="fr-card fr-col-12 fr-p-4w fr-mb-3w">
            <div className="fr-card__body" style={{ padding: '0 0' }}>
              <div>
                <div className="fr-grid-row fr-grid-row--middle">
                  <div className="fr-col-3">
                    <p className="fr-badge fr-badge--success">Contrat en cours</p>
                  </div>
                  <div className="fr-col-3">
                    <div>
                      <strong className="fr-text--md">Type de contrat</strong><br />
                      {(!misesEnRelationFinalisee[0]?.typeDeContrat && !misesEnRelationNouvelleRupture?.typeDeContrat) &&
                        <span>-</span>
                      }
                      {misesEnRelationFinalisee[0]?.typeDeContrat ?
                        <span>{formatTypeDeContrat(misesEnRelationFinalisee[0].typeDeContrat)}</span> :
                        <span>{formatTypeDeContrat(misesEnRelationNouvelleRupture?.typeDeContrat)}</span>
                      }
                    </div>
                  </div>
                  <div className="fr-col-3">
                    <div>
                      <strong className="fr-text--md">D&eacute;but de contrat</strong><br />
                      {(!misesEnRelationFinalisee[0]?.dateDebutDeContrat && !misesEnRelationNouvelleRupture?.dateDebutDeContrat) &&
                        <span>En attente de pi&egrave;ces justificatives</span>
                      }
                      {misesEnRelationFinalisee[0]?.dateDebutDeContrat &&
                        <span>
                          {dayjs(misesEnRelationFinalisee[0].dateDebutDeContrat).format('DD/MM/YYYY')}
                        </span>
                      }
                      {misesEnRelationNouvelleRupture?.dateDebutDeContrat &&
                        <span>
                          {dayjs(misesEnRelationNouvelleRupture.dateDebutDeContrat).format('DD/MM/YYYY')}
                        </span>
                      }
                    </div>
                  </div>
                  <div className="fr-col-3">
                    <div>
                      <strong className="fr-text--md">Fin de contrat</strong><br />
                      {(!misesEnRelationFinalisee[0]?.dateFinDeContrat && !misesEnRelationNouvelleRupture?.dateFinDeContrat) &&
                        <>
                          {(validTypeDeContratWithoutEndDate(misesEnRelationNouvelleRupture?.typeDeContrat) ||
                            validTypeDeContratWithoutEndDate(misesEnRelationFinalisee[0]?.typeDeContrat)) ?
                            <span>-</span> :
                            <span>En attente de pi&egrave;ces justificatives</span>
                          }
                        </>
                      }
                      {misesEnRelationFinalisee[0]?.dateFinDeContrat &&
                       <span className="fr-text--regular fr-text--md">{dayjs(misesEnRelationFinalisee[0].dateFinDeContrat).format('DD/MM/YYYY')}</span>
                      }
                      {misesEnRelationNouvelleRupture?.dateFinDeContrat &&
                       <span className="fr-text--regular fr-text--md">{dayjs(misesEnRelationNouvelleRupture.dateFinDeContrat).format('DD/MM/YYYY')}</span>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {misesEnRelationSansMission?.map(miseEnRelation =>
          <div
            className="fr-card fr-col-12 fr-p-4w contrat-terminer fr-mb-3w"
            key={miseEnRelation?._id}
            style={{ paddingLeft: '1rem' }}
          >
            <div className="fr-card__body" style={{ padding: '0 0' }}>
              <div>
                <div className="fr-grid-row fr-grid-row--middle">
                  <div className="badge">
                    <p className="fr-badge fr-badge--error">Contrat Termin&eacute;</p>
                  </div>
                  <div className="structure">
                    <strong className="fr-text--md" title={miseEnRelation?.structureObj?.nom}>
                      {miseEnRelation?.structureObj?.nom}
                    </strong>
                    <span className="fr-text--md">ID - {miseEnRelation?.structureObj?.idPG}</span>
                  </div>
                  <div className="type-contrat">
                    <div>
                      <strong className="fr-text--md">Type de contrat</strong><br />
                      <span title={miseEnRelation?.typeDeContrat}>
                        {miseEnRelation?.typeDeContrat ?? '-'}
                      </span>
                    </div>
                  </div>
                  <div className="debut-contrat">
                    <div>
                      <strong className="fr-text--md">D&eacute;but de contrat</strong><br />
                      {miseEnRelation?.dateDebutDeContrat ?
                        <span>
                          {dayjs(miseEnRelation?.dateDebutDeContrat).format('DD/MM/YYYY')}
                        </span> :
                        <span title="En attente de pi&egrave;ces justificatives">
                          En attente de pi&egrave;ces justificatives
                        </span>
                      }
                    </div>
                  </div>
                  <div className="fin-contrat">
                    <div>
                      <strong className="fr-text--md">Fin de contrat</strong><br />
                      {miseEnRelation?.dateRupture ?
                        <span>
                          {dayjs(miseEnRelation?.dateRupture).format('DD/MM/YYYY')}
                        </span> :
                        <span>
                          {dayjs(miseEnRelation?.dateFinDeContrat).format('DD/MM/YYYY')}
                        </span>
                      }
                    </div>
                  </div>
                  <div className="motif">
                    <div>
                      <strong className="fr-text--md">Motif</strong><br />
                      {miseEnRelation?.motifRupture ?
                        <span title={formatMotifRupture(miseEnRelation?.motifRupture)}>
                          {formatMotifRupture(miseEnRelation?.motifRupture)}
                        </span> :
                        <span title="Non reconduction de contrat">
                          Non reconduction de contrat
                        </span>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="fr-card fr-col-12 fr-p-4w">
          <div className="fr-card__body" style={{ padding: '0 0' }}>
            <div>
              <div className="fr-grid-row fr-grid-row--middle">
                <div className="fr-col-3">
                  <p className="fr-badge fr-badge--info">Formation</p>
                </div>
                <div className="fr-col-3">
                  <div>
                    <strong className="fr-text--md">Formation certifi&eacute;(e)</strong><br />
                    <span>{conseiller?.certifie ? 'Oui' : 'Non'}</span>
                  </div>
                </div>
                <div className="fr-col-3">
                  <div>
                    <strong className="fr-text--md">D&eacute;but de formation</strong><br />
                    {conseiller?.datePrisePoste ?
                      <span>
                        {dayjs(conseiller?.datePrisePoste).format('DD/MM/YYYY')}
                      </span> : <span>-</span>
                    }
                  </div>
                </div>
                <div className="fr-col-3">
                  <div>
                    <strong className="fr-text--md">Fin de formation</strong><br />
                    {conseiller?.dateFinFormation ?
                      <span>
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
  misesEnRelationSansMission: PropTypes.array,
  misesEnRelationFinalisee: PropTypes.array,
  conseiller: PropTypes.object,
};

export default ContratsCards;
