import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { alerteEtSpinnerActions, conseillerActions } from '../../../../actions';
import { formatNomConseiller } from '../../../../utils/formatagesUtils';
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
          <div className="fr-card__body">
            <div className="fr-container  fr-mt-3w">
              <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--bottom">
                <div className="fr-col-3">
                  <div className="fr-mb-3w">
                    <strong>Contact de la structure</strong><br/>
                    {conseiller?.dateDeNaissance ?
                      <span>{dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}</span> : <span>-</span>
                    }
                  </div>
                </div>
                <div className="fr-col-3">
                  <div className="fr-mb-3w">
                    <strong>Fonction</strong><br/>
                    {conseiller?.dateDeNaissance ?
                      <span>{dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}</span> : <span>-</span>
                    }
                  </div>
                </div>
                <div className="fr-col-3">
                  <div className="fr-mb-3w">
                    <strong>Téléphone</strong><br/>
                    {conseiller?.dateDeNaissance ?
                      <span>{dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}</span> : <span>-</span>
                    }
                  </div>
                </div>
                <div className="fr-col-3">
                  <div className="fr-mb-3w">
                    <strong>Email</strong><br/>
                    {conseiller?.dateDeNaissance ?
                      <span>{dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}</span> : <span>-</span>
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
        <div className="fr-card" style={{ backgroundColor: '#E8EDFF', boxShadow: 'none' }}>
          <div className="fr-card__body">
            <div className="fr-card__content">
              <h3 className="fr-card__title fr-h3">
                Conventionnement phase 2
              </h3>
              <p className="fr-card__desc">Demande initiée le 28/02/2023</p>
              <h6 className="fr-card__desc fr-h6">Nombre de poste total demandé : 4</h6>
              <div className="fr-card__desc fr-grid-row fr-mt-3w fr-col-12">
                <div className="fr-col-12">
                  <hr style={{ borderWidth: '0.5px' }}/>
                </div>
                <div className="fr-col-12">
                  <h6 className="fr-card__desc fr-h6">1 demandes de renouvellement de postes</h6>
                </div>
                <div className="fr-card fr-col-12 fr-mt-2w">
                  <div className="fr-card__body">
                    <div className="fr-mt-3w">
                      <div className="fr-grid-row">
                        <div className="fr-col-2">
                          <div className="fr-mb-3w">
                            <strong>Philippe Dupont</strong><br/>
                            <span>ID - 0001</span>
                          </div>
                        </div>
                        <div className="fr-col-2">
                          <div className="fr-mb-3w">
                            <strong>Type de contrat</strong><br/>
                            <span>CDD</span>
                          </div>
                        </div>
                        <div className="fr-col-2">
                          <div className="fr-mb-3w">
                            <strong>Début de contrat</strong><br/>
                            {conseiller?.dateDeNaissance ?
                              <span>{dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}</span> : <span>-</span>
                            }
                          </div>
                        </div>
                        <div className="fr-col-2">
                          <div className="fr-mb-3w">
                            <strong>Fin de contrat</strong><br/>
                            {conseiller?.dateDeNaissance ?
                              <span>{dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}</span> : <span>-</span>
                            }
                          </div>
                        </div>
                        <div className="fr-col-4 fr-grid-row">
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
              <div className="fr-card__start fr-mb-3w">
                <div className="fr-grid-row">
                  <div className="fr-grid-row" style={{ alignContent: 'center', flex: '0 0 68.7%', maxWidth: '68.7%' }}>
                    <p className="fr-badge fr-badge--new" style={{ height: '20%' }}>Demande en attente de validation</p>
                    <p className="fr-badge fr-badge--success fr-ml-auto" style={{ height: '20%' }}>Dossier complet</p>
                  </div>
                  <button className="fr-btn fr-icon-eye-line fr-btn--icon-left fr-btn--secondary fr-ml-auto">
                    Voir le dossier Démarche Simplifiée
                  </button>
                </div>
              </div>
            </div>
            <div className="fr-card__footer">
              <ul className="fr-btns-group fr-btns-group--inline-reverse fr-btns-group--inline-lg">
                <li>
                  <button className="fr-btn">
                    Valider la demande
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="fr-card fr-mt-6w">
          <div className="fr-card__body">
            <div className="fr-card__content">
              <h3 className="fr-card__title fr-h3">
                Conventionnement phase 2
              </h3>
              <p className="fr-card__desc">Date de début: 28/02/2023</p>
              <h6 className="fr-card__desc fr-h6">4 postes de conseillers validés pour ce conventionnement</h6>
              <div className="fr-card__desc fr-grid-row fr-mt-3w fr-col-12">
                <div className="fr-col-12">
                  <hr style={{ borderWidth: '0.5px' }}/>
                </div>
                <div className="fr-col-12">
                  <h6 className="fr-card__desc fr-h6">Profils recrutés</h6>
                </div>
                <div className="fr-card fr-col-12 fr-mt-2w">
                  <div className="fr-card__body">
                    <div className="fr-mt-3w">
                      <div className="fr-grid-row">
                        <div className="fr-col-2">
                          <div className="fr-mb-3w">
                            <strong>Philippe Dupont</strong><br/>
                            <span>ID - 0001</span>
                          </div>
                        </div>
                        <div className="fr-col-2">
                          <div className="fr-mb-3w">
                            <strong>Type de contrat</strong><br/>
                            <span>CDD</span>
                          </div>
                        </div>
                        <div className="fr-col-2">
                          <div className="fr-mb-3w">
                            <strong>Début de contrat</strong><br/>
                            {conseiller?.dateDeNaissance ?
                              <span>{dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}</span> : <span>-</span>
                            }
                          </div>
                        </div>
                        <div className="fr-col-2">
                          <div className="fr-mb-3w">
                            <strong>Fin de contrat</strong><br/>
                            {conseiller?.dateDeNaissance ?
                              <span>{dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}</span> : <span>-</span>
                            }
                          </div>
                        </div>
                        <div className="fr-col-2">
                          <p className="fr-badge fr-badge--info">En attente de renouvellement</p>
                        </div>
                        <div className="fr-col-2 fr-grid-row">
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
              <div className="fr-card__start fr-mb-2w">
                <p className="fr-badge fr-badge--warning">6 jours restants avant la fin du premier contrat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReconventionnementDetails;
