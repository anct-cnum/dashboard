import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, conseillerActions } from '../../../../actions';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import ButtonsAction from './ButtonsAction';
import PopinInteressee from '../popins/popinInteressee';
import PopinRecrutee from '../popins/popinRecrutee';
import PopinNouvelleRupture from '../popins/popinNouvelleRupture';
import pixUtilisation from '../../../../assets/icons/pix-utilisation.png';
import pixRessources from '../../../../assets/icons/pix-ressources.png';
import pixCitoyen from '../../../../assets/icons/pix-citoyen.png';
import Spinner from '../../../../components/Spinner';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { formatNomConseiller, formatRenderStars, pluralize } from '../../../../utils/formatagesUtils';
import Statut from '../../../../datas/statut-candidat.json';

function CandidatDetails() {

  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();

  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const errorConseiller = useSelector(state => state.conseiller?.error);
  const errorUpdateStatus = useSelector(state => state.conseiller?.errorUpdateStatus);
  const downloadError = useSelector(state => state.conseiller?.downloadError);
  const downloading = useSelector(state => state.conseiller?.downloading);
  let dateRecrutementUpdated = useSelector(state => state.conseiller?.dateRecrutementUpdated);
  let dateRecrutement = useSelector(state => state.conseiller?.miseEnRelation?.dateRecrutement) ?? null;
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const loading = useSelector(state => state?.conseiller?.loading);
  const [displayModal, setDisplayModal] = useState(true);

  useEffect(() => {
    if (!errorConseiller) {
      if (conseiller?._id !== id) {
        dispatch(conseillerActions.getCandidatStructure(id));
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Le candidat n\'a pas pu être chargé !',
        status: null, description: null
      }));
    }
  }, [errorConseiller]);

  const updateStatut = statut => {
    dispatch(conseillerActions.updateStatus(conseiller.miseEnRelation?._id, statut));
    scrollTopWindow();
  };

  const downloadCV = () => {
    dispatch(conseillerActions.getCurriculumVitae(conseiller?._id, conseiller));
    scrollTopWindow();
  };

  useEffect(() => {
    if ((errorUpdateStatus !== undefined && errorUpdateStatus !== false) ||
      (downloadError !== undefined && downloadError !== false)) {
      scrollTopWindow();
      
    }
  }, [errorUpdateStatus, downloadError]);

  const formatStatutCandidat = statut => {
    return Statut.find(item => item.filter === statut)?.name_singular;
  };

  return (
    <div className="fr-container candidatDetails">
      <Spinner loading={loading || downloading} />
      <Link
        to={location?.state?.origin ?? '/structure/candidats/nouvelle'} state={{ currentPage }}
        className="fr-btn fr-btn--sm fr-fi-arrow-left-line fr-btn--icon-left fr-btn--tertiary">
        Retour &agrave; la liste
      </Link>
      {(downloadError !== undefined && downloadError !== false) &&
      <div className="fr-alert fr-alert--error fr-mt-3w">
        <p>Le CV n&rsquo;a pas pu &ecirc;tre r&eacute;cup&eacute;r&eacute; !</p>
      </div>
      }
      { (errorUpdateStatus !== undefined && errorUpdateStatus !== false) &&
      <div className="fr-alert fr-alert--info fr-mt-3w">
        <p>{errorUpdateStatus}</p>
      </div>
      }
      { dateRecrutementUpdated === true && dateRecrutement !== null && (errorUpdateStatus === undefined || errorUpdateStatus === false) &&
        <p className="fr-alert fr-alert--success fr-mt-3w">
          La date d&rsquo;embauche au {dayjs(dateRecrutement).format('DD/MM/YYYY')} a bien &eacute;t&eacute; enregistr&eacute;e
        </p>
      }
      <div className="fr-col-12 fr-pt-6w">
        {conseiller?.coselec?.nombreConseillersCoselec &&
      <div className="fr-mb-3w">
        <span className="fr-text--lg fr-text--bold">
          {conseiller.coselec.nombreConseillersCoselec}&nbsp;
          {pluralize(
            'conseiller validé',
            'conseiller validé',
            'conseillers validés',
            conseiller.coselec.nombreConseillersCoselec
          )}
        &nbsp;par l&rsquo;Agence nationale de la coh&eacute;sion des territoires
        </span>
      </div>
        }
        <h1 className="fr-h1" style={{ color: '#000091', marginBottom: '0.8rem' }}>{conseiller ? formatNomConseiller(conseiller) : ''}</h1>
      </div>
      {displayModal &&
        <>
          {conseiller?.miseEnRelation?.statut === 'interessee' &&
          <>
            <PopinInteressee setDisplayModal={setDisplayModal} />
          </>
          }
          {conseiller?.miseEnRelation?.statut === 'recrutee' &&
          <>
            <PopinRecrutee setDisplayModal={setDisplayModal} />
          </>
          }
          {conseiller?.miseEnRelation?.statut === 'nouvelle_rupture' &&
          <>
            <PopinNouvelleRupture setDisplayModal={setDisplayModal} />
          </>
          }
        </>
      }
      <div className="fr-col-12">
        <div className="fr-grid-row" style={{ alignItems: 'center' }}>
          <h5 className="fr-h5" style={{ marginBottom: '0.5rem' }}>ID - {conseiller?.idPG ?? ''}</h5>
        </div>
      </div>
      <div className="fr-col-12 fr-grid-row" style={{ alignItems: 'baseline' }}>
        <p className="fr-badge fr-badge--new" style={{ height: '20%' }}>
          {conseiller?.miseEnRelation?.statut ? formatStatutCandidat(conseiller?.miseEnRelation?.statut) : ''}
        </p>
        <ButtonsAction
          statut={conseiller?.miseEnRelation?.statut}
          miseEnRelationId = {conseiller?.miseEnRelation?._id}
          updateStatut={updateStatut}
          dateRupture={conseiller?.miseEnRelation?.dateRupture}
          motifRupture={conseiller?.miseEnRelation?.motifRupture} />
      </div>
      <div className="fr-grid-row fr-mt-4w fr-col-12">
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
              <strong>Lieu de r&eacute;sidence</strong><br/>
              <span>{conseiller?.nomCommune ?? '-'}</span>
            </div>
          </div>
          <div className="fr-col-6">
            <h4 className="titre">Information de candidature</h4>
            <div className="fr-mb-3w">
              <strong>Mobilit&eacute; g&eacute;ographique</strong><br/>
              {conseiller?.distanceMax ? <span>{conseiller?.distanceMax}&nbsp;km</span> : <span>-</span>}
            </div>
            <div className="fr-mb-3w">
              <strong>Date de recrutement pr&eacute;visionnelle</strong><br/>
              {conseiller?.miseEnRelation?.dateRecrutement ?
                <span>{dayjs(conseiller?.miseEnRelation?.dateRecrutement).format('DD/MM/YYYY')}</span> : <span>-</span>
              }
            </div>
            <div className="fr-mb-3w">
              <strong>Disponible</strong><br/>
              <span>{conseiller?.disponible ? 'Oui' : 'Non'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Dipl&ocirc;m&eacute;</strong><br/>
              <span>{conseiller?.estDiplomeMedNum ? 'Oui' : 'Non'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>A de l&rsquo;exp&eacute;rience dans la m&eacute;diation num&eacute;rique</strong><br/>
              <span>{conseiller?.aUneExperienceMedNum ? 'Oui' : 'Non'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Situation professionnelle</strong><br/>
              <span>{conseiller?.estEnEmploi ? 'En emploi' : 'Sans emploi'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Poss&egrave;de un compte candidat</strong><br/>
              <span>{conseiller?.possedeCompteCandidat ? 'Oui' : 'Non'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Curriculum vitæ</strong><br/>
              {conseiller?.cv?.file ?
                <button className="fr-link fr-link--icon-right fr-icon-download-fill" onClick={downloadCV}>
                  T&eacute;l&eacute;charger le CV
                </button> : 'Non renseigné'
              }
            </div>
            <div className="fr-mb-3w">
              <strong>R&eacute;sultat Pix</strong><br/>
              {conseiller?.pix?.partage ?
                <div>
                  {formatRenderStars(conseiller?.pix?.palier)}
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
                      rel="noopener noreferrer"
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
  );
}

CandidatDetails.propTypes = {
  location: PropTypes.object
};

export default CandidatDetails;
