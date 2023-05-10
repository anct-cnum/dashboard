import React from 'react';
import dayjs from 'dayjs';
import { badgeStatutDossierDS, formatNomConseiller, pluralize } from '../../../../utils/formatagesUtils';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { StatutConventionnement } from '../../../../utils/enumUtils';
import { reconventionnementActions } from '../../../../actions';

function ReconventionnementDetails({ reconventionnement }) {
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const dossierReconventionnement = reconventionnement?.conventionnement?.dossierReconventionnement;
  const dossierConventionnement = reconventionnement?.conventionnement?.dossierConventionnement;
  const dispatch = useDispatch();

  const calcNbJoursAvantDateFinContrat = dateFinContrat => {
    const dateFin = dayjs(dateFinContrat);
    const dateAujourdhui = dayjs();
    const nbJours = dateFin.diff(dateAujourdhui, 'day');

    return Math.max(nbJours, 0);
  };

  const validation = () => {
    dispatch(reconventionnementActions.validation(reconventionnement._id));
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
                            <div className="fr-col-12 fr-col-xl-3">
                              <div>
                                <strong className="fr-text--md fr-text--bold">{conseiller ? formatNomConseiller(conseiller) : ''}</strong><br />
                                <span className="fr-text--regular fr-text--md">ID - {conseiller?.idPG ?? ''}</span>
                              </div>
                            </div>
                            <div className="fr-col-3 fr-col-xl-2">
                              <div>
                                <strong className="fr-text--md">Type de contrat</strong><br />
                                <span className="fr-text--regular fr-text--md" title={conseiller?.typeDeContrat ?? ''}>
                                  {conseiller?.typeDeContrat ?
                                    <>
                                      {conseiller?.typeDeContrat?.length > 15 ?
                                        `${conseiller?.typeDeContrat.substring(0, 15)}...` : conseiller?.typeDeContrat
                                      }
                                    </> : '-'
                                  }
                                </span>
                              </div>
                            </div>
                            <div className="fr-col-3 fr-col-xl-2">
                              <div>
                                <strong className="fr-text--md">D&eacute;but de contrat</strong><br />
                                {conseiller?.dateDebutDeContrat ?
                                  <span className="fr-text--regular fr-text--md">
                                    {dayjs(conseiller?.dateDebutDeContrat).format('DD/MM/YYYY')}
                                  </span> :
                                  <span className="fr-text--regular fr-text--md" title="En attente de pi&egrave;ces justificatives">
                                    En attente de pi&egrave;ces...
                                  </span>
                                }
                              </div>
                            </div>
                            <div className="fr-col-3 fr-col-xl-2">
                              <div>
                                <strong className="fr-text--md">Fin de contrat</strong><br />
                                {conseiller?.dateFinDeContrat ?
                                  <span className="fr-text--regular fr-text--md">
                                    {dayjs(conseiller?.dateFinDeContrat).format('DD/MM/YYYY')}
                                  </span> :
                                  <span className="fr-text--regular fr-text--md" title="En attente de pi&egrave;ces justificatives">
                                    En attente de pi&egrave;ces...
                                  </span>
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
                <div className="fr-col-12 text-aucun-conseiller">
                  <span className="fr-h5">La structure n&lsquo;a pas s&eacute;l&eacute;ctionné de conseillers &agrave; renouveller</span>
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
                  <button
                    className="fr-btn"
                    onClick={validation}
                    disabled={dossierReconventionnement?.statut !== 'accepte'}
                  >
                    Valider la demande
                  </button>
                </li>
              }
              <li className="fr-ml-auto">
                <div className="fr-grid-row" style={{ alignItems: 'baseline' }}>
                  {badgeStatutDossierDS(dossierReconventionnement?.statut)}
                  <a className="fr-btn fr-btn--secondary margin-top" href={reconventionnement?.url} target="_blank" rel="noopener noreferrer">
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
            <p className="fr-card__desc fr-text--xl"><strong className="fr-text--bold">{reconventionnement?.nombreConseillersCoselec} {pluralize(
              'poste de conseiller validé',
              'poste de conseiller validé',
              'postes de conseiller validés',
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
                      <div className="fr-col-12 fr-col-xl-3">
                        <div>
                          <strong className="fr-text--md fr-text--bold">{conseiller ? formatNomConseiller(conseiller) : ''}</strong><br />
                          <span className="fr-text--regular fr-text--md">ID - {conseiller?.idPG ?? ''}</span>
                        </div>
                      </div>
                      <div className="fr-col-12 fr-col-md-4 fr-col-xl-2 margin-top">
                        <div>
                          <strong className="fr-text--md">Type de contrat</strong><br />
                          <span className="fr-text--regular fr-text--md" title={conseiller?.typeDeContrat ?? ''}>
                            {conseiller?.typeDeContrat ?
                              <>
                                {conseiller?.typeDeContrat?.length > 15 ?
                                  `${conseiller?.typeDeContrat.substring(0, 15)}...` : conseiller?.typeDeContrat
                                }
                              </> : '-'
                            }
                          </span>
                        </div>
                      </div>
                      <div className="fr-col-12 fr-col-md-4 fr-col-xl-2 margin-top">
                        <div>
                          <strong className="fr-text--md">D&eacute;but de contrat</strong><br />
                          {conseiller?.dateDebutDeContrat ?
                            <span className="fr-text--regular fr-text--md">
                              {dayjs(conseiller?.dateDebutDeContrat).format('DD/MM/YYYY')}
                            </span> :
                            <span className="fr-text--regular fr-text--md" title="En attente de pi&egrave;ces justificatives">
                              En attente de pi&egrave;...
                            </span>
                          }
                        </div>
                      </div>
                      <div className="fr-col-12 fr-col-md-4 fr-col-xl-2 margin-top fin-contrat">
                        <div>
                          <strong className="fr-text--md">Fin de contrat</strong><br />
                          {(!conseiller?.dateFinDeContrat && !conseiller?.dateRupture) &&
                            <span className="fr-text--regular fr-text--md" title="En attente de pi&egrave;ces justificatives">
                              En attente de pi&egrave;...
                            </span>
                          }
                          {conseiller?.dateFinDeContrat &&
                            <span className="fr-text--regular fr-text--md">
                              {dayjs(conseiller?.dateFinDeContrat).format('DD/MM/YYYY')}
                            </span>
                          }
                          {conseiller?.dateRupture &&
                            <span className="fr-text--regular fr-text--md">
                              {dayjs(conseiller?.dateRupture).format('DD/MM/YYYY')}
                            </span>
                          }
                        </div>
                      </div>
                      <div className="fr-col-12 fr-col-md-4 fr-col-xl-2 fr-grid-row margin-top">
                        {conseiller?.reconventionnement === true ?
                          <p className="fr-badge fr-badge--new fr-p-0-5w">Renouvellement</p> :
                          <p className="fr-badge fr-badge--info fr-p-0-5w">Non renouvel&eacute;</p>
                        }
                      </div>
                      <div className="btn-actions-conseiller margin-top">
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
