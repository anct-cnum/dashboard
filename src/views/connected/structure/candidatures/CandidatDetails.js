import React, { useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions } from '../../../../actions';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import ButtonsAction from './ButtonsAction';
import PopinInteressee from '../popins/popinInteressee';
import PopinRecrutee from '../popins/popinRecrutee';
import PopinNouvelleRupture from '../popins/popinNouvelleRupture';
import { Oval } from 'react-loader-spinner';
import pixUtilisation from '../../../../assets/icons/pix-utilisation.png';
import pixRessources from '../../../../assets/icons/pix-ressources.png';
import pixCitoyen from '../../../../assets/icons/pix-citoyen.png';

function ConseillerDetails() {

  const location = useLocation();
  const { miseEnRelation, currentPage, currentFilter } = location.state;
  const dispatch = useDispatch();
  const conseiller = useSelector(state => state.conseiller);
  const errorUpdateStatus = useSelector(state => state.conseiller?.errorUpdateStatus);
  const downloading = useSelector(state => state.conseiller?.downloading);
  let dateRecrutementUpdated = useSelector(state => state.conseiller?.dateRecrutementUpdated);
  let dateRecrutement = useSelector(state => state.conseiller?.miseEnRelation?.dateRecrutement) ?? null;

  let { id } = useParams();

  const updateStatut = statut => {
    dispatch(conseillerActions.updateStatus({ id: miseEnRelation?._id, statut }));
  };

  useEffect(() => {
    dispatch(conseillerActions.get(id));
  }, []);

  const downloadCV = () => {
    dispatch(conseillerActions.getCurriculumVitae(conseiller?.conseiller?._id, conseiller?.conseiller));
  };

  const renderStars = palier => {
    switch (palier) {
      case 1:
        return <p>Degré de maîtrise :&nbsp;
          <span style={{ verticalAlign: 'sub' }}>
            <i className="ri-star-fill ri-xl" title="Débutant"></i>
            <i className="ri-star-line ri-xl" title="Débutant"></i>
            <i className="ri-star-line ri-xl" title="Débutant"></i>
          </span>
        </p>;
      case 2:
        return <p>Degré de maîtrise :&nbsp;
          <span style={{ verticalAlign: 'sub' }}>
            <i className="ri-star-fill ri-xl" title="Intermédiaire"></i>
            <i className="ri-star-fill ri-xl" title="Intermédiaire"></i>
            <i className="ri-star-line ri-xl" title="Intermédiaire"></i>
          </span>
        </p>;
      case 3:
        return <p>Degré de maîtrise :&nbsp;
          <span style={{ verticalAlign: 'sub' }}>
            <i className="ri-star-fill ri-xl" title="Avancé"></i>
            <i className="ri-star-fill ri-xl" title="Avancé"></i>
            <i className="ri-star-fill ri-xl" title="Avancé"></i>
          </span>
        </p>;
      default:
        return <p>Degré de maîtrise non communiqué</p>;
    }
  };

  useEffect(() => {
    if (errorUpdateStatus !== undefined && errorUpdateStatus !== false) {
      window.scrollTo(0, 100); //remonte la page pour visualiser le message flash
    }
  }, [errorUpdateStatus]);

  const linkUrl = location.origin ?? `/structure/candidats/${currentFilter === undefined ? 'toutes' : currentFilter}`;
  return (
    <div className="ConseillerDetails">
      { (errorUpdateStatus !== undefined && errorUpdateStatus !== false) &&
      <div className="fr-alert fr-alert--info">
        <p>{ errorUpdateStatus.toString() }</p>
      </div>
      }

      { dateRecrutementUpdated === true && dateRecrutement !== null && (errorUpdateStatus === undefined || errorUpdateStatus === false) &&
        <p className="fr-label flashBag" style={{ fontSize: '16px' }}>
          La date d&rsquo;embauche au {dayjs(dateRecrutement).format('DD/MM/YYYY')} a bien été enregistrée
        </p>
      }

      <Link
        style={{ boxShadow: 'none' }}
        to={{
          pathname: linkUrl,
          currentPage: currentPage
        }}
        className="fr-link fr-fi-arrow-left-line fr-link--icon-left">
        Retour à la liste
      </Link>
      <div>
        <PopinInteressee statut={conseiller?.miseEnRelation?.statut ? conseiller?.miseEnRelation?.statut : miseEnRelation?.statut}/>
        <PopinRecrutee statut={conseiller?.miseEnRelation?.statut ? conseiller?.miseEnRelation?.statut : miseEnRelation?.statut}/>
        <PopinNouvelleRupture statut={conseiller?.miseEnRelation?.statut ? conseiller?.miseEnRelation?.statut : miseEnRelation?.statut}/>
        <h2>
          <span className="capitalizeFirstLetter">
            {conseiller?.conseiller?.prenom}&nbsp;{conseiller?.conseiller?.nom}</span>
        </h2>
        <div className="spinnerCustom">
          <Oval
            color="#00BFFF"
            height={100}
            width={100}
            visible={downloading === true}
          />
        </div>
        <div className="fr-container fr-container--fluid">
          <div className="fr-grid-row">
            { conseiller?.conseiller?.dateRecrutement?.length > 0 &&
              <div className="fr-col-12">
                <p><b>Date de recrutement prévisionnelle:&nbsp;
                  {dayjs(conseiller?.conseiller?.dateRecrutement[0]).format('DD/MM/YY') }</b>
                </p>
              </div>
            }
            <div className="fr-col-5">
              <p>Curriculum vit&aelig; :&nbsp;
                {conseiller?.conseiller?.cv?.file &&
                <button className="downloadCVBtn" onClick={downloadCV}>
                  Télécharger le CV (du {dayjs(conseiller?.conseiller?.cv?.date).format('DD/MM/YYYY') })
                </button>
                }
                {!conseiller?.conseiller?.cv?.file &&
                  <>Non renseigné</>
                }
              </p>
              <p>Situation professionnelle : {conseiller?.conseiller?.estEnEmploi ? 'en emploi' : 'sans emploi'}</p>
              <p>Diplômé : {conseiller?.conseiller?.estDiplomeMedNum ? 'Oui' : 'Non'}</p>
              {conseiller?.conseiller?.estDiplomeMedNum &&
                  <p>Nom du diplôme : {conseiller?.conseiller?.nomDiplomeMedNum}</p>
              }
              <p>A de l&rsquo;expérience dans la médiation numérique : {conseiller?.conseiller?.aUneExperienceMedNum ? 'Oui' : 'Non'}</p>
              <p>Code Postal : {conseiller?.conseiller?.codePostal}</p>
              <p>
                  Lieu de résidence :&nbsp;
                { conseiller?.conseiller?.nomCommune === '' || conseiller?.conseiller?.nomCommune === '.' ?
                  'Non renseigné' :
                  conseiller?.conseiller?.nomCommune }
              </p>
              <p>Mobilité géographique : { conseiller?.conseiller?.distanceMax === 2000 ? 'France entière' : `${conseiller?.conseiller?.distanceMax} Km` }</p>
              <p>Date de démarrage possible : { dayjs(conseiller?.conseiller?.dateDisponibilite).format('DD/MM/YYYY') }</p>
              <p><strong>Courriel : <a href={'mailto:' + conseiller?.conseiller?.email}>{conseiller?.conseiller?.email}</a></strong></p>
              <p><strong>Téléphone : {conseiller?.conseiller?.telephone ? conseiller?.conseiller?.telephone : 'pas de numéro de téléphone' }</strong></p>
            </div>
            { conseiller?.conseiller?.pix?.partage &&
              <div className="fr-col-5 fr-ml-6w fr-mt-1w">
                <span className="capitalizeFirstLetter"><strong>Résultats Pix</strong></span>
                {renderStars(conseiller?.conseiller?.pix?.palier)}
                <p>
                  { conseiller?.conseiller?.pix?.competence1 &&
                    <img src={pixUtilisation}
                      alt="Utilisation du numérique"
                      title="Utilisation du numérique dans la vie professionnelle"
                      className="fr-mr-2w"
                    />
                  }
                  { conseiller?.conseiller?.pix?.competence2 &&
                    <img src={pixRessources}
                      alt="Production de ressources"
                      title="Production de ressources"
                      className="fr-mr-2w"
                    />
                  }
                  { conseiller?.conseiller?.pix?.competence3 &&
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
                    Télécharger l&rsquo;analyse des résultats Pix
                  </a>
                  <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
                    Document d&rsquo;aide pour lire les résultats du dianostic des candidats
                  </span>
                </p>
              </div>
            }
          </div>
        </div>
      </div>
      <br/>
      <ButtonsAction
        statut={conseiller?.miseEnRelation?.statut ?
          conseiller?.miseEnRelation?.statut : miseEnRelation?.statut}
        miseEnRelationId = { conseiller?.miseEnRelation?._id ?
          conseiller?.miseEnRelation?._id : miseEnRelation?._id}
        updateStatut={updateStatut}
        dateRecrutement={ conseiller?.miseEnRelation?.dateRecrutement !== undefined ?
          conseiller?.miseEnRelation?.dateRecrutement : miseEnRelation?.dateRecrutement}
        dateRupture={ conseiller?.miseEnRelation?.dateRupture !== undefined ?
          conseiller?.miseEnRelation?.dateRupture : miseEnRelation?.dateRupture}
        motifRupture={ conseiller?.miseEnRelation?.motifRupture !== undefined ?
          conseiller?.miseEnRelation?.motifRupture : miseEnRelation?.motifRupture} />
    </div>
  );
}

ConseillerDetails.propTypes = {
  location: PropTypes.object
};

export default ConseillerDetails;
