import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { conseillerActions, structureActions, alerteEtSpinnerActions, contratActions } from '../../../actions';
import { formatAdressePermanence, formatNomConseiller, formatNomContactStructure, formatRenderStars } from '../../../utils/formatagesUtils';
import pixUtilisation from '../../../assets/icons/pix-utilisation.png';
import pixRessources from '../../../assets/icons/pix-ressources.png';
import pixCitoyen from '../../../assets/icons/pix-citoyen.png';
import Spinner from '../../../components/Spinner';
import { useMatomo } from '@jonkoops/matomo-tracker-react';
import ModalValidationRupture from './modals/ModalValidationRupture';
import AccordeonContrats from '../../../components/AccordeonContrats';
import ContratsCards from '../../../components/cards/ContratsCards';
import CardsRupture from './contrats/cards/CardsRupture';
import CardsRenouvellement from './contrats/cards/CardsRenouvellement';
import ModalValidationRenouvellement from './modals/ModalValidationRenouvellement';
import ModalConfirmationRupture from './modals/ModalConfirmationRupture';
import PopinEditionContrat from '../../connected/structure/popins/popinEditionContrat';

function ConseillerDetails() {

  const dispatch = useDispatch();
  const { idConseiller, idMiseEnRelation } = useParams();
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const structure = useSelector(state => state.structure?.structure);
  const errorStructure = useSelector(state => state.structure?.error);
  const errorConseiller = useSelector(state => state.conseiller?.error);
  const loading = useSelector(state => state.conseiller?.loading);
  const loadingValidationRenouvellement = useSelector(state => state.contrat?.loading);
  const loadingEditContrat = useSelector(state => state.contrat?.loading);
  const errorEditContrat = useSelector(state => state.contrat?.error);
  const errorRupture = useSelector(state => state.conseiller?.errorRupture);
  const errorValidationRenouvellement = useSelector(state => state.contrat?.error);
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  const [misesEnRelationFinalisee, setMisesEnRelationFinalisee] = useState([]);
  const [misesEnRelationNouvelleRupture, setMisesEnRelationNouvelleRupture] = useState(null);
  const [misesEnRelationFinaliseeRupture, setMisesEnRelationFinaliseeRupture] = useState([]);
  const [dateFinDeContrat, setDateFinDeContrat] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModalContrat, setOpenModalContrat] = useState(false);
  const [openModalValidationRupture, setOpenModalValidationRupture] = useState(false);
  const { trackEvent } = useMatomo();

  useEffect(() => {
    if (!errorConseiller) {
      if (conseiller?._id !== idConseiller) {
        dispatch(conseillerActions.get(idConseiller, idMiseEnRelation));
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

  const updateContract = (typeDeContrat, dateDebut, dateFin, salaire) => {
    dispatch(contratActions.updateContract(typeDeContrat, dateDebut, dateFin, salaire, conseiller?.contrat?._id, roleActivated));
  };

  return (
    <div className="fr-container conseillerDetails">
      <Spinner loading={loading || loadingValidationRenouvellement || loadingEditContrat} />
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
      {errorEditContrat &&
        <div className="fr-alert fr-alert--error fr-mt-4w">
          <p className="fr-alert__title">
            {errorEditContrat}
          </p>
        </div>
      }
      {errorValidationRenouvellement &&
        <div className="fr-alert fr-alert--error fr-mt-4w">
          <p className="fr-alert__title">
            {errorValidationRenouvellement}
          </p>
        </div>
      }
      {conseiller?.statut === 'RECRUTE' &&
      <>
        <div className="fr-col-12 fr-pt-6w">
          <h1 className="fr-h1 fr-mb-2v" style={{ color: '#000091' }}>{structure?.nom ?? '-'}</h1>
        </div>
        <div className="fr-col-12 fr-mb-4w">
          <div className="fr-grid-row" style={{ alignItems: 'center' }}>
            <span className="fr-h5" style={{ marginBottom: '0' }}>ID - {structure?.idPG ?? ''}</span>
            <button className="fr-btn fr-icon-eye-line fr-btn--icon-left fr-ml-auto"
              onClick={() => window.open(`/${roleActivated}/structure/${structure?._id}`)}>
              D&eacute;tails structure
            </button>
          </div>
        </div>
        <div className="color-text color-title-subpart">
          <div className="fr-card">
            <div className="fr-card__body fr-p-0">
              <div className="fr-container fr-mt-3w">
                <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--bottom">
                  <div className="fr-col-12 fr-col-lg-3">
                    <div className="fr-mb-3w">
                      <strong>Contact de la structure</strong><br />
                      <span className="fr-text--regular fr-text--md">
                        {structure ? formatNomContactStructure(structure) : ''}
                      </span>
                    </div>
                  </div>
                  <div className="fr-col-12 fr-col-md-3">
                    <div className="fr-mb-3w">
                      <strong>Fonction</strong><br />
                      <span className="fr-text--regular fr-text--md" title={structure?.contact?.fonction ?? ''}>
                        {structure?.contact?.fonction ?
                          <>
                            {structure?.contact?.fonction?.length > 28 ?
                              `${structure?.contact?.fonction.substring(0, 28)}...` : structure?.contact?.fonction
                            }
                          </> : '-'
                        }
                      </span>
                    </div>
                  </div>
                  <div className="fr-col-12 fr-col-md-3">
                    <div className="fr-mb-3w">
                      <strong>T&eacute;l&eacute;phone</strong><br />
                      <span className="fr-text--regular fr-text--md">
                        {structure?.contact?.telephone ?? '-'}
                      </span>
                    </div>
                  </div>
                  <div className="fr-col-12 fr-col-md-3">
                    <div className="fr-mb-3w">
                      <strong>Email</strong><br />
                      <span className="fr-text--regular fr-text--md" title={structure?.contact?.email ?? ''}>
                        {structure?.contact?.email ?
                          <>
                            {structure?.contact?.email?.length > 30 ?
                              `${structure?.contact?.email.substring(0, 30)}...` : structure?.contact?.email
                            }
                          </> : '-'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fr-grid-row fr-mt-7w fr-mb-2w fr-col-12">
          <div className="fr-col-12">
            <hr style={{ borderWidth: '0.5px' }} />
          </div>
        </div>
      </>
      }
      <div className={`fr-col-12 ${conseiller?.statut !== 'RECRUTE' ? 'fr-pt-6w' : ''}`}>
        <h1 className="fr-h1 fr-mb-2v" style={{ color: '#000091' }}>{conseiller ? formatNomConseiller(conseiller) : ''}</h1>
      </div>
      <div className="fr-col-12">
        <div className="fr-grid-row" style={{ alignItems: 'center' }}>
          <h5 className="fr-h5 fr-mb-3v">ID - {conseiller?.idPG ?? ''}</h5>
        </div>
      </div>
      {conseiller &&
      <>
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
        </>
          }
        </div>
        {(conseiller?.contrat?.statut === 'finalisee_rupture' || conseiller?.contrat?.statut === 'nouvelle_rupture') &&
          <>
            <CardsRupture
              urlDossierDS={conseiller?.url}
              miseEnRelation={conseiller?.contrat}
              setOpenModal={setOpenModal}
              setOpenModalValidationRupture={setOpenModalValidationRupture}
            />
            {openModal &&
            <ModalValidationRupture
              setOpenModal={setOpenModal}
              idConseiller={idConseiller}
              dateFinDeContrat={dateFinDeContrat}
              setDateFinDeContrat={setDateFinDeContrat}
              datePrisePoste={conseiller?.datePrisePoste}
            />
            }
            {openModalValidationRupture &&
              <ModalConfirmationRupture
                setOpenModalValidationRupture={setOpenModalValidationRupture}
                idConseiller={idConseiller}
                dateFinDeContrat={dateFinDeContrat}
              />
            }
          </>
        }
        {(conseiller?.contrat?.statut === 'finalisee' || conseiller?.contrat?.statut === 'renouvellement_initié') &&
          <>
            <CardsRenouvellement
              urlDossierDS={conseiller?.url}
              miseEnRelation={conseiller?.contrat}
              setOpenModal={setOpenModal}
              setOpenModalContrat={setOpenModalContrat}
            />
            {openModal &&
              <ModalValidationRenouvellement setOpenModal={setOpenModal} idMiseEnRelation={conseiller?.contrat?._id} />
            }
            {openModalContrat &&
              <PopinEditionContrat
                setOpenModalContrat={setOpenModalContrat}
                updateContract={updateContract}
                conseiller={conseiller?.contrat}
                editMode={true}
              />
            }
          </>
        }
      </>
      }
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
      {conseiller &&
      <>
        <AccordeonContrats
          conseiller={conseiller}
          misesEnRelationFinalisee={misesEnRelationFinalisee}
          misesEnRelationFinaliseeRupture={misesEnRelationFinaliseeRupture}
          misesEnRelationNouvelleRupture={misesEnRelationNouvelleRupture}
        />
        <ContratsCards
          conseiller={conseiller}
          misesEnRelationFinalisee={misesEnRelationFinalisee}
          misesEnRelationFinaliseeRupture={misesEnRelationFinaliseeRupture}
          misesEnRelationNouvelleRupture={misesEnRelationNouvelleRupture}
        />
      </>
      }
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
        <div className="fr-grid-row fr-col-12 color-text color-title-subpart">
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
            {conseiller?.permanences?.length > 0 ?
              <>
                {conseiller?.permanences?.map((permanence, idx) =>
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
                        title="T&eacute;l&eacute;charger le document d&rsquo;analyse des r&eacute;sultats Pix">
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

export default ConseillerDetails;
