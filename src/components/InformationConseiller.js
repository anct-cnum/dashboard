import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useMatomo } from '@jonkoops/matomo-tracker-react';
import AccordeonContrats from './AccordeonContrats';
import ContratsCards from './cards/ContratsCards';
import { formatAdressePermanence, formatRenderStars } from '../utils/formatagesUtils';
import pixUtilisation from '../assets/icons/pix-utilisation.png';
import pixRessources from '../assets/icons/pix-ressources.png';
import pixCitoyen from '../assets/icons/pix-citoyen.png';

function InformationConseiller({ conseiller, misesEnRelationFinalisee, misesEnRelationFinaliseeRupture, misesEnRelationNouvelleRupture, roleActivated }) {
console.log('conseiller:', conseiller);

  const { trackEvent } = useMatomo();

  return (
    <div>
      <div className="fr-grid-row fr-mt-4w fr-mb-2w fr-col-12">
        <div className="fr-col-12">
          <hr style={{ borderWidth: '0.5px' }} />
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
          <hr style={{ borderWidth: '0.5px' }} />
        </div>
      </div>
      <div className="fr-grid-row fr-grid-row--bottom fr-pt-1w fr-pb-9w">
        <div className="fr-grid-row">
          <div className="fr-col-12 titreCol">
            <h2 className="fr-h2 fr-mb-1w">Informations CnFS</h2>
          </div>
        </div>
        <div className="fr-grid-row fr-col-12 color-text color-title-subpart">
          <div className="fr-col-12 fr-col-md-6 fr-mt-4w">
            <h4 className="titre">Informations professionelles</h4>
            <div className="fr-mb-3w">
              <strong>Email</strong><br />
              {conseiller?.emailCN?.address &&
                <a className="email" href={'mailto:' + conseiller?.emailCN?.address}>
                  {conseiller?.emailCN?.address}
                </a>
              }
              {!conseiller?.emailCN?.address &&
                <span>-</span>
              }
            </div>
            <div className="fr-mb-3w">
              <strong>T&eacute;l&eacute;phone</strong><br />
              <span>
                {conseiller?.telephonePro ?
                  /* espace tous les 2 chiffres après l'indicatif*/
                  conseiller?.telephonePro?.replace(/(\+)(33|590|596|594|262|269)(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1$2$3 $4 $5 $6 $7') :
                  <>-</>
                }
              </span>
            </div>
            <div className="fr-mb-3w">
              <strong>Email secondaire</strong><br />
              {conseiller?.emailPro &&
                <a className="email" href={'mailto:' + conseiller?.emailPro}>
                  {conseiller?.emailPro}
                </a>
              }
              {!conseiller?.emailPro &&
                <span>-</span>
              }
            </div>
            <div className="fr-mb-3w">
              <strong>Groupe CRA</strong><br />
              <span>{conseiller?.groupeCRA ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Compte activ&eacute;</strong><br />
              <span>{conseiller?.mattermost?.id ? 'Oui' : 'Non'}</span>
            </div>
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-mt-4w">
            <h4 className="titre">Lieux d&lsquo;activit&eacute;</h4>
            {conseiller?.permanences?.length > 0 ?
              <>
                {conseiller?.permanences?.map((permanence, idx) =>
                  <>
                    <div className="fr-mb-3w" key={idx}>
                      <strong>{permanence?.nomEnseigne?.toUpperCase()}</strong><br />
                      <span>{formatAdressePermanence(permanence?.adresse)?.toUpperCase()}</span>
                    </div>
                  </>
                )}
              </> : <span>Aucun lieu d&lsquo;activit&eacute; renseign&eacute;</span>
            }
          </div>
          <div className="fr-grid-row fr-mt-4w fr-mb-4w fr-col-12">
            <div className="fr-col-12">
              <hr style={{ borderWidth: '0.5px' }} />
            </div>
          </div>
          <div className="fr-grid-row fr-col-12">
            <div className="fr-col-12 fr-col-md-6">
              <h4 className="titre">Informations personnelles</h4>
              <div className="fr-mb-3w">
                <strong>Sexe</strong><br />
                <span>{conseiller?.sexe ?? '-'}</span>
              </div>
              <div className="fr-mb-3w">
                <strong>Date de naissance</strong><br />
                {conseiller?.dateDeNaissance ?
                  <span>{dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}</span> : <span>-</span>
                }
              </div>
              <div className="fr-mb-3w">
                <strong>T&eacute;l&eacute;phone</strong><br />
                <span>
                  {conseiller?.telephone ?
                    /* espace tous les 2 chiffres après l'indicatif*/
                    conseiller?.telephone?.replace(/(\+)(33|590|596|594|262|269)(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1$2$3 $4 $5 $6 $7') :
                    <>-</>
                  }
                </span>
              </div>
              <div className="fr-mb-3w">
                <strong>Email</strong><br />
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
                <strong>Code postal</strong><br />
                {conseiller?.codePostal ?
                  <span>{conseiller?.codePostal}</span> :
                  <span>-</span>
                }
              </div>
              <div className="fr-mb-3w">
                <strong>Lieu de r&eacute;sidence</strong><br />
                {conseiller?.nomCommune ?
                  <span>{conseiller?.nomCommune}</span> :
                  <span>-</span>
                }
              </div>
            </div>
            <div className="fr-col-12 fr-col-md-6">
              <h4 className="titre">Informations de candidature</h4>
              <div className="fr-mb-3w">
                <strong>Mobilit&eacute; g&eacute;ographique</strong><br />
                {conseiller?.distanceMax ? <span>{conseiller?.distanceMax}&nbsp;km</span> : <span>-</span>}
              </div>
              <div className="fr-mb-3w">
                <strong>Date de d&eacute;marrage possible</strong><br />
                {conseiller?.dateDisponibilite ?
                  <span>{dayjs(conseiller?.dateDisponibilite).format('DD/MM/YYYY')}</span> : <span>-</span>
                }
              </div>
              <div className="fr-mb-3w">
                <strong>R&eacute;sultat Pix</strong><br />
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

InformationConseiller.propTypes = {
  conseiller: PropTypes.object,
  misesEnRelationFinalisee: PropTypes.array,
  misesEnRelationFinaliseeRupture: PropTypes.array,
  misesEnRelationNouvelleRupture: PropTypes.object,
  roleActivated: PropTypes.string
};

export default InformationConseiller;
