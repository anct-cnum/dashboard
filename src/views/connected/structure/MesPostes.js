import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopinAnnulationReConvention from './popins/popinAnnulationReConvention';
import PopinEditionContrat from './popins/popinEditionContrat';
import RequestBanner from './banners/RequestBanner';
import InProgressBanner from './banners/InProgessBanner';
import CompleteRequestBanner from './banners/CompleteRequestBanner';
import ValidatedBanner from './banners/ValidatedBanner';
import ManagePositionsCard from './cards/ManagePositionsCard';
import HireAdvisorCard from './cards/HireAdvisorCard';
import Spinner from '../../../components/Spinner';
import { scrollTopWindow } from '../../../utils/exportsUtils';
import {
  structureActions,
  reconventionnementActions,
  renouvellementActions,
  miseEnRelationAction,
  alerteEtSpinnerActions
} from '../../../actions';
import InactiveAdvisorsSection from './views/InactiveAdvisorsSection';
import ActiveAdvisorsSection from './views/ActiveAdvisorsSection';
import RenewAdvisorsSection from './views/RenewAdvisorsSection';
import ActiveNoRenewalAdvisorsSection from './views/ActiveNoRenewalAdvisorsSection';

function MesPostes() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalContrat, setOpenModalContrat] = useState(false);
  const misesEnrelation = useSelector(state => state?.misesEnRelation?.misesEnRelation);
  const errorMisesEnRelation = useSelector(state => state?.misesEnRelation?.error);
  const errorStructure = useSelector(state => state?.structure?.error);
  const userAuth = useSelector(state => state.authentication?.user);
  const structure = useSelector(state => state.structure?.structure);
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const loadingStructure = useSelector(state => state.structure?.loading);
  const loadingMisesEnRelation = useSelector(state => state.misesEnRelations?.loading);
  const loadingRenouvellement = useSelector(state => state.renouvellement?.loading);
  const [miseEnrelationId, setMiseEnrelationId] = useState('');
  const [conseillersActifs, setConseillersActifs] = useState([]);
  const [conseillersARenouveler, setConseillersARenouveler] = useState([]);
  const [conseillersActifsNonRenouveles, setConseillersActifsNonRenouveles] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedConseiller, setSelectedConseiller] = useState(null);
  const [showValidateBanner, setShowValidateBanner] = useState(true);
  const [motif, setMotif] = useState('');
  const dispatch = useDispatch();

  const displayBanner = () => {
    switch (structure?.conventionnement?.statut) {
      case 'ENREGISTRÉ':
        return <CompleteRequestBanner structure={structure} />;
      case 'RECONVENTIONNEMENT_EN_COURS':
        return <InProgressBanner structure={structure} roleActivated={roleActivated} />;
      case 'RECONVENTIONNEMENT_VALIDÉ':
        return (
          showValidateBanner && (
            <ValidatedBanner structure={structure} conseillersActifs={conseillersActifs} setShowValidateBanner={setShowValidateBanner} />
          )
        );
      case 'CONVENTIONNEMENT_VALIDÉ':
        return <RequestBanner openModal={openModal} setOpenModal={setOpenModal} />;
      default:
        return null;
    }
  };

  const computeMarginTop = () => {
    if (!showValidateBanner && structure?.conventionnement?.statut === 'RECONVENTIONNEMENT_VALIDÉ') {
      return '100px';
    }
    if (showValidateBanner || structure?.conventionnement?.statut !== 'NON_INTERESSÉ') {
      return '240px';
    }
    return '100px';
  };

  const handleOpenModalContrat = (editMode = false, conseiller = null) => {
    setEditMode(editMode);
    setSelectedConseiller(conseiller);
    setOpenModalContrat(true);
  };

  useEffect(() => {
    dispatch(structureActions.getDetails(userAuth?.entity?.$id));
  }, [openModal]);

  useEffect(() => {
    if (structure?._id) {
      dispatch(miseEnRelationAction.getMisesEnRelationByStructure(structure?._id));
    }
  }, [structure?._id, loadingRenouvellement]);

  const createConseiller = miseEnRelation => {
    const {
      conseillerObj,
      reconventionnement,
      _id,
      renouvellement,
      dateDebutDeContrat,
      dateFinDeContrat,
      typeDeContrat,
      salaire,
      statut,
      originalMiseEnRelation,
      miseEnRelationConventionnement,
    } = miseEnRelation;
    return {
      ...conseillerObj,
      originalMiseEnRelation,
      miseEnRelationConventionnement,
      reconventionnement,
      miseEnrelationId: _id,
      renouvellement,
      dateDebutDeContrat,
      dateFinDeContrat,
      typeDeContrat,
      salaire,
      statut,
    };
  };

  useEffect(() => {
    if (misesEnrelation) {
      const recrutees = misesEnrelation
      .filter(({ statut }) => statut === 'finalisee')
      .map(miseEnRelation => {
        if (miseEnRelation?.reconventionnement) {
          return createConseiller(miseEnRelation);
        } else {
          const { conseillerObj, typeDeContrat } = miseEnRelation;
          return { ...conseillerObj, typeDeContrat, statut: 'finalisee' };
        }
      });

      const nouvellesRuptures = misesEnrelation
      .filter(({ statut }) => statut === 'nouvelle_rupture')
      .map(({ conseillerObj }) => ({ ...conseillerObj, statut: 'nouvelle_rupture' }));

      const conseillersARenouveler = misesEnrelation
      .filter(miseEnRelation => {
        if (!miseEnRelation) {
          return false;
        }
        const hasReconventionnement = miseEnRelation.reconventionnement;
        const isNotCDI = miseEnRelation.typeDeContrat !== 'CDI';
        const isRenouvellementInitie = miseEnRelation.statut === 'renouvellement_initié';
        const isFinaliseeWithoutConventionnement = miseEnRelation.statut === 'finalisee' &&
         !miseEnRelation.miseEnRelationConventionnement;
        return hasReconventionnement && isNotCDI && (isRenouvellementInitie || isFinaliseeWithoutConventionnement);
      })
      .map(createConseiller);

      const conseillersActifsNonRenouveles = misesEnrelation
      .filter(miseEnRelation => !miseEnRelation.reconventionnement)
      .map(createConseiller);

      setConseillersActifsNonRenouveles(conseillersActifsNonRenouveles);
      setConseillersARenouveler(conseillersARenouveler);
      setConseillersActifs([...recrutees, ...nouvellesRuptures]);
    }
  }, [misesEnrelation]);

  useEffect(() => {
    const bannerClosed = localStorage.getItem('bannerClosed');
    if (bannerClosed === 'true') {
      setShowValidateBanner(false);
    }
  }, []);

  const handleCancel = () => {
    dispatch(reconventionnementActions.update(structure?._id, 'annuler', [], null, motif));
    dispatch(structureActions.getDetails(userAuth?.entity?.$id));
  };

  const createContract = (typeDeContrat, dateDebut, dateFin, salaire) => {
    dispatch(renouvellementActions.createContract(typeDeContrat, dateDebut, dateFin, salaire, miseEnrelationId));
  };

  const updateContract = (typeDeContrat, dateDebut, dateFin, salaire, id) => {
    dispatch(renouvellementActions.updateContract(typeDeContrat, dateDebut, dateFin, salaire, id));
  };

  const errorMessages = {
    errorStructure: 'La structure n\'a pas pu être chargée !',
    errorMisesEnRelation: 'Les mises en relation n\'ont pas pu être chargées !',
  };

  const getErrorMessage = detectedError => {
    return errorMessages[detectedError];
  };

  useEffect(() => {
    const errors = [errorStructure, errorMisesEnRelation];
    const detectedErrors = errors.filter(error => error !== false);

    if (detectedErrors.length > 0) {
      scrollTopWindow();
      dispatch(
        alerteEtSpinnerActions.getMessageAlerte({
          type: 'error',
          message: getErrorMessage(detectedErrors[0]),
          status: null,
          description: null,
        })
      );
    }
  }, [errorMisesEnRelation, errorStructure]);

  return (
    <>
      {structure ? displayBanner() : null}
      {openModalContrat && (
        <PopinEditionContrat
          setOpenModalContrat={setOpenModalContrat}
          updateContract={updateContract}
          conseiller={selectedConseiller}
          editMode={editMode}
          createContract={createContract}
        />
      )}
      {openModal && <PopinAnnulationReConvention setOpenModal={setOpenModal} handleCancel={handleCancel} motif={motif} setMotif={setMotif} />}
      <div className="fr-container">
        <Spinner loading={loadingStructure || loadingMisesEnRelation || loadingRenouvellement} />
        <h2
          className="fr-mb-6w"
          style={{
            marginTop: computeMarginTop(),
            color: '#000091',
          }}
        >
          G&eacute;rer mes postes
        </h2>
        <ManagePositionsCard structure={structure} />
        {misesEnrelation?.length > 0 && (
          <>
            <HireAdvisorCard
              nbreConseillersActifs={conseillersActifs.length}
              nbPostesAttribuees={structure?.conventionnement?.dossierReconventionnement?.nbPostesAttribuees}
            />
            <RenewAdvisorsSection
              conseillersARenouveler={conseillersARenouveler}
              structure={structure}
              setMiseEnrelationId={setMiseEnrelationId}
              setOpenModalContrat={setOpenModalContrat}
              handleOpenModalContrat={handleOpenModalContrat}
            />
            <ActiveAdvisorsSection conseillersActifs={conseillersActifs} structure={structure} setMiseEnrelationId={setMiseEnrelationId} />
            <ActiveNoRenewalAdvisorsSection
              conseillersActifsNonRenouveles={conseillersActifsNonRenouveles}
              structure={structure}
              roleActivated={roleActivated}
            />
            <InactiveAdvisorsSection />
          </>
        )}
      </div>
    </>
  );
}

export default MesPostes;
