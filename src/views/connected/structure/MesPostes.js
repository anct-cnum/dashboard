import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopinAnnulationReConvention from './popins/popinAnnulationReConvention';
import PopinEditionContrat from './popins/popinEditionContrat';
import { ValidatedRenouvellementBanner } from './banners';
import { ManagePositionsCard, HireAdvisorCard } from './cards';
import Spinner from '../../../components/Spinner';
import {
  structureActions,
  reconventionnementActions,
  miseEnRelationAction,
  contratActions
} from '../../../actions';
import {
  InactiveAdvisorsSection,
  ActiveAdvisorsSection,
  RenewAdvisorsSection,
  ActiveNoRenewalAdvisorsSection,
  ReconventionnementBanner
} from './views';
import { useAdvisors } from './hooks/useAdvisors';
import { useErrors } from './hooks/useErrors';
import { useStructure } from './hooks/useStructure';
import { StatutConventionnement } from '../../../utils/enumUtils';

function MesPostes() {
  const [openModalContrat, setOpenModalContrat] = useState(false);
  const misesEnRelation = useSelector(state => state?.misesEnRelation?.misesEnRelation);
  const errorMisesEnRelation = useSelector(state => state?.misesEnRelation?.error);
  const errorStructure = useSelector(state => state?.structure?.error);
  const userAuth = useSelector(state => state.authentication?.user);
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const loadingStructure = useSelector(state => state.structure?.loading);
  const loadingMisesEnRelation = useSelector(state => state.misesEnRelations?.loading);
  const loadingRenouvellement = useSelector(state => state.contrat?.loading);
  const [miseEnrelationId, setMiseEnrelationId] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selectedConseiller, setSelectedConseiller] = useState(null);
  const [showValidateBanner, setShowValidateBanner] = useState(true);
  const [motif, setMotif] = useState('');
  const dispatch = useDispatch();
  const {
    conseillersActifs,
    conseillersARenouveler,
    conseillersActifsNonRenouveles,
    bannieresRenouvellementValide,
    setBannieresRenouvellementValide,
  } = useAdvisors();
  const { handleErrors } = useErrors([errorStructure, errorMisesEnRelation]);
  const { structure, openModal, setOpenModal } = useStructure();

  function getClassName() {
    const withBannerOnTopStatuses = [
      StatutConventionnement.CONVENTIONNEMENT_VALIDÉ,
      StatutConventionnement.RECONVENTIONNEMENT_EN_COURS,
      StatutConventionnement.RECONVENTIONNEMENT_INITIÉ,
    ];
    if (withBannerOnTopStatuses.includes(structure?.conventionnement?.statut)) {
      return 'withBannerOnTop';
    }
    if (bannieresRenouvellementValide?.length > 0) {
      return 'withBannerOnTop';
    }
    if (showValidateBanner && structure?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_VALIDÉ) {
      return 'withBannerOnTop';
    }
    if (structure?.conventionnement?.statut === StatutConventionnement.NON_INTERESSÉ) {
      return 'withoutBannerOnTop';
    }
  }

  useEffect(() => {
    if (structure?._id) {
      dispatch(miseEnRelationAction.getMisesEnRelationByStructure(structure?._id));
    }
  }, [structure?._id, loadingRenouvellement]);

  useEffect(() => {
    const bannerClosed = localStorage.getItem('bannerClosed');
    if (bannerClosed === 'true') {
      setShowValidateBanner(false);
    }
  }, []);

  useEffect(() => {
    handleErrors();
  }, [errorMisesEnRelation, errorStructure]);

  const handleOpenModalContrat = (editMode = false, conseiller = null) => {
    setEditMode(editMode);
    setSelectedConseiller(conseiller);
    setOpenModalContrat(true);
  };

  const handleCancel = () => {
    dispatch(reconventionnementActions.update(structure?._id, 'annuler', [], null, motif));
    dispatch(structureActions.getDetails(userAuth?.entity?.$id));
  };

  const createContract = (typeDeContrat, dateDebut, dateFin, salaire) => {
    dispatch(contratActions.createContract(typeDeContrat, dateDebut, dateFin, salaire, miseEnrelationId));
  };

  const updateContract = (typeDeContrat, dateDebut, dateFin, salaire, id) => {
    dispatch(contratActions.updateContract(typeDeContrat, dateDebut, dateFin, salaire, id));
  };

  return (
    <>
      {bannieresRenouvellementValide?.length > 0 &&
        bannieresRenouvellementValide.map(conseiller => {
          return (
            <ValidatedRenouvellementBanner
              key={conseiller._id}
              conseiller={conseiller}
              setBannieresRenouvellementValide={setBannieresRenouvellementValide}
              bannieresRenouvellementValide={bannieresRenouvellementValide}
            />
          );
        })}
      <ReconventionnementBanner
        structure={structure}
        roleActivated={roleActivated}
        conseillersActifs={conseillersActifs}
        showValidateBanner={showValidateBanner}
        setShowValidateBanner={setShowValidateBanner}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      {openModalContrat && (
        <PopinEditionContrat
          setOpenModalContrat={setOpenModalContrat}
          updateContract={updateContract}
          conseiller={selectedConseiller}
          editMode={editMode}
          createContract={createContract}
        />
      )}
      {openModal && (
        <PopinAnnulationReConvention setOpenModal={setOpenModal} handleCancel={handleCancel} motif={motif} setMotif={setMotif} />
      )}
      <div className="fr-container">
        <Spinner loading={loadingStructure || loadingMisesEnRelation || loadingRenouvellement} />
        <h2
          className={`fr-mb-6w ${getClassName()}`}
          style={{ color: '#000091' }}
        >
          G&eacute;rer mes postes
        </h2>
        <ManagePositionsCard structure={structure} />
        {misesEnRelation?.length > 0 && (
          <>
            <HireAdvisorCard
              nbreConseillersActifs={conseillersActifs.length}
              nbreConseillersRenouveler={conseillersARenouveler.length}
              structure={structure}
            />
            <RenewAdvisorsSection
              conseillersARenouveler={conseillersARenouveler}
              structure={structure}
              setMiseEnrelationId={setMiseEnrelationId}
              setOpenModalContrat={setOpenModalContrat}
              handleOpenModalContrat={handleOpenModalContrat}
            />
            <ActiveAdvisorsSection
              conseillersActifs={conseillersActifs}
              structure={structure}
              setMiseEnrelationId={setMiseEnrelationId}
            />
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
