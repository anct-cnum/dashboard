import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { alerteEtSpinnerActions, conseillerActions } from '../../../../actions';
import { formatNomConseiller, pluralize } from '../../../../utils/formatagesUtils';
import Spinner from '../../../../components/Spinner';
import { scrollTopWindow } from '../../../../utils/exportsUtils';

function ReconventionnementDetails() {
  const dispatch = useDispatch();
  const { idCandidat } = useParams();

  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const loading = useSelector(state => state.conseiller?.loading);
  const errorConseiller = useSelector(state => state.conseiller?.error);
  const downloading = useSelector(state => state.conseiller?.downloading);

  useEffect(() => {
    if (!errorConseiller) {
    //   scrollTopWindow();
      if (conseiller?._id !== idCandidat) {
        dispatch(conseillerActions.getCandidat(idCandidat));
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Le candidat n\'a pas pu être chargé !',
        status: null, description: null
      }));
    }
  }, [errorConseiller]);

  return (
    <div className="candidatDetails">
      <Spinner loading={loading || downloading} />
      <button
        onClick={() => window.close()}
        className="fr-btn fr-btn--sm fr-fi-arrow-left-line fr-btn--icon-left fr-btn--secondary">
        Retour &agrave; la liste
      </button>
      <div className="fr-col-12 fr-pt-6w">
        <h1 className="fr-h1 fr-mb-1w" style={{ color: '#000091' }}>{conseiller ? formatNomConseiller(conseiller) : ''}</h1>
      </div>
      <div className="fr-col-12 fr-mb-4w">
        <div className="fr-grid-row" style={{ alignItems: 'center' }}>
          <span className="fr-text--xl fr-text--bold" style={{ marginBottom: '0' }}>ID - {conseiller?.idPG ?? ''}</span>
          <button className="fr-btn fr-icon-eye-line fr-btn--icon-left fr-ml-auto">
            Détails structure
          </button>
        </div>
      </div>
      <div>
        <div className="fr-card">
          <div className="fr-card__body fr-p-0">
            <div className="fr-container  fr-mt-3w">
              <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--bottom">
                <div className="fr-col-3">
                  <div className="fr-mb-3w">
                    <strong>Contact de la structure</strong><br/>
                    <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>{conseiller.nom ?? '-'}</span>
                  </div>
                </div>
                <div className="fr-col-3">
                  <div className="fr-mb-3w">
                    <strong>Fonction</strong><br/>
                    {conseiller?.dateDeNaissance ?
                      <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>{dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}</span> : <span>-</span>
                    }
                  </div>
                </div>
                <div className="fr-col-3">
                  <div className="fr-mb-3w">
                    <strong>Téléphone</strong><br/>
                    {conseiller?.dateDeNaissance ?
                      <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>{dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}</span> : <span>-</span>
                    }
                  </div>
                </div>
                <div className="fr-col-3">
                  <div className="fr-mb-3w">
                    <strong>Email</strong><br/>
                    {conseiller?.dateDeNaissance ?
                      <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>{dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}</span> : <span>-</span>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fr-grid-row fr-mt-7w fr-mb-2w fr-col-12">
          <div className="fr-col-12">
            <hr style={{ borderWidth: '0.5px' }}/>
          </div>
        </div>
        <div className="fr-card fr-card--no-border" style={{ backgroundColor: '#E8EDFF' }}>
          <div className="fr-card__body">
            <div className="fr-card__content">
              <h3 className="fr-card__title fr-h3">
                Conventionnement phase 2
              </h3>
              <p className="fr-card__desc fr-text--lg fr-text--regular">Demande initiée le 28/02/2023</p>
              <p className="fr-card__desc fr-text--lg fr-text--bold" style={{ color: '#000091' }}>Nombre de poste total demandé : 4</p>
              <div className="fr-card__desc fr-grid-row fr-mt-3w fr-col-12">
                <div className="fr-col-12">
                  <hr style={{ borderWidth: '0.5px' }}/>
                </div>
                <div className="fr-col-12">
                  <h6 className="fr-card__desc fr-h6">1 {pluralize(
                    'demande de renouvellement de poste',
                    'demande de renouvellement de poste',
                    'demandes de renouvellement de postes',
                    1
                  )}</h6>
                </div>
                <div className="fr-card fr-col-12 fr-mt-2w fr-p-3w">
                  <div className="fr-card__body fr-p-0">
                    <div>
                      <div className="fr-grid-row" style={{ alignItems: 'center' }}>
                        <div className="fr-col-3">
                          <div>
                            <span className="fr-text--md fr-text--bold">Philippe Dupont</span><br/>
                            <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>ID - 0001</span>
                          </div>
                        </div>
                        <div className="fr-col-2">
                          <div>
                            <span className="fr-text--md" style={{ fontWeight: '500' }}>Type de contrat</span><br/>
                            <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>CDD</span>
                          </div>
                        </div>
                        <div className="fr-col-2">
                          <div>
                            <span className="fr-text--md" style={{ fontWeight: '500' }}>Début de contrat</span><br/>
                            {conseiller?.dateDeNaissance ?
                              <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>{dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}</span> : <span>-</span>
                            }
                          </div>
                        </div>
                        <div className="fr-col-2">
                          <div>
                            <span className="fr-text--md" style={{ fontWeight: '500' }}>Fin de contrat</span><br/>
                            {conseiller?.dateDeNaissance ?
                              <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>{dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}</span> : <span>-</span>
                            }
                          </div>
                        </div>
                        <div className="fr-col-3" style={{ textAlign: 'end' }}>
                          <button
                            className="fr-btn fr-icon-eye-line fr-mr-2w"
                            title="D&eacute;tail"
                          />
                          <button
                            className="fr-btn fr-icon-line-chart-line"
                            title="D&eacute;tail"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fr-card__start fr-mb-0" style={{ textAlign: 'end' }}>
                <p className="fr-badge fr-badge--new">Demande en attente de validation</p>
              </div>
            </div>
            <div className="fr-card__footer">
              <ul className="fr-btns-group fr-btns-group--icon-left fr-btns-group--inline-reverse fr-btns-group--inline-lg">
                <li>
                  <button className="fr-btn">
                    Valider la demande
                  </button>
                </li>
                <li className="fr-ml-auto">
                  <div className="fr-grid-row" style={{ alignItems: 'baseline' }}>
                    <p className="fr-badge fr-badge--success fr-mr-3w" style={{ height: '20%' }}>Dossier complet</p>
                    <button className="fr-btn fr-icon-folder-2-line fr-btn--secondary">
                    Voir le dossier Démarche Simplifiée
                    </button>
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
              <p className="fr-card__desc fr-text--md"><strong>Date de début:</strong> 28/02/2023</p>
              <p className="fr-card__desc fr-text--xl" style={{ color: '#000091' }}><strong>4 {pluralize(
                'poste de conseiller validé',
                'poste de conseiller validé',
                'postes de conseillers validés',
                4
              )}</strong> pour ce conventionnement</p>
              <div className="fr-card__desc fr-grid-row fr-mt-3w fr-col-12">
                <div className="fr-col-12">
                  <hr style={{ borderWidth: '0.5px' }}/>
                </div>
                <div className="fr-col-12">
                  <h6 className="fr-card__desc fr-h6">Profils recrutés</h6>
                </div>
                <div className="fr-card fr-col-12 fr-mt-2w fr-p-3w">
                  <div className="fr-card__body fr-p-0">
                    <div>
                      <div className="fr-grid-row" style={{ alignItems: 'center' }}>
                        <div className="fr-col-3">
                          <div>
                            <span className="fr-text--md fr-text--bold">Philippe Dupont</span><br/>
                            <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>ID - 0001</span>
                          </div>
                        </div>
                        <div className="fr-col-2">
                          <div>
                            <span className="fr-text--md" style={{ fontWeight: '500' }}>Type de contrat</span><br/>
                            <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>CDD</span>
                          </div>
                        </div>
                        <div className="fr-col-2">
                          <div>
                            <span className="fr-text--md" style={{ fontWeight: '500' }}>Début de contrat</span><br/>
                            {conseiller?.dateDeNaissance ?
                              <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                                {dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}
                              </span> : <span>-</span>
                            }
                          </div>
                        </div>
                        <div className="fr-col-2" style={{ maxWidth: '14.7%' }}>
                          <div>
                            <span className="fr-text--md" style={{ fontWeight: '500' }}>Fin de contrat</span><br/>
                            {conseiller?.dateDeNaissance ?
                              <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                                {dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}
                              </span> : <span>-</span>
                            }
                          </div>
                        </div>
                        <div className="fr-col-2 fr-grid-row">
                          <p className="fr-badge fr-badge--new fr-p-0-5w">Renouvellement</p>
                        </div>
                        <div style={{ flex: '0 0 10.2%', maxWidth: '10.2%', width: '10.2%', textAlign: 'end' }}>
                          <button
                            className="fr-btn fr-icon-eye-line fr-ml-auto fr-mr-2w"
                            title="D&eacute;tail"
                          />
                          <button
                            className="fr-btn fr-icon-line-chart-line"
                            title="D&eacute;tail"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fr-card__start fr-mb-0" style={{ textAlign: 'end' }}>
                <p className="fr-badge fr-badge--new">6 jours restants avant la fin du premier contrat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReconventionnementDetails;
