import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { conseillerActions, structureActions, alerteEtSpinnerActions } from '../../../actions';
import { formatAdressePermanence, formatMotifRupture, formatNomConseiller, formatRenderStars } from '../../../utils/formatagesUtils';
import pixUtilisation from '../../../assets/icons/pix-utilisation.png';
import pixRessources from '../../../assets/icons/pix-ressources.png';
import pixCitoyen from '../../../assets/icons/pix-citoyen.png';
import Spinner from '../../../components/Spinner';
import { useMatomo } from '@jonkoops/matomo-tracker-react';
import ModalValidationRupture from './modals/ModalValidationRupture';
import AccordeonActiviter from '../../../components/AccordeonActiviter';

function ConseillerDetails() {

  const dispatch = useDispatch();
  const { idConseiller } = useParams();
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const structure = useSelector(state => state.structure?.structure);
  const errorStructure = useSelector(state => state.structure?.error);
  const errorConseiller = useSelector(state => state.conseiller?.error);
  const loading = useSelector(state => state.conseiller?.loading);
  const dossierIncompletRupture = useSelector(state => state.conseiller?.dossierIncompletRupture);
  const errorRupture = useSelector(state => state.conseiller?.errorRupture);
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  const [misesEnRelationFinalisee, setMisesEnRelationFinalisee] = useState([]);
  const [misesEnRelationNouvelleRupture, setMisesEnRelationNouvelleRupture] = useState(null);
  const [misesEnRelationFinaliseeRupture, setMisesEnRelationFinaliseeRupture] = useState([]);
  const [dateFinDeContrat, setDateFinDeContrat] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { trackEvent } = useMatomo();

  useEffect(() => {
    if (!errorConseiller) {
      if (conseiller?._id !== idConseiller) {
        dispatch(conseillerActions.get(idConseiller));
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Le conseiller n\'a pas pu être chargé !',
        status: null, description: null
      }));
    }
  }, [errorConseiller]);

  useEffect(() => {
    if (!errorStructure) {
      if (conseiller !== undefined) {
        setMisesEnRelationFinalisee(conseiller.misesEnRelation.filter(miseEnRelation => miseEnRelation.statut === 'finalisee'));
        setMisesEnRelationNouvelleRupture(conseiller.misesEnRelation.filter(miseEnRelation => miseEnRelation.statut === 'nouvelle_rupture')[0]);
        setMisesEnRelationFinaliseeRupture(conseiller.misesEnRelation.filter(miseEnRelation => miseEnRelation.statut === 'finalisee_rupture'));
        setDateFinDeContrat(new Date(conseiller.misesEnRelation.filter(miseEnRelation => miseEnRelation.statut === 'nouvelle_rupture')[0]?.dateRupture));
        if (conseiller?.statut !== 'RUPTURE') {
          dispatch(structureActions.get(conseiller?.structureId));
        }
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Le conseiller n\'a pas pu être chargé !',
        status: null, description: null
      }));
    }
  }, [conseiller, errorStructure]);

  useEffect(() => {
    if (dossierIncompletRupture === true) {
      setMisesEnRelationNouvelleRupture({ ...misesEnRelationNouvelleRupture, dossierIncompletRupture: true, dateRupture: dateFinDeContrat });
    }
  }, [dossierIncompletRupture]);
  
  const checkMotifRupture = motif => !!(motif === 'licenciement' || motif === 'demission');

  return (
    <div className="fr-container conseillerDetails">
      <Spinner loading={loading} />
      <button
        onClick={() => window.close()}
        className="fr-btn fr-btn--sm fr-fi-arrow-left-line fr-btn--icon-left fr-btn--tertiary">
        Retour &agrave; la liste
      </button>
      {errorRupture &&
        <div className="fr-alert fr-alert--error fr-mt-4w">
          <p className="fr-alert__title">
            {errorRupture}
          </p>
        </div>
      }
      <div className="fr-col-12 fr-pt-6w">
        <h1 className="fr-h1" style={{ color: '#000091', marginBottom: '0.5rem' }}>{conseiller ? formatNomConseiller(conseiller) : ''}</h1>
      </div>
      <div className="fr-col-12">
        <div className="fr-grid-row" style={{ alignItems: 'center' }}>
          <h5 className="fr-h5" style={{ marginBottom: '0.5rem' }}>ID - {conseiller?.idPG ?? ''}</h5>
        </div>
      </div>
      <div className="fr-col-12 fr-grid-row" style={{ alignItems: 'baseline' }}>
        {(misesEnRelationFinalisee.length > 0 || misesEnRelationNouvelleRupture) &&
          <p className="fr-badge fr-mr-2w fr-badge--success" style={{ height: '20%' }}>Contrat en cours</p>
        }
        {conseiller?.statut === 'RUPTURE' &&
          <p className="fr-badge fr-badge--error" style={{ height: '20%' }}>Contrat termin&eacute;</p>
        }
        {misesEnRelationNouvelleRupture &&
        <>
          {misesEnRelationNouvelleRupture?.dossierIncompletRupture ?
            <p className="fr-badge fr-badge--new fr-mt-2w fr-mt-md-0" style={{ height: '20%' }}>Dossier incomplet</p> :
            <p className="fr-badge fr-badge--warning fr-mt-2w fr-mt-md-0" style={{ height: '20%' }}>Rupture en cours</p>
          }
          <button className="fr-btn fr-btn--secondary fr-ml-md-auto fr-mt-2w fr-mt-md-0" onClick={() => setOpenModal(true)}>
            Valider la rupture de contrat
          </button>
          {openModal &&
            <ModalValidationRupture
              setOpenModal={setOpenModal}
              idConseiller={idConseiller}
              dateFinDeContrat={dateFinDeContrat}
              setDateFinDeContrat={setDateFinDeContrat}
              datePrisePoste={conseiller?.datePrisePoste}
            />
          }
        </>
        }
      </div>
      <div className="fr-grid-row fr-mt-4w fr-mb-2w fr-col-12">
        <div className="fr-col-12">
          <hr style={{ borderWidth: '0.5px' }}/>
        </div>
      </div>
      <div className="fr-grid-row fr-mt-2w fr-mb-2w">
        <div className="fr-col-md-6 fr-col-12 titreCol">
          <h2>Activit&eacute;</h2>
        </div>
        <div className="fr-col-md-6 fr-col-12 btn-statistiques fr-mb-2w fr-mb-md-0">
          <Link
            onClick={() => trackEvent({ category: 'statistiques-conseillers', action: `click-${roleActivated}` })}
            className="fr-btn fr-icon-line-chart-line fr-btn--icon-left fr-ml-auto"
            title="Statistiques"
            to={`/statistiques-conseiller/${conseiller?._id}`}
            state={{ 'origin': `/${roleActivated}/conseiller/${conseiller?._id}`, conseiller }}
          >
            Voir ses statistiques
          </Link>
        </div>
      </div>
      <AccordeonActiviter
        conseiller={conseiller}
        misesEnRelationFinalisee={misesEnRelationFinalisee}
        misesEnRelationFinaliseeRupture={misesEnRelationFinaliseeRupture}
        misesEnRelationNouvelleRupture={misesEnRelationNouvelleRupture}
      />
      <div className="fr-grid-row fr-col-12 display-desktop">
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
                    <span className="fr-text--md" style={{ fontWeight: '500' }}>Rupture initi&eacute;e</span><br/>
                    {misesEnRelationNouvelleRupture?.emetteurRupture?.date ?
                      <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                        {dayjs(misesEnRelationNouvelleRupture?.emetteurRupture?.date).format('DD/MM/YYYY')}
                      </span> : <span>-</span>
                    }
                  </div>
                </div>
                <div className="fr-col-3">
                  <div>
                    <span className="fr-text--md" style={{ fontWeight: '500' }}>Motif</span><br/>
                    <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                      {formatMotifRupture(misesEnRelationNouvelleRupture?.motifRupture)}
                    </span>
                  </div>
                </div>
                <div className="fr-col-3">
                  <div>
                    <span className="fr-text--md" style={{ fontWeight: '500' }}>&Eacute;tat du dossier</span><br/>
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
                  <div className="fr-col-3">
                    <p className="fr-badge fr-badge--success">Contrat en cours</p>
                  </div>
                  <div className="fr-col-3">
                    <div>
                      <span className="fr-text--md" style={{ fontWeight: '500' }}>Type de contrat</span><br/>
                      <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>-</span>
                    </div>
                  </div>
                  <div className="fr-col-3">
                    <div>
                      <span className="fr-text--md" style={{ fontWeight: '500' }}>D&eacute;but de contrat</span><br/>
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
                  <div className="fr-col-3">
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
                      <span className="fr-text--md" title={miseEnRelation?.structureObj?.nom} style={{ fontWeight: '500' }}>
                        {miseEnRelation?.structureObj?.nom.length > 17 ?
                          `${miseEnRelation?.structureObj?.nom.substring(0, 17)}...` : miseEnRelation?.structureObj?.nom
                        }
                      </span><br/>
                      <span className="fr-text--md" style={{ color: '#666666' }}>ID - {miseEnRelation?.structureObj?.idPG}</span>
                    </div>
                    <div className={`${checkMotifRupture(miseEnRelation?.motifRupture) ? 'fr-col-2' : 'type-contrat'}`}>
                      <div>
                        <span className="fr-text--md" style={{ fontWeight: '500' }}>Type de contrat</span><br/>
                        <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>-</span>
                      </div>
                    </div>
                    <div className="fr-col-2">
                      <div>
                        <span className="fr-text--md" style={{ fontWeight: '500' }}>D&eacute;but de contrat</span><br/>
                        {miseEnRelation?.dateRecrutement ?
                          <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                            {dayjs(miseEnRelation?.dateRecrutement).format('DD/MM/YYYY')}
                          </span> : <span>-</span>
                        }
                      </div>
                    </div>
                    <div className={`${checkMotifRupture(miseEnRelation?.motifRupture) ? 'fr-col-2' : 'fin-contrat'}`}>
                      <div>
                        <span className="fr-text--md" style={{ fontWeight: '500' }}>Fin de contrat</span><br/>
                        {miseEnRelation?.dateRupture ?
                          <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                            {dayjs(miseEnRelation?.dateRupture).format('DD/MM/YYYY')}
                          </span> : <span>-</span>
                        }
                      </div>
                    </div>
                    <div className={`${checkMotifRupture(miseEnRelation?.motifRupture) ? 'motif-court' : 'motif-long'}`}>
                      <div>
                        <span className="fr-text--md" style={{ fontWeight: '500' }}>Motif</span><br/>
                        <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }} title={miseEnRelation?.motifRupture}>
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
                    <span className="fr-text--md" style={{ fontWeight: '500' }}>Formation certifi&eacute;(e)</span><br/>
                    <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>{conseiller?.certifie ? 'Oui' : 'Non'}</span>
                  </div>
                </div>
                <div className="fr-col-3">
                  <div>
                    <span className="fr-text--md" style={{ fontWeight: '500' }}>D&eacute;but de formation</span><br/>
                    {conseiller?.datePrisePoste ?
                      <span className="fr-text--regular fr-text--md" style={{ color: '#666666' }}>
                        {dayjs(conseiller?.datePrisePoste).format('DD/MM/YYYY')}
                      </span> : <span>-</span>
                    }
                  </div>
                </div>
                <div className="fr-col-3">
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
      <div className="fr-grid-row fr-mt-4w fr-mb-2w fr-col-12 display-desktop">
        <div className="fr-col-12">
          <hr style={{ borderWidth: '0.5px' }}/>
        </div>
      </div>
      <div className="fr-grid-row fr-grid-row--bottom fr-pt-1w fr-pb-9w">
        <div className="fr-grid-row fr-mt-2w fr-mb-4w">
          <div className="fr-col-12 titreCol">
            <h2 className="fr-h2 fr-mb-1w">Informations CnFS</h2>
          </div>
        </div>
        <div className="fr-grid-row fr-col-12 color-text">
          <div className="fr-col-12 fr-col-md-6">
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
              <strong>Compte activ&eacute;</strong><br/>
              <span>{conseiller?.mattermost?.id ? 'Oui' : 'Non'}</span>
            </div>
          </div>
          <div className="fr-col-12 fr-col-md-6">
            <h4 className="titre">Lieux d&lsquo;activit&eacute;</h4>
            {conseiller?.permanences.length > 0 ?
              <>
                {conseiller?.permanences.map((permanence, idx) =>
                  <>
                    <div className="fr-mb-3w" key={idx}>
                      <strong>{permanence?.nomEnseigne?.toUpperCase()}</strong><br/>
                      <span>{formatAdressePermanence(permanence?.adresse)?.toUpperCase()}</span>
                    </div>
                  </>
                )}
              </> : <span>Aucun lieu d&lsquo;activit&eacute; renseign&eacute;</span>
            }
          </div>
          <div className="fr-grid-row fr-mt-4w fr-mb-2w fr-col-12">
            <div className="fr-col-12">
              <hr style={{ borderWidth: '0.5px' }}/>
            </div>
          </div>
          <div className="fr-grid-row fr-col-12">
            <div className="fr-col-12 fr-col-md-6">
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
                {conseiller?.codeCommune ?
                  <span>{conseiller?.codeCommune}</span> :
                  <span>-</span>
                }
              </div>
              <div className="fr-mb-3w">
                <strong>Lieu de r&eacute;sidence</strong><br/>
                {conseiller?.nomCommune ?
                  <span>{conseiller?.nomCommune}</span> :
                  <span>-</span>
                }
              </div>
            </div>
            <div className="fr-col-12 fr-col-md-6">
              <h4 className="titre">Informations de candidature</h4>
              <div className="fr-mb-3w">
                <strong>Mobilit&eacute; g&eacute;ographique</strong><br/>
                {conseiller?.distanceMax ? <span>{conseiller?.distanceMax}&nbsp;km</span> : <span>-</span>}
              </div>
              <div className="fr-mb-3w">
                <strong>Date de d&eacute;marrage possible</strong><br/>
                {conseiller?.dateDisponibilite ?
                  <span>{dayjs(conseiller?.dateDisponibilite).format('DD/MM/YYYY')}</span> : <span>-</span>
                }
              </div>
              <div className="fr-mb-3w">
                <strong>R&eacute;sultat Pix</strong><br/>
                {conseiller?.pix?.partage ?
                  <div>
                    <div className="color-render-stars">
                      {formatRenderStars(conseiller?.pix?.palier)}
                    </div>
                    <p>
                      {conseiller?.pix?.competence1 &&
                    <img src={pixUtilisation}
                      alt="Utilisation du num&eacute;rique"
                      title="Utilisation du num&eacute;rique dans la vie professionnelle"
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
                    alt="Comp&eacute;tences num&eacute;riques en lien avec la e-citoyennet&eacute;"
                    title="Comp&eacute;tences num&eacute;riques en lien avec la e-citoyennet&eacute;"
                    className="fr-mr-2w"
                  />
                      }
                    </p>
                    <p>
                      <a href="https://cdn.conseiller-numerique.gouv.fr/Conseillernum_Lire%20les%20r%C3%A9sultats%20du%20diagnostic%20des%20candidats_V2-2.pdf"
                        className="fr-link fr-link--icon-right fr-icon-download-fill"
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
        {conseiller?.statut === 'RECRUTE' &&
        <>
          <div className="fr-grid-row fr-mt-5w fr-mb-2w fr-col-12">
            <div className="fr-col-12">
              <hr style={{ borderWidth: '0.5px' }}/>
            </div>
          </div>
          <div className="fr-grid-row fr-mt-2w fr-mb-4w">
            <div className="fr-col-12 titreCol">
              <h2 className="fr-h2 fr-mb-1w">Informations de la structure</h2>
            </div>
          </div>
          <div className="fr-grid-row fr-col-12">
            <div className="fr-col-md-6 fr-col-12">
              <div className="fr-mb-3w">
                <strong>Nom de la structure</strong><br/>
                {structure?.nom ?
                  <>
                    <button
                      style={{ paddingLeft: '0', margin: '0' }}
                      title="D&eacute;tail d&rsquo;une structure"
                      className="fr-text--md"
                      onClick={() => window.open(`/${roleActivated}/structure/${structure?._id}`)}>
                      {structure?.nom}
                    </button>
                  </> :
                  <span>-</span>
                }
              </div>
              <div className="fr-mb-3w">
                <strong>Id</strong><br/>
                <span>{structure?.idPG ?? '-'}</span>
              </div>
              <div className="fr-mb-3w">
                <strong>T&eacute;l&eacute;phone</strong><br/>
                <span>
                  {structure?.contact?.telephone ?
                  /* espace tous les 2 chiffres après l'indicatif*/
                    structure?.contact?.telephone?.replace(/(\+)(33|590|596|594|262|269)(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1$2$3 $4 $5 $6 $7') :
                    <>-</>
                  }
                </span>
              </div>
              <div className="fr-mb-3w">
                <strong>Siret</strong><br/>
                <span>{structure?.siret ?? '-'}</span>
              </div>
            </div>
            <div className="fr-col-md-3 fr-col-12">
              <div className="fr-mb-3w">
                <strong>Email</strong><br/>
                {structure?.contact?.email &&
              <a className="email"href={'mailto:' + structure?.contact?.email}>
                {structure?.contact?.email}
              </a>
                }
                {!structure?.contact?.email &&
              <span>-</span>
                }
              </div>
              <div className="fr-mb-3w">
                <strong>Nom</strong><br/>
                <span>{structure?.contact?.nom ?? '-'}</span>
              </div>
              <div className="fr-mb-3w">
                <strong>Pr&eacute;nom</strong><br/>
                <span>{structure?.contact?.prenom ?? '-'}</span>
              </div>
              <div className="fr-mb-3w">
                <strong>Fonction</strong><br/>
                <span>{structure?.contact?.fonction ?? '-'}</span>
              </div>
            </div>
          </div>
        </>
        }
      </div>
    </div>
  );
}

export default ConseillerDetails;
