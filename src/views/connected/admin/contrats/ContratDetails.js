import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { alerteEtSpinnerActions, conseillerActions } from '../../../../actions';
import { formatAdressePermanence, formatNomConseiller } from '../../../../utils/formatagesUtils';
import Spinner from '../../../../components/Spinner';
import { scrollTopWindow } from '../../../../utils/exportsUtils';

function ContratDetails() {
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
        <div className="fr-grid-row fr-mt-7w fr-col-12">
          <div className="fr-col-12">
            <hr style={{ borderWidth: '0.5px' }}/>
          </div>
        </div>
        <div className="fr-col-12 fr-pt-6w">
          <h1 className="fr-h1 fr-mb-1w" style={{ color: '#000091' }}>{conseiller ? formatNomConseiller(conseiller) : ''}</h1>
        </div>
        <div className="fr-col-12 fr-mb-4w">
          <span className="fr-text--xl fr-text--bold" style={{ marginBottom: '0' }}>ID - {conseiller?.idPG ?? ''}</span>
        </div>
        <div className="fr-card" style={{ backgroundColor: '#E8EDFF', boxShadow: 'none' }}>
          <div className="fr-card__body">
            <div className="fr-card__content">
              <h3 className="fr-card__title fr-h3">
                Demande de renouvellement de contrat
              </h3>
              <p className="fr-card__desc">Demande initiée le 28/02/2023</p>
              <div className="fr-card__desc fr-grid-row fr-mt-3w fr-col-12">
                <div className="fr-col-12">
                  <hr style={{ borderWidth: '0.5px' }}/>
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
                  <button className="fr-btn fr-btn--secondary">
                    Modifier la demande
                  </button>
                </li>
                <li>
                  <button className="fr-btn">
                    Valider la demande
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="fr-grid-row fr-mt-7w fr-col-12">
          <div className="fr-col-12">
            <hr style={{ borderWidth: '0.5px' }}/>
          </div>
        </div>
        <div className="fr-grid-row fr-mt-2w fr-mb-4w">
          <div className="fr-col-12 titreCol">
            <h2>Activité</h2>
          </div>
        </div>
        <div className="fr-grid-row fr-col-12">
          <div className="fr-card">
            <div className="fr-card__body">
              <div className="fr-container fr-mt-3w">
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
        </div>
        <div className="fr-grid-row fr-mt-7w fr-col-12">
          <div className="fr-col-12">
            <hr style={{ borderWidth: '0.5px' }}/>
          </div>
        </div>
        <div className="fr-grid-row fr-grid-row--bottom fr-pt-1w fr-pb-9w">
          <div className="fr-grid-row fr-mt-5w fr-mb-4w">
            <div className="fr-col-12 titreCol">
              <h2>Informations CnFS</h2>
            </div>
          </div>
          <div className="fr-grid-row fr-col-12">
            <div className="fr-col-6">
              <h4 className="titre">Informations personnelles</h4>
              <div className="fr-mb-3w">
                <strong>Sexe</strong><br/>
                <span>{conseiller?.sexe ?? '-'}</span>
              </div>
              <div className="fr-mb-3w">
                <strong>Date de naissance</strong><br/>
                {conseiller?.dateDeNaissance ?
                  <span>{dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}</span> : <span>-</span>
                }
              </div>
              <div className="fr-mb-3w">
                <strong>T&eacute;l&eacute;phone</strong><br/>
                <span>
                  {conseiller?.telephone ?
                  /* espace tous les 2 chiffres après l'indicatif*/
                    conseiller?.telephone?.replace(/(\+)(33|590|596|594|262|269)(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1$2$3 $4 $5 $6 $7') :
                    <>-</>
                  }
                </span>
              </div>
              <div className="fr-mb-3w">
                <strong>Email</strong><br/>
                {conseiller?.email &&
              <a className="email"href={'mailto:' + conseiller?.email}>
                {conseiller?.email}
              </a>
                }
                {!conseiller?.email &&
              <span>-</span>
                }
              </div>
              <div className="fr-mb-3w">
                <strong>Code postal</strong><br/>
                <span>{conseiller?.codeCommune ?? '-'}</span>
              </div>
              <div className="fr-mb-3w">
                <strong>Lieu de résidence</strong><br/>
                <span>{conseiller?.nomCommune ?? '-'}</span>
              </div>
            </div>
            <div className="fr-col-6">
              <h4 className="titre">Informations de candidature</h4>
              <div className="fr-mb-3w">
                <strong>Mobilit&eacute; géographique</strong><br/>
                {conseiller?.distanceMax ? <span>{conseiller?.distanceMax}&nbsp;km</span> : <span>-</span>}
              </div>
              <div className="fr-mb-3w">
                <strong>Date de disponiblit&eacute;</strong><br/>
                {conseiller?.miseEnRelation?.dateRecrutement ?
                  <span>{dayjs(conseiller?.miseEnRelation?.dateRecrutement).format('DD/MM/YYYY')}</span> : <span>-</span>
                }
              </div>
              <div className="fr-mb-3w">
                <strong>Date de d&eacute;marrage possible</strong><br/>
                {conseiller?.dateDisponibilite ?
                  <span>{dayjs(conseiller?.dateDisponibilite).format('DD/MM/YYYY')}</span> : <span>-</span>
                }
              </div>
            </div>
            <div className="fr-col-6 fr-mt-4w">
              <h4 className="titre">Informations professionelles</h4>
              <div className="fr-mb-3w">
                <strong>Email</strong><br/>
                {conseiller?.emailCN?.address &&
              <a className="email"href={'mailto:' + conseiller?.emailCN?.address}>
                {conseiller?.emailCN?.address}
              </a>
                }
                {!conseiller?.emailCN?.address &&
              <span>-</span>
                }
              </div>
              <div className="fr-mb-3w">
                <strong>T&eacute;l&eacute;phone</strong><br/>
                <span>
                  {conseiller?.telephonePro ?
                  /* espace tous les 2 chiffres après l'indicatif*/
                    conseiller?.telephonePro?.replace(/(\+)(33|590|596|594|262|269)(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1$2$3 $4 $5 $6 $7') :
                    <>-</>
                  }
                </span>
              </div>
              <div className="fr-mb-3w">
                <strong>Email secondaire</strong><br/>
                {conseiller?.emailPro &&
              <a className="email"href={'mailto:' + conseiller?.emailPro}>
                {conseiller?.emailPro}
              </a>
                }
                {!conseiller?.emailPro &&
              <span>-</span>
                }
              </div>
              <div className="fr-mb-3w">
                <strong>Groupe CRA</strong><br/>
                <span>{conseiller?.groupeCRA ?? '-'}</span>
              </div>
              <div className="fr-mb-3w">
                <strong>Compte activé</strong><br/>
                <span>{conseiller?.mattermost?.id ? 'Oui' : 'Non'}</span>
              </div>
            </div>
            <div className="fr-col-6 fr-mt-4w">
              <h4 className="titre">Lieu(x) d&lsquo;activit&eacute;</h4>
              {conseiller?.permanences?.length > 0 ?
                <>
                  {conseiller?.permanences.map((permanence, idx) =>
                    <>
                      <div className="fr-mb-3w" key={idx}>
                        <span><strong>{permanence?.nomEnseigne}</strong>&nbsp;-&nbsp;{formatAdressePermanence(permanence?.adresse)}</span>
                      </div>
                    </>
                  )}
                </> : <span>Aucun lieu d&lsquo;activit&eacute; renseign&eacute;</span>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContratDetails;
