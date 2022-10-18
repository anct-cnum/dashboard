import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { conseillerActions, structureActions } from '../../../actions';

function ConseillerDetails() {

  const dispatch = useDispatch();
  let { idConseiller } = useParams();
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const structure = useSelector(state => state.structure?.structure);
  const error = useSelector(state => state.conseiller?.error);

  useEffect(() => {
    if (conseiller?._id !== idConseiller) {
      dispatch(conseillerActions.get(idConseiller));
    }
  }, [conseiller]);

  useEffect(() => {
    if (conseiller !== undefined) {
      dispatch(structureActions.get(conseiller?.structureId));
    }
  }, [conseiller]);

  return (
    <div className="fr-container conseillerDetails">
      {error !== undefined && error !== false &&
        <div className="fr-alert fr-alert--info fr-alert--sm ">
          <p>Information : {error?.toString()}</p>
        </div>
      }
      <div className="fr-grid-row fr-grid-row--bottom fr-pt-12w fr-pb-9w">
        <div className="fr-grid-row fr-mt-6w fr-mb-8w">
          <div className="fr-col-12 titreCol">
            <h1 className="titre">Profil</h1>
          </div>
        </div>
        <div className="fr-grid-row fr-col-12">
          <div className="fr-col-6">
            <div className="fr-mb-3w">
              <strong>Email professionelle</strong><br/>
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
              <strong>Telephone professionelle</strong><br/>
              <span>
                {conseiller?.telephonePro ?
                  /* espace tous les 2 chiffres après l'indicatif*/
                  conseiller?.telephonePro.replace(/(\+)(33|590|596|594|262|269)(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1$2$3 $4 $5 $6 $7') :
                  <>-</>
                }
              </span>
            </div>
            <div className="fr-mb-3w">
              <strong>Email personnel</strong><br/>
              {conseiller?.email &&
              <a className="email"href={'mailto:' + conseiller?.email}>
                {conseiller?.email}
              </a>
              }
              {!conseiller?.email &&
              <span>-</span>
              }
            </div>
          </div>
          <div className="fr-col-3">
            <div className="fr-mb-3w">
              <strong>Date de recrutement</strong><br/>
              {conseiller?.miseEnRelation?.dateRecrutement ?
                <span className="breakWord">{dayjs(conseiller?.miseEnRelation?.dateRecrutement).format('DD/MM/YYYY')}</span> : <span>-</span>
              }
            </div>
            <div className="fr-mb-3w">
              <strong>Sexe</strong><br/>
              <span className="breakWord">{conseiller?.sexe ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Date de naissance</strong><br/>
              {conseiller?.dateDeNaissance ?
                <span className="breakWord">{dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY')}</span> : <span>-</span>
              }
            </div>
          </div>
        </div>
        <div className="fr-grid-row fr-mt-5w fr-mb-2w fr-col-12">
          <div className="fr-col-12">
            <hr style={{ borderWidth: '0.5px' }}/>
          </div>
        </div>
        <div className="fr-grid-row fr-mt-6w fr-mb-8w">
          <div className="fr-col-12 titreCol">
            <h1 className="titre">Information de la structure</h1>
          </div>
        </div>
        <div className="fr-grid-row fr-col-12">
          <div className="fr-col-6">
            <div className="fr-mb-3w">
              <strong>Mail</strong><br/>
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
              <span className="breakWord">{structure?.contact?.nom ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Pr&eacute;nom</strong><br/>
              <span className="breakWord">{structure?.contact?.prenom ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>Fonction</strong><br/>
              <span className="breakWord">{structure?.contact?.fonction ?? '-'}</span>
            </div>
          </div>
          <div className="fr-col-3">
            <div className="fr-mb-3w">
              <strong>Id</strong><br/>
              <span className="breakWord">{structure?.idPG ?? '-'}</span>
            </div>
            <div className="fr-mb-3w">
              <strong>T&eacute;l&eacute;phone</strong><br/>
              <span>
                {structure?.contact?.telephone ?
                  /* espace tous les 2 chiffres après l'indicatif*/
                  structure?.contact?.telephone.replace(/(\+)(33|590|596|594|262|269)(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1$2$3 $4 $5 $6 $7') :
                  <>-</>
                }
              </span>
            </div>
            <div className="fr-mb-3w">
              <strong>Siret</strong><br/>
              <span className="breakWord">{structure?.siret ?? '-'}</span>
            </div>
          </div>
        </div>
        <div className="fr-grid-row fr-mt-5w fr-mb-2w fr-col-12">
          <div className="fr-col-12">
            <hr style={{ borderWidth: '0.5px' }}/>
          </div>
        </div>
        <div className="fr-grid-row fr-mt-6w fr-mb-8w">
          <div className="fr-col-12 titreCol">
            <h1 className="titre">Activité</h1>
          </div>
        </div>
        <div className="fr-grid-row fr-col-12">
          <div className="fr-col-5">
            <div className="fr-mb-3w">
              <strong>Date d&lsquo;entrée en formation</strong><br/>
              {conseiller?.datePrisePoste ?
                <span className="breakWord">{dayjs(conseiller?.datePrisePoste).format('DD/MM/YYYY')}</span> : <span>-</span>
              }
            </div>
            <div className="fr-mb-3w">
              <strong>Date de sortie de formation</strong><br/>
              {conseiller?.dateFinFormation ?
                <span className="breakWord">{dayjs(conseiller?.dateFinFormation).format('DD/MM/YYYY')}</span> : <span>-</span>
              }
            </div>
            <div className="fr-mb-3w">
              <strong>Certification</strong><br/>
              <span className="breakWord">{conseiller?.certifie ? 'Oui' : 'Non'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConseillerDetails;
