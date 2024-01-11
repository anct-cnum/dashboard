import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions, alerteEtSpinnerActions } from '../../../../actions';
import { displayBadgeStatutCandidat, formatNomConseiller, pluralize } from '../../../../utils/formatagesUtils';
import Spinner from '../../../../components/Spinner';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import pinCNFS from '../../../../assets/icons/pin-cnfs.svg';
import { Tooltip } from 'react-tooltip';
import PopinInteressee from '../popins/PopinInteressee';
import PopinRecrutee from '../popins/PopinRecrutee';
import PopinNouvelleRupture from '../popins/PopinNouvelleRupture';
import ButtonsAction from './ButtonsAction';
import InformationConseiller from '../../../../components/InformationConseiller';

function CandidatureConseillerDetails() {

  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const errorConseiller = useSelector(state => state.conseiller?.error);
  const loading = useSelector(state => state.conseiller?.loading);
  const loadingContrat = useSelector(state => state.contrat?.loading);
  const errorContrat = useSelector(state => state.contrat?.error);
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const errorPreselection = useSelector(state => state.conseiller?.errorPreselection);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const [displayModal, setDisplayModal] = useState(true);
  const [misesEnRelationFinalisee, setMisesEnRelationFinalisee] = useState([]);
  const [misesEnRelationSansMission, setMisesEnRelationSansMission] = useState([]);
  const [misesEnRelationNouvelleRupture, setMisesEnRelationNouvelleRupture] = useState(null);

  useEffect(() => {
    if (!errorConseiller) {
      if (conseiller?._id !== id) {
        dispatch(conseillerActions.getCandidatureConseillerStructure(id));
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Le conseiller n\'a pas pu être chargé !',
        status: null, description: null
      }));
    }
  }, [errorConseiller]);

  const updateStatut = statut => {
    dispatch(conseillerActions.updateStatus(conseiller.miseEnRelation?._id, statut));
    scrollTopWindow();
  };

  useEffect(() => {
    if (conseiller !== undefined) {
      setMisesEnRelationNouvelleRupture(conseiller.misesEnRelation?.filter(miseEnRelation => miseEnRelation.statut === 'nouvelle_rupture')[0]);
      setMisesEnRelationFinalisee(conseiller.misesEnRelation?.filter(miseEnRelation => miseEnRelation.statut === 'finalisee'));
      setMisesEnRelationSansMission(conseiller.misesEnRelation?.filter(
        miseEnRelation =>
          miseEnRelation.statut === 'finalisee_rupture' || miseEnRelation.statut === 'terminee_naturelle'
      ));
    }
  }, [conseiller]);

  const checkConseillerWithoutBtnAction = statut => !!(statut === 'finalisee' || statut === 'finalisee_rupture');

  return (
    <div className="fr-container conseillerDetails">
      <Spinner loading={loading || loadingContrat} />
      {location?.state?.origin_parent ?
        <Link
          to={location?.state?.origin_parent} state={{ currentPage }}
          className="fr-btn fr-btn--sm fr-fi-arrow-left-line fr-btn--icon-left fr-btn--tertiary">
          Retour &agrave; la liste
        </Link> :
        <button
          onClick={() => window.close()}
          className="fr-btn fr-btn--sm fr-fi-arrow-left-line fr-btn--icon-left fr-btn--tertiary">
          Retour &agrave; la liste
        </button>
      }
      {(errorContrat !== undefined && errorContrat !== false) &&
        <div className="fr-alert fr-alert--error fr-mt-3w">
          <p>{errorContrat}</p>
        </div>
      }
      {(errorPreselection !== undefined && errorPreselection !== false) &&
      <div className="fr-alert fr-alert--error fr-mt-3w">
        <p>{errorPreselection}</p>
      </div>
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
        <h1 className="fr-h1 fr-mb-2v" style={{ color: '#000091' }}>
          {conseiller ? formatNomConseiller(conseiller) : ''}
          <img
            data-tooltip-content="Cette personne a une exp&eacute;rience de conseiller-&egrave;re num&eacute;rique"
            data-tooltip-id="tooltip-cnfs-candidat-non-mise-en-relation"
            data-tooltip-float="true"
            className={`fr-ml-2w ${conseiller ? '' : 'fr-hidden'}`}
            src={pinCNFS}
            alt="logo CNFS"
            style={{ height: '50px', position: 'absolute' }}
          />
        </h1>
        <Tooltip id="tooltip-cnfs-candidat-non-mise-en-relation" variant="light" className="infobulle" />
      </div>
      <div className="fr-col-12">
        <div className="fr-grid-row" style={{ alignItems: 'center' }}>
          <h5 className={`fr-h5 ${checkConseillerWithoutBtnAction(conseiller?.miseEnRelation?.statut) ? 'fr-mb-3v' : 'fr-mb-1v'}`}>
            ID - {conseiller?.idPG ?? ''}
          </h5>
        </div>
      </div>
      {displayModal &&
        <>
          {conseiller?.miseEnRelation?.statut === 'interessee' &&
            <PopinInteressee setDisplayModal={setDisplayModal} />
          }
          {conseiller?.miseEnRelation?.statut === 'recrutee' &&
            <PopinRecrutee setDisplayModal={setDisplayModal} urlDossierDS={conseiller?.urlDossierDS} />
          }
          {conseiller?.miseEnRelation?.statut === 'nouvelle_rupture' &&
            <PopinNouvelleRupture setDisplayModal={setDisplayModal} />
          }
        </>
      }
      {conseiller &&
        <div className="fr-col-12 fr-grid-row" style={{ alignItems: 'center' }}>
          {Object.keys(misesEnRelationFinalisee || {}).length > 0 &&
            <p className="fr-badge fr-mr-2w fr-badge--success" style={{ height: '20%' }}>Contrat en cours</p>
          }
          {(conseiller?.statutCandidat === 'RUPTURE' || conseiller?.statutCandidat === 'TERMINE') &&
            <p className="fr-badge fr-badge--error fr-mr-2w" style={{ height: '20%' }}>Contrat termin&eacute;</p>
          }
          {misesEnRelationFinalisee?.statut === 'nouvelle_rupture' &&
            <p className="fr-badge fr-badge--warning fr-mt-2w fr-mt-md-0" style={{ height: '20%' }}>Rupture en cours</p>
          }
          {conseiller?.miseEnRelation?.statut &&
            <>
              {displayBadgeStatutCandidat(conseiller?.miseEnRelation?.statut)}
            </>
          }
          <ButtonsAction
            miseEnRelation={conseiller?.miseEnRelation}
            updateStatut={updateStatut}
            setDisplayModal={setDisplayModal}
            idConseiller={conseiller?._id}
          />
        </div>
      }
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
            className="fr-btn fr-icon-line-chart-line fr-btn--icon-left fr-ml-auto"
            title="Statistiques"
            to={`/${roleActivated}/candidature/statistiques-conseiller/${conseiller?._id}`}
            state={{
              'origin': `/${roleActivated}/candidature/conseiller/${conseiller?.miseEnRelation?._id}`,
              'origin_parent': location?.state?.origin_parent,
              conseiller
            }}
          >
            Voir ses statistiques
          </Link>
        </div>
      </div>
      <InformationConseiller
        conseiller={conseiller}
        misesEnRelationFinalisee={misesEnRelationFinalisee}
        misesEnRelationSansMission={misesEnRelationSansMission}
        misesEnRelationNouvelleRupture={misesEnRelationNouvelleRupture}
        roleActivated={roleActivated}
        recrutement={true}
      />
    </div>
  );
}

export default CandidatureConseillerDetails;
