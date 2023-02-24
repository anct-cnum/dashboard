import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { alerteEtSpinnerActions, conseillerActions } from '../../../../actions';
import { formatAdressePermanence, formatNomConseiller, formatRenderStars } from '../../../../utils/formatagesUtils';
import Spinner from '../../../../components/Spinner';
import pixUtilisation from '../../../../assets/icons/pix-utilisation.png';
import pixRessources from '../../../../assets/icons/pix-ressources.png';
import pixCitoyen from '../../../../assets/icons/pix-citoyen.png';
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
          <div className="fr-card__body fr-p-0">
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
        <div className="fr-grid-row fr-mt-7w fr-col-12">
          <div className="fr-col-12">
            <hr style={{ borderWidth: '0.5px' }}/>
          </div>
        </div>
        <div className="fr-col-12 fr-pt-6w">
          <h1 className="fr-h1 fr-mb-1w" style={{ color: '#000091' }}>{conseiller ? formatNomConseiller(conseiller) : ''}</h1>
        </div>
        <div className="fr-col-12 fr-mb-2w">
          <span className="fr-text--xl fr-text--bold" style={{ marginBottom: '0' }}>ID - {conseiller?.idPG ?? ''}</span>
        </div>
        <div className="fr-col-12 fr-mb-4w">
          <p className="fr-badge fr-badge--success">Contrat en cours</p>
        </div>
        <div className="fr-card fr-card--no-border" style={{ backgroundColor: '#E8EDFF' }}>
          <div className="fr-card__body">
            <div className="fr-card__content fr-pb-2w">
              <h3 className="fr-card__title fr-h3">
                Demande de renouvellement de contrat
              </h3>
              <p className="fr-card__desc fr-text--lg fr-text--regular">Demande initiée le 28/02/2023</p>
              <div className="fr-card__desc fr-grid-row fr-mt-3w fr-col-12">
                <div className="fr-col-12">
                  <hr style={{ borderWidth: '0.5px' }}/>
                </div>
                <div className="fr-card fr-card--no-background fr-card--no-border fr-col-12">
                  <div className="fr-card__body" style={{ padding: '0 0' }}>
                    <div>
                      <div className="fr-grid-row" style={{ alignItems: 'center' }}>
                        <div className="fr-col-3">
                          <div>
                            <span className="fr-text--md fr-text--bold">Type de contrat</span><br/>
                            <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>CDD</span>
                          </div>
                        </div>
                        <div className="fr-col-3">
                          <div>
                            <span className="fr-text--md fr-text--bold">Début de contrat</span><br/>
                            {conseiller?.dateDeNaissance ?
                              <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                                {dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}
                              </span> : <span>-</span>
                            }
                          </div>
                        </div>
                        <div className="fr-col-3">
                          <div>
                            <span className="fr-text--md fr-text--bold">Fin de contrat</span><br/>
                            {conseiller?.dateDeNaissance ?
                              <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                                {dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}
                              </span> : <span>-</span>
                            }
                          </div>
                        </div>
                        <div className="fr-col-3">
                          <div>
                            <span className="fr-text--md fr-text--bold">Salaire brut mensuel</span><br/>
                            {conseiller?.dateDeNaissance ?
                              <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                                {dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}
                              </span> : <span>-</span>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fr-col-12 fr-mt-3w">
                  <hr style={{ borderWidth: '0.5px' }}/>
                </div>
              </div>
              <div className="fr-card__start fr-mb-0" style={{ textAlign: 'end' }}>
                <p className="fr-badge fr-badge--new">Demande en attente de validation</p>
              </div>
            </div>
            <div className="fr-card__footer">
              <ul className="fr-btns-group fr-btns-group--icon-left fr-btns-group--inline-reverse fr-btns-group--inline-lg">
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
        <div className="fr-grid-row fr-mt-7w fr-col-12">
          <div className="fr-col-12">
            <hr style={{ borderWidth: '0.5px' }}/>
          </div>
        </div>
        <div className="fr-grid-row fr-mt-2w fr-mb-2w">
          <div className="fr-col-6 titreCol">
            <h2>Activité</h2>
          </div>
          <div className="fr-col-6" style={{ textAlign: 'right' }}>
            <button className="fr-btn fr-icon-line-chart-line fr-btn--icon-left fr-ml-auto">
              Voir ses statistiques
            </button>
          </div>
        </div>
        <div className="fr-grid-row fr-col-12">
          <div className="fr-card fr-col-12 fr-p-4w">
            <div className="fr-card__body" style={{ padding: '0 0' }}>
              <div>
                <div className="fr-grid-row" style={{ alignItems: 'center' }}>
                  <div className="fr-col-3">
                    <p className="fr-badge fr-badge--success">Contrat en cours</p>
                  </div>
                  <div className="fr-col-3">
                    <div>
                      <span className="fr-text--md" style={{ fontWeight: '500' }}>Type de contrat</span><br/>
                      <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>CDD</span>
                    </div>
                  </div>
                  <div className="fr-col-3">
                    <div>
                      <span className="fr-text--md" style={{ fontWeight: '500' }}>Début de contrat</span><br/>
                      {conseiller?.dateDeNaissance ?
                        <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                          {dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}
                        </span> : <span>-</span>
                      }
                    </div>
                  </div>
                  <div className="fr-col-3">
                    <div>
                      <span className="fr-text--md" style={{ fontWeight: '500' }}>Fin de contrat</span><br/>
                      {conseiller?.dateDeNaissance ?
                        <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                          {dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}
                        </span> : <span>-</span>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fr-card fr-col-12 fr-mt-3w fr-p-4w">
            <div className="fr-card__body" style={{ padding: '0 0' }}>
              <div>
                <div className="fr-grid-row" style={{ alignItems: 'center' }}>
                  <div className="fr-col-3">
                    <p className="fr-badge fr-badge--info">Formation</p>
                  </div>
                  <div className="fr-col-3">
                    <div>
                      <span className="fr-text--md" style={{ fontWeight: '500' }}>Formation certifié(e)</span><br/>
                      <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>CDD</span>
                    </div>
                  </div>
                  <div className="fr-col-3">
                    <div>
                      <span className="fr-text--md" style={{ fontWeight: '500' }}>Début de contrat</span><br/>
                      {conseiller?.dateDeNaissance ?
                        <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                          {dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}
                        </span> : <span>-</span>
                      }
                    </div>
                  </div>
                  <div className="fr-col-3">
                    <div>
                      <span className="fr-text--md" style={{ fontWeight: '500' }}>Fin de contrat</span><br/>
                      {conseiller?.dateDeNaissance ?
                        <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                          {dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}
                        </span> : <span>-</span>
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
          <div className="fr-grid-row fr-mt-3w fr-mb-4w">
            <div className="fr-col-12 titreCol">
              <h2>Informations CnFS</h2>
            </div>
          </div>
          <div className="fr-grid-row fr-col-12">
            <div className="fr-col-6">
              <h4 className="titre" style={{ color: '#000091' }}>Informations professionelles</h4>
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
            <div className="fr-col-6">
              <h4 className="titre" style={{ color: '#000091' }}>Lieu(x) d&lsquo;activit&eacute;</h4>
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
            <div className="fr-grid-row fr-mt-2w fr-col-12">
              <div className="fr-col-12">
                <hr style={{ borderWidth: '0.5px' }}/>
              </div>
            </div>
            <div className="fr-col-6 fr-mt-4w">
              <h4 className="titre" style={{ color: '#000091' }}>Informations personnelles</h4>
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
            <div className="fr-col-6 fr-mt-4w">
              <h4 className="titre" style={{ color: '#000091' }}>Informations de candidature</h4>
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
              <div className="fr-mb-3w">
                <strong>Résultat Pix</strong><br/>
                {conseiller?.pix?.partage ?
                  <div>
                    {formatRenderStars(conseiller?.pix?.palier)}
                    <p>
                      {conseiller?.pix?.competence1 &&
                    <img src={pixUtilisation}
                      alt="Utilisation du numérique"
                      title="Utilisation du numérique dans la vie professionnelle"
                      className="fr-mr-2w"
                    />
                      }
                      {conseiller?.pix?.competence2 &&
                    <img src={pixRessources}
                      alt="Production de ressources"
                      title="Production de ressources"
                      className="fr-mr-2w"
                    />
                      }
                      {conseiller?.pix?.competence3 &&
                  <img src={pixCitoyen}
                    alt="Compétences numériques en lien avec la e-citoyenneté"
                    title="Compétences numériques en lien avec la e-citoyenneté"
                    className="fr-mr-2w"
                  />
                      }
                    </p>
                    <p>
                      <a href="https://cdn.conseiller-numerique.gouv.fr/Conseillernum_Lire%20les%20r%C3%A9sultats%20du%20diagnostic%20des%20candidats_V2-2.pdf"
                        className="fr-link"
                        target="blank"
                        title="Télécharger le document d&rsquo;analyse des résultats Pix">
                    T&eacute;l&eacute;charger l&rsquo;analyse des r&eacute;sultats Pix
                      </a>
                      <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
                    Document d&rsquo;aide pour lire les r&eacute;sultats du dianostic des candidats
                      </span>
                    </p>
                  </div> : <span>Comp&eacute;tences PIX non partag&eacute;es</span>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContratDetails;
