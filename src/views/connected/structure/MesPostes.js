import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopinAnnulationReConvention from './popins/popinAnnulationReConvention';
import PopinEditionContrat from './popins/popinEditionContrat';
import ValidatedRenouvellementBanner from './banners/ValidatedRenouvellementBanner';
import ValidatedAvenantBanner from './banners/ValidatedAvenantBanner';
import ManagePositionsCard from './cards/ManagePositionsCard';
import HireAdvisorCard from './cards/HireAdvisorCard';
import Spinner from '../../../components/Spinner';
import {
  structureActions,
  reconventionnementActions,
  renouvellementActions,
  miseEnRelationAction
} from '../../../actions';
import InactiveAdvisorsSection from './views/InactiveAdvisorsSection';
import ActiveAdvisorsSection from './views/ActiveAdvisorsSection';
import RenewAdvisorsSection from './views/RenewAdvisorsSection';
import ActiveNoRenewalAdvisorsSection from './views/ActiveNoRenewalAdvisorsSection';
import ReconventionnementBanner from './views/ReconventionnementBanner';
import { useAdvisors } from './hooks/useAdvisors';
import { useErrors } from './hooks/useErrors';
import { useStructure } from './hooks/useStructure';

function MesPostes() {
  const [openModalContrat, setOpenModalContrat] = useState(false);
  const misesEnRelation = useSelector(state => state?.misesEnRelation?.misesEnRelation);
  const errorMisesEnRelation = useSelector(state => state?.misesEnRelation?.error);
  const errorStructure = useSelector(state => state?.structure?.error);
  const userAuth = useSelector(state => state.authentication?.user);
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const loadingStructure = useSelector(state => state.structure?.loading);
  const loadingMisesEnRelation = useSelector(state => state.misesEnRelations?.loading);
  const loadingRenouvellement = useSelector(state => state.renouvellement?.loading);
  const [miseEnrelationId, setMiseEnrelationId] = useState('');
  const [dernierAvenantValide, setDernierAvenantValide] = useState({});
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

  useEffect(() => {
    if (structure?._id) {
      dispatch(miseEnRelationAction.getMisesEnRelationByStructure(structure?._id));
    }
  }, [structure?._id, loadingRenouvellement]);
  
  useEffect(() => {
    if (structure?.demandesCoselec) {
      setDernierAvenantValide(structure?.lastDemandeCoselecValidee);
    }
  }, [structure]);
  
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
    dispatch(renouvellementActions.createContract(typeDeContrat, dateDebut, dateFin, salaire, miseEnrelationId));
  };

  const updateContract = (typeDeContrat, dateDebut, dateFin, salaire, id) => {
    dispatch(renouvellementActions.updateContract(typeDeContrat, dateDebut, dateFin, salaire, id));
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
      {dernierAvenantValide?.banniereValidationAvenant && (
        <ValidatedAvenantBanner
          demande={dernierAvenantValide}
          setDernierAvenantValide={setDernierAvenantValide}
          structure={structure}
        />
      )}
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
          createContract={createContract}
          editMode={editMode}
          conseiller={selectedConseiller}
          updateContract={updateContract}
        />
      )}
      {openModal && (
        <PopinAnnulationReConvention setOpenModal={setOpenModal} handleCancel={handleCancel} motif={motif} setMotif={setMotif} />
      )}
      <div className="fr-container">
        <Spinner loading={loadingStructure || loadingMisesEnRelation || loadingRenouvellement} />
        <h2
          className={`fr-mb-6w ${
            (!showValidateBanner && structure?.conventionnement?.statut === 'RECONVENTIONNEMENT_VALIDÉ') ||
            structure?.conventionnement?.statut === 'NON_INTERESSÉ' ?
              'withoutBannerOnTop' :
              'withBannerOnTop'
          }`}
          style={{ color: '#000091' }}
        >
          G&eacute;rer mes postes
        </h2>
        <ManagePositionsCard structure={structure} setDernierAvenantValide={setDernierAvenantValide} />
        {misesEnRelation?.length > 0 && (
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
