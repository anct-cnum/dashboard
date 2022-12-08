import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { alerteEtSpinnerActions, conseillerActions } from '../../../../actions';
import { formatRenderStars } from '../../../../utils/formatagesUtils';
import Spinner from '../../../../components/Spinner';
import pixUtilisation from '../../../../assets/icons/pix-utilisation.png';
import pixRessources from '../../../../assets/icons/pix-ressources.png';
import pixCitoyen from '../../../../assets/icons/pix-citoyen.png';
import FormSuppressionCandidat from './FormSuppressionCandidat';
import { scrollTopWindow } from '../../../../utils/exportsUtils';

function CandidatDetails() {
  const dispatch = useDispatch();
  const { idCandidat } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const loading = useSelector(state => state.conseiller?.loading);
  const errorConseiller = useSelector(state => state.conseiller?.error);
  const downloading = useSelector(state => state.conseiller?.downloading);
  const downloadError = useSelector(state => state.conseiller?.downloadError);
  const successDeleteCandidat = useSelector(state => state.conseiller?.successDeleteCandidat);
  const successSendMail = useSelector(state => state.conseiller?.successResendInvitCandidatConseiller);
  const errorCandidat = useSelector(state => state.conseiller?.errorCandidat);
  const [confirmSuppressionCandidat, setConfirmSuppressionCandidat] = useState(false);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const roleActivated = useSelector(state => state.authentication?.roleActivated);

  useEffect(() => {
    if (!errorConseiller) {
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

  useEffect(() => {
    if (downloadError !== undefined && downloadError !== false) {
      scrollTopWindow();
    }
  }, [downloadError]);

  const downloadCV = () => {
    dispatch(conseillerActions.getCurriculumVitae(conseiller?._id, conseiller));
  };
  useEffect(() => {
    if (successDeleteCandidat) {
      navigate(`/${roleActivated}/liste-candidatures`);
    }
  }, [successDeleteCandidat]);

  const resendInvitCandidat = () => {
    window.scrollTo(0, 0);
    dispatch(conseillerActions.resendInvitCandidat(idCandidat));
  };

  return (
    <div className="candidatDetails">
      {(downloadError !== undefined && downloadError !== false) &&
      <div className="fr-alert fr-alert--error">
        <p>Le CV n&rsquo;a pas pu &ecirc;tre r&eacute;cup&eacute;r&eacute; !</p>
      </div>
      }
      {successSendMail &&
        <div className="fr-alert fr-alert--success" style={{ marginBottom: '2rem' }} >
          <p className="fr-alert__title">
            {successSendMail}
          </p>
        </div>
      }
      {errorCandidat &&
        <div className="fr-alert fr-alert--error" style={{ marginBottom: '2rem' }}>
          <p className="fr-alert__title">
            {errorCandidat}
          </p>
        </div>
      }
      <Spinner loading={loading || downloading} />
      <Link
        style={{ boxShadow: 'none' }}
        to={location.state?.origin} state={{ currentPage }}
        className="fr-link fr-fi-arrow-left-line fr-link--icon-left">
        Retour &agrave; la liste
      </Link>
      <div className="fr-mt-2w">
        <h2>
          <span className="capitalizeFirstLetter">
            {conseiller?.prenom}&nbsp;{conseiller?.nom}</span>
        </h2>
        <div className="fr-container fr-container--fluid">
          <div className="fr-grid-row">
            { conseiller?.dateRecrutement?.length > 0 &&
              <div className="fr-col-12">
                <p><b>Date de recrutement pr&eacute;visionnelle:&nbsp;
                  {conseiller?.dateRecrutement.map((date, idx) =>

                    <span key={idx}>
                      {conseiller?.dateRecrutement?.length > 1 &&
                        <><br />-&nbsp;</>
                      }
                      {dayjs(date).format('DD/MM/YY')}
                      {conseiller?.nomStructures.length > 0 &&
                        <>&nbsp;par {conseiller?.nomStructures[idx]}</>
                      }
                    </span>

                  )}
                </b>
                </p>
              </div>
            }
            <div className="fr-col-6">
              <p>Curriculum vit&aelig; :&nbsp;
                {conseiller?.cv?.file ?
                  <button onClick={downloadCV}>
                    T&eacute;l&eacute;charger le CV (du {dayjs(conseiller?.cv?.date).format('DD/MM/YYYY') })
                  </button> : 'Non renseigné'
                }
              </p>
              <p>Situation professionnelle : {conseiller?.estEnEmploi ? 'En emploi' : 'Sans emploi'}</p>
              <p>Disponible : {conseiller?.disponible ? 'Oui' : 'Non'}</p>
              <p>Dipl&ocirc;m&eacute; : {conseiller?.estDiplomeMedNum ? 'Oui' : 'Non'}</p>
              {conseiller?.estDiplomeMedNum &&
                <p>Nom du dipl&ocirc;me : {conseiller?.nomDiplomeMedNum}</p>
              }
              <p>A de l&rsquo;exp&eacute;rience dans la m&eacute;diation num&eacute;rique : {conseiller?.aUneExperienceMedNum ? 'Oui' : 'Non'}</p>
              <p>Code Postal : {conseiller?.codePostal}</p>
              <p>
                Lieu de r&eacute;sidence :&nbsp;
                {conseiller?.nomCommune === '' || conseiller?.nomCommune === '.' ?
                  <span>Non renseign&eacute;</span> :
                  conseiller?.nomCommune}
              </p>
              <p>Mobilit&eacute; g&eacute;ographique : {conseiller?.distanceMax === 2000 ? 'France entière' : `${conseiller?.distanceMax} Km`}</p>
              <p>Date de d&eacute;marrage possible : {dayjs(conseiller?.dateDisponibilite).format('DD/MM/YYYY')}</p>
              <p><strong>Courriel : <a href={'mailto:' + conseiller?.email}>{conseiller?.email}</a></strong></p>
              <p><strong>T&eacute;l&eacute;phone : {conseiller?.telephone ? conseiller?.telephone : <span>Pas de num&eacute;ro de t&eacute;l&eacute;phone</span>}</strong></p>
              <p>Poss&egrave;de un compte candidat&nbsp;: {conseiller?.possedeCompteCandidat ? 'Oui' : 'Non'}</p>
              <button
                className="fr-btn fr-col-6 fr-mr-3w fr-mt-2w"
                onClick={resendInvitCandidat}>
                  Renvoyer l&rsquo;email d&rsquo;invitation
              </button>
              <button
                className="fr-btn fr-col-5 delete-candidature"
                onClick={() => {
                  setConfirmSuppressionCandidat(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}>
                    Supprimer la candidature
              </button>
            </div>
            {confirmSuppressionCandidat &&
               <FormSuppressionCandidat setConfirmSuppressionCandidat={setConfirmSuppressionCandidat} />
            }
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

export default CandidatDetails;
