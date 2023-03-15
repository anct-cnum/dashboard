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

  return (
    <div className="candidatDetails">
      { (errorUpdateStatus !== undefined && errorUpdateStatus !== false) &&
      <div className="fr-alert fr-alert--info fr-mb-2w">
        <p>{errorUpdateStatus}</p>
      </div>
      }
      { (downloadError !== undefined && downloadError !== false) &&
      <div className="fr-alert fr-alert--error fr-mb-2w">
        <p>Le CV n&rsquo;a pas pu &ecirc;tre r&eacute;cup&eacute;r&eacute; !</p>
      </div>
      }

      { dateRecrutementUpdated === true && dateRecrutement !== null && (errorUpdateStatus === undefined || errorUpdateStatus === false) &&
        <p className="fr-alert fr-alert--success">
          La date d&rsquo;embauche au {dayjs(dateRecrutement).format('DD/MM/YYYY')} a bien &eacute;t&eacute; enregistr&eacute;e
        </p>
      }
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
      <Link
        style={{ boxShadow: 'none' }}
        to={location?.state?.origin ?? '/structure/candidats/nouvelle'} state={{ currentPage }}
        className="fr-link fr-fi-arrow-left-line fr-link--icon-left">
        Retour &agrave; la liste
      </Link>
      <div className="fr-mt-2w">
        {displayModal &&
        <>
          {conseiller?.miseEnRelation?.statut === 'interessee' &&
          <>
            <PopinInteressee setDisplayModal={setDisplayModal} />
          </>
          }
          {conseiller?.miseEnRelation?.statut === 'recrutee' &&
          <>
            <PopinRecrutee setDisplayModal={setDisplayModal} urlDossierConventionnement={conseiller?.urlDossierConventionnement} />
          </>
          }
          {conseiller?.miseEnRelation?.statut === 'nouvelle_rupture' &&
          <>
            <PopinNouvelleRupture setDisplayModal={setDisplayModal} />
          </>
          }
        </>
        }
        <h2 className="fr-mb-2w">
          {conseiller ? formatNomConseiller(conseiller) : ''}
        </h2>
        <h5>Id: {conseiller?.idPG ?? ''}</h5>
        <Spinner loading={downloading || loading} />
        <div className="fr-container fr-container--fluid">
          <div className="fr-grid-row">
            {conseiller?.miseEnRelation?.dateRecrutement &&
              <div className="fr-col-12">
                <p><b>Date de recrutement pr&eacute;visionnelle:&nbsp;
                  {dayjs(conseiller?.miseEnRelation?.dateRecrutement).format('DD/MM/YYYY') }</b>
                </p>
              </div>
            }
            <div className="fr-col-6">
              <p>Curriculum vit&aelig; :&nbsp;
                {conseiller?.cv?.file &&
                <button className="downloadCVBtn" onClick={downloadCV}>
                  T&eacute;l&eacute;charger le CV (du {dayjs(conseiller?.cv?.date).format('DD/MM/YYYY') })
                </button>
                }
                {!conseiller?.cv?.file &&
                  <>Non renseign&eacute;</>
                }
              </p>
              <p>Situation professionnelle : {conseiller?.estEnEmploi ? 'en emploi' : 'sans emploi'}</p>
              <p>Diplôm&eacute; : {conseiller?.estDiplomeMedNum ? 'Oui' : 'Non'}</p>
              {conseiller?.estDiplomeMedNum &&
                  <p>Nom du diplôme : {conseiller?.nomDiplomeMedNum}</p>
              }
              <p>A de l&rsquo;expérience dans la médiation numérique : {conseiller?.aUneExperienceMedNum ? 'Oui' : 'Non'}</p>
              <p>Code Postal : {conseiller?.codePostal}</p>
              <p>
                  Lieu de résidence :&nbsp;
                { conseiller?.nomCommune === '' || conseiller?.nomCommune === '.' ?
                  'Non renseigné' :
                  conseiller?.nomCommune }
              </p>
              <p>Mobilit&eacute; géographique : { conseiller?.distanceMax === 2000 ? 'France entière' : `${conseiller?.distanceMax} Km` }</p>
              <p>Date de d&eacute;marrage possible : { dayjs(conseiller?.dateDisponibilite).format('DD/MM/YYYY') }</p>
              <p><strong>Courriel : <a href={'mailto:' + conseiller?.email}>{conseiller?.email}</a></strong></p>
              <p><strong>T&eacute;l&eacute;phone : {conseiller?.telephone ? conseiller?.telephone : 'pas de numéro de téléphone' }</strong></p>
              <ButtonsAction
                statut={conseiller?.miseEnRelation?.statut}
                miseEnRelationId = {conseiller?.miseEnRelation?._id}
                updateStatut={updateStatut}
                dateRecrutement={conseiller?.miseEnRelation?.dateRecrutement}
                dateRupture={conseiller?.miseEnRelation?.dateRupture}
                motifRupture={conseiller?.miseEnRelation?.motifRupture} />
            </div>
            {conseiller?.pix?.partage &&
              <div className="fr-col-4 fr-ml-6w fr-mt-1w">
                <span className="capitalizeFirstLetter"><strong>R&eacute;sultats Pix</strong></span>
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
                    className="fr-link"
                    rel="noopener noreferrer"
                    target="blank"
                    title="T&eacute;l&eacute;charger le document d&rsquo;analyse des r&eacute;sultats Pix">
                    T&eacute;l&eacute;charger l&rsquo;analyse des r&eacute;sultats Pix
                  </a>
                  <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
                    Document d&rsquo;aide pour lire les r&eacute;sultats du dianostic des candidats
                  </span>
                </p>
              </div>
            }
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
