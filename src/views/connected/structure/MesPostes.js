import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopinAnnulationReConvention from './popins/PopinAnnulationReConvention';
import PopinEditionContrat from './popins/PopinEditionContrat';
import { ManagePositionsCard, HireAdvisorCard, HireCoordinatorCard } from './cards';
import { scrollTopWindow } from '../../../utils/exportsUtils';
import Spinner from '../../../components/Spinner';
import {
  structureActions,
  reconventionnementActions,
  miseEnRelationAction,
  alerteEtSpinnerActions,
  contratActions
} from '../../../actions';
import {
  InactiveAdvisorsSection,
  ActiveAdvisorsSection,
  RenewAdvisorsSection,
  ActiveNoRenewalAdvisorsSection,
  MesPostesBanners
} from './views';
import { useAdvisors } from './hooks/useAdvisors';
import { useErrors } from './hooks/useErrors';
import { useStructure } from './hooks/useStructure';
import HiringInProgressAdvisorsSection from './views/HiringInProgressAdvisorsSection';

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
  const successSendMail = useSelector(state => state.conseiller?.successRelanceInvitation);
  const errorSendMail = useSelector(state => state.conseiller?.errorRelanceInvitation);

  const [editMode, setEditMode] = useState(false);
  const [selectedConseiller, setSelectedConseiller] = useState(null);
  const [motif, setMotif] = useState('');
  const dispatch = useDispatch();
  const {
    conseillersActifsEtRenouveller,
    conseillersActifs,
    conseillersARenouveler,
    conseillersActifsNonRenouveles,
    conseillersEnCoursDeRecrutement,
    anciensConseillers,
    bannieresRenouvellementValide,
    bannieresAjoutRoleCoordinateur,
    setBannieresRenouvellementValide,
    setBanniereAjoutRoleCoordinateur
  } = useAdvisors();
  const { handleErrors } = useErrors([errorStructure, errorMisesEnRelation]);
  const { structure, openModal, setOpenModal } = useStructure();
  const countDemandesCoordinateurValide =
    structure?.demandesCoordinateur?.filter(
      demandeCoordinateur => demandeCoordinateur.statut === 'validee',
    ).length || 0;

  useEffect(() => {
    if (structure?._id) {
      dispatch(miseEnRelationAction.getMisesEnRelationByStructure(structure?._id));
    }
  }, [structure?._id, loadingRenouvellement, loadingStructure]);

  useEffect(() => {
    handleErrors();
  }, [errorMisesEnRelation, errorStructure]);

  useEffect(() => {
    scrollTopWindow();
    if (successSendMail) {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'success',
        message: successSendMail,
        status: null, description: null
      }));
    }
    if (errorSendMail) {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'L\'envoi d\'email de relance de l\'invitation à l\'espace Coop à échoué !',
        status: null, description: null
      }));
    }
  }, [successSendMail, errorSendMail]);

  const handleOpenModalContrat = (editMode = false, conseiller = null) => {
    setEditMode(editMode);
    setSelectedConseiller(conseiller);
    setOpenModalContrat(true);
  };

  const handleCancel = () => {
    if (motif === 'Je ne sais pas encore si je souhaite reconventionner car je manque de visibilité sur les prochains mois') {
      setMotif('');
      return;
    }
    dispatch(reconventionnementActions.update(structure?._id, 'annuler', [], null, motif));
    dispatch(structureActions.getDetails(userAuth?.entity?.$id));
  };

  const createContract = (typeDeContrat, dateDebut, dateFin, salaire, miseEnrelationId) => {
    dispatch(contratActions.createContract(typeDeContrat, dateDebut, dateFin, salaire, miseEnrelationId));
  };

  const updateContract = (typeDeContrat, dateDebut, dateFin, salaire, miseEnrelationId) => {
    dispatch(contratActions.updateContract(typeDeContrat, dateDebut, dateFin, salaire, miseEnrelationId));
  };

  return (
    <div className="mes-postes">
      <div className="main__banner">
        <MesPostesBanners
          structure={structure}
          roleActivated={roleActivated}
          openModal={openModal}
          setOpenModal={setOpenModal}
          bannieresRenouvellementValide={bannieresRenouvellementValide}
          bannieresAjoutRoleCoordinateur={bannieresAjoutRoleCoordinateur}
          setBannieresAjoutRoleCoordinateur={setBanniereAjoutRoleCoordinateur}
          setBannieresRenouvellementValide={setBannieresRenouvellementValide}
        />
      </div>
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
          className={`fr-mb-6w`}
          style={{ color: '#000091' }}
        >
          G&eacute;rer mes postes
        </h2>
        <ManagePositionsCard
          structure={structure} c
          cardStyle={{ backgroundColor: '#E8EDFF' }}
          hasBorder={false}
          nbreConseillersActifs={conseillersActifs.length}
          nbreConseillersRenouveler={conseillersARenouveler.length}
          nbreConseillersEnCoursDeRecrutement={conseillersEnCoursDeRecrutement.length}
        />
        <HireAdvisorCard
          conseillersActifsEtRenouveller={conseillersActifsEtRenouveller.length}
          nbreConseillersEnCoursDeRecrutement={conseillersEnCoursDeRecrutement.length}
          structure={structure}
        />
        {countDemandesCoordinateurValide > 0 &&
          <HireCoordinatorCard
            conseillersActifs={conseillersActifs}
            conseillersARenouveler={conseillersARenouveler}
            conseillersActifsNonRenouveles={conseillersActifsNonRenouveles}
            structure={structure}
            nbPostesCoordoDisponible={countDemandesCoordinateurValide}
          />
        }
        {misesEnRelation?.length > 0 && (
          <>
            {
              conseillersARenouveler?.length > 0 &&
              <RenewAdvisorsSection
                conseillersARenouveler={conseillersARenouveler}
                structure={structure}
                roleActivated={roleActivated}
                handleOpenModalContrat={handleOpenModalContrat}
              />
            }
            {
              conseillersActifs?.length > 0 &&
              <ActiveAdvisorsSection
                conseillersActifs={conseillersActifs}
                structure={structure}
              />
            }
            {
              conseillersActifsNonRenouveles?.length > 0 &&
              <ActiveNoRenewalAdvisorsSection
                conseillersActifsNonRenouveles={conseillersActifsNonRenouveles}
                structure={structure}
                roleActivated={roleActivated}
              />
            }
            {
              conseillersEnCoursDeRecrutement?.length > 0 &&
              <HiringInProgressAdvisorsSection conseillersEnCoursDeRecrutement={conseillersEnCoursDeRecrutement} />
            }
            {
              anciensConseillers?.length > 0 &&
              <InactiveAdvisorsSection anciensConseillers={anciensConseillers} />
            }
          </>
        )}
      </div>
    </div>
  );
}

export default MesPostes;
