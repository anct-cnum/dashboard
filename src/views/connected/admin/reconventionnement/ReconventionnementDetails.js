import React from 'react';
import dayjs from 'dayjs';
import { formatNomConseiller, pluralize } from '../../../../utils/formatagesUtils';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { StatutConventionnement } from '../../../../utils/enumUtils';

function ReconventionnementDetails({ reconventionnement }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const dossierReconventionnement = reconventionnement?.conventionnement?.dossierReconventionnement;
  const dossierConventionnement = reconventionnement?.conventionnement?.dossierConventionnement;

  const calcNbJoursAvantDateFinContrat = dateFinContrat => {
    const dateFin = dayjs(dateFinContrat);
    const dateAujourdhui = dayjs();
    const nbJours = dateFin.diff(dateAujourdhui, 'day');

    return Math.max(nbJours, 0);
  };

  return (
    <>
      <div className="fr-card fr-card--no-border" style={{ backgroundColor: '#E8EDFF' }}>
        <div className="fr-card__body">
          <div className="fr-card__content">
            <h3 className="fr-card__title fr-h3">
              Conventionnement phase 2
            </h3>
            {dossierReconventionnement?.dateDeCreation &&
              <p className="fr-card__desc fr-text--lg fr-text--regular">
                Demande initi&eacute;e le {dossierReconventionnement ? dayjs(dossierReconventionnement.dateDeCreation).format('DD/MM/YYYY') : ''}
              </p>
            }
            <p className="fr-card__desc fr-text--lg fr-text--bold" style={{ color: '#000091' }}>
              {pluralize(
                'Nombre de poste total demandé : ',
                'Nombre de poste total demandé : ',
                'Nombre de postes total demandés : ',
                dossierReconventionnement?.nbPostesAttribuees ?? 0
              )}
              {dossierReconventionnement?.nbPostesAttribuees ?? 0}
            </p>
            <div className="fr-card__desc fr-grid-row fr-mt-3w fr-col-12">
              <div className="fr-col-12">
                <hr style={{ borderWidth: '0.5px' }} />
              </div>
              {reconventionnement?.conseillersRenouveller?.length > 0 ?
                <>
                  <div className="fr-col-12">
                    <h6 className="fr-card__desc fr-h6">{reconventionnement?.conseillersRenouveller?.length} {pluralize(
                      'demande de renouvellement de poste',
                      'demande de renouvellement de poste',
                      'demandes de renouvellement de postes',
                      reconventionnement?.conseillersRenouveller?.length
                    )}</h6>
                  </div>
                  {reconventionnement?.conseillersRenouveller?.map((conseiller, index) =>
                    <div key={index} className="fr-card fr-col-12 fr-mt-2w fr-p-3w">
                      <div className="fr-card__body fr-p-0">
                        <div>
                          <div className="fr-grid-row" style={{ alignItems: 'center' }}>
                            <div className="fr-col-3">
                              <div>
                                <span className="fr-text--md fr-text--bold">{conseiller ? formatNomConseiller(conseiller) : ''}</span><br />
                                <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>ID - {conseiller?.idPG}</span>
                              </div>
                            </div>
                            <div className="fr-col-2">
                              <div>
                                <span className="fr-text--md" style={{ fontWeight: '500' }}>Type de contrat</span><br />
                                <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>CDD</span>
                              </div>
                            </div>
                            <div className="fr-col-2">
                              <div>
                                <span className="fr-text--md" style={{ fontWeight: '500' }}>D&eacute;but de contrat</span><br />
                                {conseiller?.dateRecrutement ?
                                  <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                                    {dayjs(conseiller?.dateRecrutement).format('DD/MM/YYYY')}
                                  </span> : <span>-</span>
                                }
                              </div>
                            </div>
                            <div className="fr-col-2">
                              <div>
                                <span className="fr-text--md" style={{ fontWeight: '500' }}>Fin de contrat</span><br />
                                {conseiller?.dateRupture ?
                                  <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                                    {dayjs(conseiller?.dateRupture).format('DD/MM/YYYY')}
                                  </span> : <span>-</span>
                                }
                              </div>
                            </div>
                            <div className="fr-col-3" style={{ textAlign: 'end' }}>
                              <button
                                className="fr-btn fr-icon-eye-line fr-ml-auto fr-mr-2w"
                                onClick={() => window.open(`/${roleActivated}/conseiller/${conseiller?._id}`)}
                                title="D&eacute;tail"
                              />
                              <Link
                                className="fr-btn fr-icon-line-chart-line"
                                title="Statistiques"
                                to={`/statistiques-conseiller/${conseiller?._id}`}
                                state={{ 'origin': `/${roleActivated}/demandes/convention/${reconventionnement?._id}`, conseiller }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </> :
                <div className="fr-col-12">
                  <span className="fr-h5">La structure n&lsquo;a pas s&eacute;l&eacute;ctionné de conseillers &agrave; renouveller pour le moment</span>
                </div>
              }
            </div>
            <div className="fr-card__start fr-mb-0" style={{ textAlign: 'end' }}>
              {reconventionnement?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ ?
                <p className="fr-badge fr-badge--success">Demande valid&eacute;e</p> :
                <p className="fr-badge fr-badge--new">Demande en attente de validation</p>
              }
            </div>
          </div>
          <div className="fr-card__footer">
            <ul className="fr-btns-group fr-btns-group--icon-left fr-btns-group--inline-reverse fr-btns-group--inline-lg">
              {reconventionnement?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_EN_COURS &&
                <li>
                  <button className="fr-btn" disabled>
                    Valider la demande
                  </button>
                </li>
              }
              <li className="fr-ml-auto">
                <div className="fr-grid-row" style={{ alignItems: 'baseline' }}>
                  {reconventionnement?.conventionnement?.statut === 'accepté' ?
                    <p className="fr-badge fr-badge--success fr-mr-3w" style={{ height: '20%' }}>Dossier complet</p> :
                    <p className="fr-badge fr-badge--error fr-mr-3w" style={{ height: '20%' }}>Dossier incomplet</p>
                  }

                  <a className="fr-btn fr-btn--secondary" href={reconventionnement?.url} target="_blank" rel="noopener noreferrer">
                    Voir le dossier D&eacute;marche Simplifi&eacute;e
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="fr-card fr-mt-6w">
        <div className="fr-card__body">
          <div className="fr-card__content">
            <h3 className="fr-card__title fr-h3">
              Conventionnement phase 1
            </h3>
            <p className="fr-card__desc fr-text--md"><strong>Date de d&eacute;but:&nbsp;</strong>
              {dossierConventionnement?.dateDeValidation ?
                <span>{dayjs(dossierConventionnement?.dateDeValidation).format('DD/MM/YYYY')}</span> :
                <span>Non renseign&eacute;e</span>
              }
            </p>
            <p className="fr-card__desc fr-text--xl" style={{ color: '#000091' }}><strong>{reconventionnement?.nombreConseillersCoselec} {pluralize(
              'poste de conseiller validé',
              'poste de conseiller validé',
              'postes de conseillers validés',
              reconventionnement?.nombreConseillersCoselec
            )}</strong> pour ce conventionnement</p>
            <div className="fr-card__desc fr-grid-row fr-mt-3w fr-col-12">
              <div className="fr-col-12">
                <hr style={{ borderWidth: '0.5px' }} />
              </div>
              <div className="fr-col-12">
                <h6 className="fr-card__desc fr-h6">Profils recrut&eacute;s</h6>
              </div>
              {reconventionnement?.conseillers?.map((conseiller, index) =>
                <div key={index} className="fr-card fr-col-12 fr-mt-3w fr-p-3w">
                  <div className="fr-card__body fr-p-0">
                    <div className="fr-grid-row" style={{ alignItems: 'center' }}>
                      <div className="fr-col-3">
                        <div>
                          <span className="fr-text--md fr-text--bold">{conseiller ? formatNomConseiller(conseiller) : ''}</span><br />
                          <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>ID - {conseiller?.idPG}</span>
                        </div>
                      </div>
                      <div className="fr-col-2">
                        <div>
                          <span className="fr-text--md" style={{ fontWeight: '500' }}>Type de contrat</span><br />
                          <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>CDD</span>
                        </div>
                      </div>
                      <div className="fr-col-2">
                        <div>
                          <span className="fr-text--md" style={{ fontWeight: '500' }}>D&eacute;but de contrat</span><br />
                          {conseiller?.dateRecrutement ?
                            <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                              {dayjs(conseiller?.dateRecrutement).format('DD/MM/YYYY')}
                            </span> : <span>-</span>
                          }
                        </div>
                      </div>
                      <div className="fr-col-2" style={{ maxWidth: '14.7%' }}>
                        <div>
                          <span className="fr-text--md" style={{ fontWeight: '500' }}>Fin de contrat</span><br />
                          {conseiller?.dateRupture ?
                            <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                              {dayjs(conseiller?.dateRupture).format('DD/MM/YYYY')}
                            </span> : <span>-</span>
                          }
                        </div>
                      </div>
                      <div className="fr-col-2 fr-grid-row">
                        {conseiller?.statutMiseEnrelation === 'finalisee' ?
                          <p className="fr-badge fr-badge--new fr-p-0-5w">Renouvellement</p> :
                          <p className="fr-badge fr-badge--info fr-p-0-5w">Non renouvel&eacute;</p>
                        }
                      </div>
                      <div style={{ flex: '0 0 10.2%', maxWidth: '10.2%', width: '10.2%', textAlign: 'end' }}>
                        <button
                          className="fr-btn fr-icon-eye-line fr-ml-auto fr-mr-2w"
                          onClick={() => window.open(`/${roleActivated}/conseiller/${conseiller?._id}`)}
                          title="D&eacute;tail"
                        />
                        <Link
                          className="fr-btn fr-icon-line-chart-line"
                          title="Statistiques"
                          to={`/statistiques-conseiller/${conseiller?._id}`}
                          state={{ 'origin': `/${roleActivated}/demandes/convention/${reconventionnement?._id}`, conseiller }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="fr-card__start fr-mb-0" style={{ textAlign: 'end' }}>
              <p className="fr-badge fr-badge--new">
                {
                  calcNbJoursAvantDateFinContrat(dossierReconventionnement?.dateFinProchainContrat) > 0 ?
                    calcNbJoursAvantDateFinContrat(dossierReconventionnement?.dateFinProchainContrat) : ''
                }
                {pluralize(
                  'La date de fin du premier contrat est dépassée',
                  ' jour restant avant la fin du premier contrat',
                  ' jours restants avant la fin du premier contrat',
                  calcNbJoursAvantDateFinContrat(dossierReconventionnement?.dateFinProchainContrat)
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ReconventionnementDetails.propTypes = {
  reconventionnement: PropTypes.object,
};

export default ReconventionnementDetails;
