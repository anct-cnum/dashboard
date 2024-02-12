import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions, structureActions, alerteEtSpinnerActions, contratActions } from '../../../../actions';
import { formatNomConseiller } from '../../../../utils/formatagesUtils';
import Spinner from '../../../../components/Spinner';
import ModalValidationRupture from '../modals/ModalValidationRupture';
import CardsRupture from './ruptures/CardsRupture';
import CardsRenouvellement from './renouvellements/CardsRenouvellement';
import ModalValidationRenouvellement from '../modals/ModalValidationRenouvellement';
import PopinEditionContrat from '../../../connected/structure/popins/PopinEditionContrat';
import InformationConseiller from '../../../../components/InformationConseiller';
import StructureContactCards from '../../../../components/cards/StructureContactCards';
import { scrollTopWindow } from '../../../../utils/exportsUtils';

function ConseillerDetailsContrat() {

  const dispatch = useDispatch();
  const { idConseiller, idMiseEnRelation } = useParams();
  const location = useLocation();

  const conseiller = useSelector(state => state.conseiller?.conseillerContrat);
  const structure = useSelector(state => state.structure?.structure);
  const errorStructure = useSelector(state => state.structure?.error);
  const errorConseiller = useSelector(state => state.conseiller?.error);
  const loading = useSelector(state => state.conseiller?.loading);
  const loadingContrat = useSelector(state => state.contrat?.loading);
  const errorContrat = useSelector(state => state.contrat?.error);
  const errorRupture = useSelector(state => state.conseiller?.errorRupture);
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const [misesEnRelationFinalisee, setMisesEnRelationFinalisee] = useState([]);
  const [misesEnRelationNouvelleRupture, setMisesEnRelationNouvelleRupture] = useState(null);
  const [misesEnRelationFinaliseeRupture, setMisesEnRelationFinaliseeRupture] = useState([]);
  const [dateFinDeContratInitiale, setDateFinDeContratInitiale] = useState(new Date());
  const [dateFinDeContrat, setDateFinDeContrat] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModalContrat, setOpenModalContrat] = useState(false);
  const [libelleErreur, setLibelleErreur] = useState(false);

  useEffect(() => {
    if (!errorConseiller) {
      if (conseiller?._id !== idConseiller) {
        dispatch(conseillerActions.getConseillerContrat(idConseiller, idMiseEnRelation));
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
        const miseEnRelation = conseiller.misesEnRelation.filter(miseEnRelation => miseEnRelation.statut === 'nouvelle_rupture')[0];
        setMisesEnRelationFinalisee(conseiller.misesEnRelation.filter(miseEnRelation => miseEnRelation.statut === 'finalisee'));
        setMisesEnRelationNouvelleRupture(miseEnRelation);
        setMisesEnRelationFinaliseeRupture(conseiller.misesEnRelation.filter(miseEnRelation => miseEnRelation.statut === 'finalisee_rupture'));
        setDateFinDeContrat(miseEnRelation?.dateRupture ? new Date(miseEnRelation.dateRupture) : null);
        setDateFinDeContratInitiale(miseEnRelation?.dateFinDeContrat ?
          new Date(miseEnRelation.dateFinDeContrat) :
          new Date(new Date().setMonth(new Date().getMonth() + 2)));
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

  useEffect(() => {
    if (errorRupture || errorContrat) {
      scrollTopWindow();
      setLibelleErreur(errorRupture || errorContrat);
      setTimeout(() => {
        setLibelleErreur(false);
      }, 5000);
    }
  }, [errorRupture, errorContrat]);

  const updateContract = (typeDeContrat, dateDebut, dateFin, salaire) => {
    dispatch(contratActions.updateContract(typeDeContrat, dateDebut, dateFin, salaire, conseiller?.contrat?._id));
  };

  return (
    <div className="fr-container conseillerDetails">
      <Spinner loading={loading || loadingContrat} />
      <Link
        to={location?.state?.origin}
        state={{ currentPage, statutContrat: location?.state?.statutContrat ?? 'toutes' }}
        className="fr-btn fr-btn--sm fr-fi-arrow-left-line fr-btn--icon-left fr-btn--tertiary">
        Retour &agrave; la liste
      </Link>
      {libelleErreur &&
        <div className="fr-alert fr-alert--error fr-mt-4w">
          <p className="fr-alert__title">
            {libelleErreur}
          </p>
        </div>
      }
      {conseiller?.statut === 'RECRUTE' &&
        <>
          <div className="fr-col-12 fr-pt-6w">
            <h1 className="fr-h1 fr-mb-2v" style={{ color: '#000091' }}>{structure?.nom ?? '-'}</h1>
          </div>
          <div className="fr-col-12 fr-mb-4w">
            <div className="fr-grid-row" style={{ alignItems: 'center' }}>
              <span className="fr-h5" style={{ marginBottom: '0' }}>ID - {structure?.idPG ?? ''}</span>
              <button className="fr-btn fr-icon-eye-line fr-btn--icon-left fr-ml-auto"
                onClick={() => window.open(`/${roleActivated}/structure/${structure?._id}`)}>
                D&eacute;tails structure
              </button>
            </div>
          </div>
          <StructureContactCards structure={structure} />
          <div className="fr-grid-row fr-mt-7w fr-mb-2w fr-col-12">
            <div className="fr-col-12">
              <hr style={{ borderWidth: '0.5px' }} />
            </div>
          </div>
        </>
      }
      <div className={`fr-col-12 ${conseiller?.statut !== 'RECRUTE' ? 'fr-pt-6w' : ''}`}>
        <h1 className="fr-h1 fr-mb-2v" style={{ color: '#000091' }}>{conseiller ? formatNomConseiller(conseiller) : ''}</h1>
      </div>
      <div className="fr-col-12">
        <div className="fr-grid-row" style={{ alignItems: 'center' }}>
          <h5 className="fr-h5 fr-mb-3v">ID - {conseiller?.idPG ?? ''}</h5>
        </div>
      </div>
      {conseiller &&
        <>
          <div className="fr-col-12 fr-grid-row" style={{ alignItems: 'baseline' }}>
            {(misesEnRelationFinalisee.length > 0 || misesEnRelationNouvelleRupture) &&
              <p className="fr-badge fr-mr-2w fr-badge--success" style={{ height: '20%' }}>Contrat en cours</p>
            }
            {conseiller?.statut === 'RUPTURE' &&
              <p className="fr-badge fr-badge--error" style={{ height: '20%' }}>Contrat termin&eacute;</p>
            }
            {misesEnRelationNouvelleRupture &&
              <p className="fr-badge fr-badge--warning fr-mt-2w fr-mt-md-0" style={{ height: '20%' }}>Rupture en cours</p>
            }
          </div>
          {(conseiller?.contrat?.statut === 'finalisee_rupture' || conseiller?.contrat?.statut === 'nouvelle_rupture') &&
            <>
              <CardsRupture
                urlDossierDS={conseiller?.url}
                miseEnRelation={conseiller?.contrat}
                renouvellementEnCours={conseiller?.renouvellementEnCourss}
                setOpenModal={setOpenModal}
              />
              {openModal &&
                <ModalValidationRupture
                  setOpenModal={setOpenModal}
                  miseEnRelation={conseiller?.contrat}
                  dateFinDeContrat={dateFinDeContrat}
                  setDateFinDeContrat={setDateFinDeContrat}
                  dateFinDeContratInitiale={dateFinDeContratInitiale}
                />
              }
            </>
          }
          {(conseiller?.contrat?.statut === 'finalisee' || conseiller?.contrat?.statut === 'renouvellement_initiee') &&
            <>
              <CardsRenouvellement
                urlDossierDS={conseiller?.url}
                miseEnRelation={conseiller?.contrat}
                setOpenModal={setOpenModal}
                setOpenModalContrat={setOpenModalContrat}
              />
              {openModal &&
                <ModalValidationRenouvellement setOpenModal={setOpenModal} idMiseEnRelation={conseiller?.contrat?._id} />
              }
              {openModalContrat &&
                <PopinEditionContrat
                  setOpenModalContrat={setOpenModalContrat}
                  updateContract={updateContract}
                  conseiller={conseiller?.contrat}
                  editMode={true}
                />
              }
            </>
          }
        </>
      }
      <InformationConseiller
        conseiller={conseiller}
        misesEnRelationFinalisee={misesEnRelationFinalisee}
        misesEnRelationNouvelleRupture={misesEnRelationNouvelleRupture}
        misesEnRelationFinaliseeRupture={misesEnRelationFinaliseeRupture}
        roleActivated={roleActivated}
      />
    </div>
  );
}

export default ConseillerDetailsContrat;
