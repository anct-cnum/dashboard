import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import pixUtilisation from '../assets/icons/pix-utilisation.png';
import pixRessources from '../assets/icons/pix-ressources.png';
import pixCitoyen from '../assets/icons/pix-citoyen.png';
import { scrollTopWindow } from '../utils/exportsUtils';
import { formatRenderStars } from '../utils/formatagesUtils';
import { conseillerActions } from '../actions';

function InformationCandidat({ conseiller }) {

  const dispatch = useDispatch();

  const downloadCV = () => {
    dispatch(conseillerActions.getCurriculumVitae(conseiller?._id, conseiller));
    scrollTopWindow();
  };

  return (
    <div>
      <div className="fr-grid-row fr-mt-4w fr-col-12">
        <div className="fr-col-12">
          <hr style={{ borderWidth: '0.5px' }}/>
        </div>
      </div>
      <div className="fr-grid-row fr-grid-row--bottom fr-pt-1w fr-pb-9w">
        <div className="fr-grid-row fr-mt-3w fr-mb-3w">
          <div className="fr-col-12 titreCol">
            <h2 className="fr-h2">Informations CnFS</h2>
          </div>
        </div>
        <div className="fr-grid-row fr-col-12 color-text">
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
              <a className="email" href={'mailto:' + conseiller?.email}>
                {conseiller?.email}
              </a>
              }
              {!conseiller?.email &&
              <span>-</span>
              }
            </div>
            <div className="fr-mb-3w">
              <strong>Code postal</strong><br/>
              {conseiller?.codeCommune ? <span>{conseiller?.codeCommune}</span> : <span>-</span>}
            </div>
            <div className="fr-mb-3w">
              <strong>Lieu de r&eacute;sidence</strong><br/>
              {conseiller?.nomCommune ? <span>{conseiller?.nomCommune}</span> : <span>-</span>}
            </div>
          </div>
          <div className="fr-col-12 fr-col-md-6">
            <h4 className="titre">Informations de candidatures</h4>
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
                </button> : <span>Non renseign&eacute;</span>
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

InformationCandidat.propTypes = {
  conseiller: PropTypes.object,
};

export default InformationCandidat;
