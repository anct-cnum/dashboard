import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { conseillerActions, structureActions } from '../../../actions';

function ConseillerDetails() {

  const dispatch = useDispatch();
  const { idConseiller } = useParams();
  const conseiller = useSelector(state => state.conseiller?.conseiller);
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
        <div className="fr-grid-row fr-mt-6w fr-mb-4w">
          <div className="fr-col-12 titreCol">
            <h1>Information CnFS</h1>
          </div>
        </div>
        <div className="fr-grid-row fr-col-12">
          <div className="fr-col-6">
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
            <div className="fr-mb-3w">
              <strong>T&eacute;l&eacute;phone professionelle</strong><br/>
              <span>
                {conseiller?.telephonePro ?
                  /* espace tous les 2 chiffres après l'indicatif*/
                  conseiller?.telephonePro?.replace(/(\+)(33|590|596|594|262|269)(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1$2$3 $4 $5 $6 $7') :
                  <>-</>
                }
              </span>
            </div>
          </div>
          <div className="fr-col-3">
            <div className="fr-mb-3w">
              <strong>Date de recrutement</strong><br/>
              {conseiller?.miseEnRelation?.dateRecrutement ?
                <span>{dayjs(conseiller?.miseEnRelation?.dateRecrutement).format('DD/MM/YYYY')}</span> : <span>-</span>
              }
            </div>
            <div className="fr-mb-3w">
              <strong>Compte activé</strong><br/>
              <span>{conseiller?.userCreated ? 'Oui' : 'Non'}</span>
            </div>
          </div>
        </div>
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
          <div className="fr-col-6">
            <div className="fr-mb-3w">
              <strong>Date d&lsquo;entrée en formation</strong><br/>
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
              <strong>Certification</strong><br/>
              <span>{conseiller?.certifie ? 'Oui' : 'Non'}</span>
            </div>
          </div>
        </div>
        <div className="fr-grid-row fr-mt-5w fr-mb-2w">
          <div className="fr-col-12">
            <hr style={{ borderWidth: '0.5px' }}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConseillerDetails;
