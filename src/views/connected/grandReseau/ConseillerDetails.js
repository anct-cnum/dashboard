import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { conseillerActions, structureActions, alerteEtSpinnerActions } from '../../../actions';
import { formatAdressePermanence, formatMotifRupture, formatNomConseiller, formatRenderStars, formatStatut } from '../../../utils/formatagesUtils';
import pixUtilisation from '../../../assets/icons/pix-utilisation.png';
import pixRessources from '../../../assets/icons/pix-ressources.png';
import pixCitoyen from '../../../assets/icons/pix-citoyen.png';
import Spinner from '../../../components/Spinner';

function ConseillerDetails() {

  const dispatch = useDispatch();
  const { idConseiller } = useParams();
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const structure = useSelector(state => state.structure?.structure);
  const errorStructure = useSelector(state => state.structure?.error);
  const errorConseiller = useSelector(state => state.conseiller?.error);
  const loading = useSelector(state => state.conseiller?.loading);
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  const [misesEnRelationFinalisee, setMisesEnRelationFinalisee] = useState([]);
  const [misesEnRelationNouvelleRupture, setMisesEnRelationNouvelleRupture] = useState([]);
  const [misesEnRelationFinaliseeRupture, setMisesEnRelationFinaliseeRupture] = useState([]);

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

  return (
    <div className="fr-container conseillerDetails">
      <Spinner loading={loading} />
      <button
        onClick={() => window.close()}
        className="fr-btn fr-btn--sm fr-fi-arrow-left-line fr-btn--icon-left fr-btn--secondary">
        Retour &agrave; la liste
      </button>
      <div className="fr-col-12 fr-pt-6w">
        <h1 className="fr-h1">{conseiller ? formatNomConseiller(conseiller) : ''}</h1>
      </div>
      <div className="fr-col-12">
        <h2 className="fr-h2">Id: {conseiller?.idPG ?? ''}</h2>
      </div>
      <div className="fr-col-12 fr-grid-row">
        {(misesEnRelationFinalisee.length > 0 || misesEnRelationNouvelleRupture) &&
        <p className="fr-badge fr-mr-2w fr-badge--success fr-badge--no-icon">Contrat en cours</p>
        }
        {conseiller?.statut === 'RUPTURE' &&
        <p className="fr-badge fr-badge--error fr-badge--no-icon">Contrat termin&eacute;</p>
        }
        {misesEnRelationNouvelleRupture &&
        <p className="fr-badge fr-badge--info">Rupture en cours</p>
        }
      </div>
      <div className="fr-grid-row fr-mt-4w fr-mb-2w fr-col-12">
        <div className="fr-col-12">
          <hr style={{ borderWidth: '0.5px' }}/>
        </div>
      </div>
      <div className="fr-grid-row fr-grid-row--bottom fr-pt-1w fr-pb-9w">
        <div className="fr-grid-row fr-mt-5w fr-mb-4w">
          <div className="fr-col-12 titreCol">
            <h1>Informations CnFS</h1>
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
          </div>
          <div className="fr-col-6 fr-mt-4w">
            <h4 className="titre">Lieu(x) d&lsquo;activit&eacute;</h4>
            {conseiller?.permanences.length > 0 ?
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
        {conseiller?.statut === 'RECRUTE' &&
        <>
          <div className="fr-grid-row fr-mt-5w fr-mb-2w fr-col-12">
            <div className="fr-col-12">
              <hr style={{ borderWidth: '0.5px' }}/>
            </div>
          </div>
          <div className="fr-grid-row fr-mt-6w fr-mb-4w">
            <div className="fr-col-12 titreCol">
              <h1>Informations de la structure</h1>
            </div>
          </div>
          <div className="fr-grid-row fr-col-12">
            <div className="fr-col-6">
              <div className="fr-mb-3w">
                <strong>Nom de la structure</strong><br/>
                {structure?.nom ?
                  <>
                    <button
                      style={{ paddingLeft: '0', margin: '0' }}
                      title="D&eacute;tail d&rsquo;une structure"
                      className="fr-text--md"
                      onClick={() => window.open(`/${roleActivated}/structure/${structure?._id}`)}
                    >
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
            <div className="fr-col-3">
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
        <div className="fr-grid-row fr-mt-5w fr-mb-2w fr-col-12">
          <div className="fr-col-12">
            <hr style={{ borderWidth: '0.5px' }}/>
          </div>
        </div>
        <div className="fr-grid-row fr-mt-6w fr-mb-4w">
          <div className="fr-col-12 titreCol">
            <h1>Activit&eacute;</h1>
          </div>
        </div>
        <div className="fr-grid-row fr-col-12">
          <div className="fr-col-8 fr-mr-3w">
            <h4 className="titre">Contrat</h4>
            <div className="fr-mb-5w fr-grid-row">
              {(misesEnRelationFinalisee.length > 0 || misesEnRelationNouvelleRupture) &&
              <div className={misesEnRelationFinaliseeRupture.length > 0 ? 'fr-mb-2w' : ''}>
                <span className="fr-col-12">
                  <strong className="fr-badge fr-badge--success fr-badge--no-icon">Contrat En cours</strong>&nbsp;avec {structure?.nom}&nbsp;-
                    Id&nbsp;&#91;{structure?.idPG}&#93;&nbsp;
                </span>
                {(misesEnRelationFinalisee[0]?.dateRecrutement || misesEnRelationNouvelleRupture?.dateRecrutement) &&
                <>
                  <span>depuis le&nbsp;</span>
                  {misesEnRelationFinalisee[0]?.dateRecrutement ?
                    <span>{dayjs(misesEnRelationFinalisee[0]?.dateRecrutement).format('DD/MM/YYYY')}</span> :
                    <span>{dayjs(misesEnRelationNouvelleRupture.dateRecrutement).format('DD/MM/YYYY')}</span>
                  }
                  <span>&nbsp;jusqu&lsquo;au&nbsp;</span>
                  {(!misesEnRelationFinalisee[0]?.dateFinDeContrat && !misesEnRelationNouvelleRupture?.dateFinDeContrat) &&
                    <span>:&nbsp;date inconnue</span>
                  }
                  {misesEnRelationFinalisee[0]?.dateFinDeContrat &&
                    <span>{misesEnRelationFinalisee[0]?.dateFinDeContrat}</span>
                  }
                  {misesEnRelationNouvelleRupture?.dateFinDeContrat &&
                    <span>{misesEnRelationNouvelleRupture?.dateFinDeContrat}</span>
                  }
                </>
                }
              </div>
              }
              {misesEnRelationFinaliseeRupture.map((miseEnRelation, idx) =>
                <>
                  <span key={idx} className="fr-col-12">
                    <strong className="fr-badge fr-badge--error fr-badge--no-icon">
                    Contrat Termin&eacute;
                    </strong>&nbsp;avec {miseEnRelation?.structureObj?.nom}&nbsp;-
                    Id&nbsp;&#91;{miseEnRelation?.structureObj?.idPG}&#93;
                    du {dayjs(miseEnRelation?.dateRecrutement).format('DD/MM/YYYY')}&nbsp;au&nbsp;
                    {dayjs(miseEnRelation?.dateRupture).format('DD/MM/YYYY')}
                  </span>
                </>
              )}
            </div>
            {(misesEnRelationNouvelleRupture || misesEnRelationFinaliseeRupture.length > 0) &&
              <>
                <h4 className="titre">Demande de rupture initi&eacute;e</h4>
                <div>
                  {misesEnRelationFinaliseeRupture.map((miseEnRelation, idx) =>
                    <>
                      <div key={idx} className="fr-grid-row">
                        <span>le {dayjs(miseEnRelation?.emetteurRupture?.date).format('DD/MM/YYYY')}</span>
                        <span>&nbsp;pour le motif de&nbsp;</span>
                        <span>{formatMotifRupture(miseEnRelation?.motifRupture)}</span>
                        <span>
                        &nbsp;-&nbsp;
                          <strong className="fr-badge fr-badge--success fr-badge--no-icon">
                            {formatStatut(miseEnRelation?.statut)}
                          </strong>
                        </span>
                      </div>
                    </>
                  )}
                  {misesEnRelationNouvelleRupture &&
                    <>
                      <div className={misesEnRelationFinaliseeRupture.length > 0 ? 'fr-mt-2w fr-grid-row' : 'fr-grid-row'}>
                        {misesEnRelationNouvelleRupture?.emetteurRupture?.date ?
                          <>
                            <span>Le {dayjs(misesEnRelationNouvelleRupture?.emetteurRupture?.date).format('DD/MM/YYYY')}</span>
                            <span>&nbsp;pour le motif de&nbsp;</span>
                          </> : <span>Pour le motif de&nbsp;</span>
                        }
                        <span>{formatMotifRupture(misesEnRelationNouvelleRupture?.motifRupture)}</span>
                        {misesEnRelationNouvelleRupture?.dossierIncompletRupture ?
                          <span>&nbsp;-&nbsp;<strong className="fr-badge fr-badge--warning fr-badge--no-icon">Dossier incomplet</strong></span> :
                          <span>&nbsp;-&nbsp;<strong className="fr-badge fr-badge--info fr-badge--no-icon">
                            {formatStatut(misesEnRelationNouvelleRupture?.statut)}
                          </strong></span>
                        }
                      </div>
                    </>
                  }
                </div>
              </>
            }
          </div>
          <div className="fr-col-3">
            <h4 className="titre">Formation</h4>
            <div className="fr-mb-3w">
              <strong>Date d&lsquo;entr&eacute;e en formation</strong><br/>
              {conseiller?.datePrisePoste ?
                <span>{dayjs(conseiller?.datePrisePoste).format('DD/MM/YYYY')}</span> : <span>-</span>
              }
            </div>
            <div className="fr-mb-3w">
              <strong>Date de sortie de formation</strong><br/>
              {conseiller?.dateFinFormation ?
                <span>{dayjs(conseiller?.dateFinFormation).format('DD/MM/YYYY')}</span> : <span>-</span>
              }
            </div>
            <div className="fr-mb-3w">
              <strong>Certifi&eacute;(e)</strong><br/>
              <span>{conseiller?.certifie ? 'Oui' : 'Non'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConseillerDetails;
