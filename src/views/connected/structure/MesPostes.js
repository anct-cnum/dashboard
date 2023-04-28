import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopinAnnulationReConvention from './popins/popinAnnulationReConvention';
import RequestBanner from './banners/RequestBanner';
import InProgressBanner from './banners/InProgessBanner';
import CompleteRequestBanner from './banners/CompleteRequestBanner';
import ValidatedBanner from './banners/ValidatedBanner';
import ManagePositionsCard from './cards/ManagePositionsCard';
import HireAdvisorCard from './cards/HireAdvisorCard';
import AdvisorCard from './cards/AdvisorCard';
import Spinner from '../../../components/Spinner';
import { scrollTopWindow } from '../../../utils/exportsUtils';
import { structureActions, reconventionnementActions, miseEnRelationAction, alerteEtSpinnerActions } from '../../../actions';


function MesPostes() {
  const [openModal, setOpenModal] = useState(false);
  const misesEnrelation = useSelector(state => state?.misesEnRelation?.misesEnRelation);
  const errorMisesEnRelation = useSelector(state => state?.misesEnRelation?.error);
  const errorStructure = useSelector(state => state?.structure?.error);
  const userAuth = useSelector(state => state.authentication?.user);
  const structure = useSelector(state => state.structure?.structure);
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const loadingStructure = useSelector(state => state.structure?.loading);
  const loadingMisesEnRelation = useSelector(state => state.misesEnRelations?.loading);
  const [conseillersActifs, setConseillersActifs] = useState([]);
  const [motif, setMotif] = useState('');
  const dispatch = useDispatch();

  const displayBanner = () => {
    switch (structure?.conventionnement?.statut) {
      case 'ENREGISTRÉ':
        return <CompleteRequestBanner structure={structure}/>;
      case 'RECONVENTIONNEMENT_EN_COURS':
        return <InProgressBanner structure={structure} roleActivated={roleActivated}/>;
      case 'RECONVENTIONNEMENT_VALIDÉ':
        return <ValidatedBanner structure={structure}/>;
      case 'CONVENTIONNEMENT_VALIDÉ':
        return <RequestBanner openModal={openModal} setOpenModal={setOpenModal} />;
      default:
        return null;
    }
  };

  
  useEffect(() => {
    dispatch(structureActions.getDetails(userAuth?.entity?.$id));
  }, []);
  
  useEffect(() => {
    if (structure?._id) {
      dispatch(miseEnRelationAction.getMisesEnRelationByStructure(structure?._id));
    }
  }, [structure?._id]);
  
  useEffect(() => {
    if (misesEnrelation) {
      // conseillers qui ont été recrutés et dont le contrat est en cours
      const recrutees = misesEnrelation.filter(({ statut }) => statut === 'finalisee')
      .map(miseEnRelation => ({
        ...miseEnRelation.conseillerObj,
        statut: miseEnRelation.statut,
        dateDebutDeContrat: miseEnRelation.dateDebutDeContrat,
        dateFinDeContrat: miseEnRelation.dateFinDeContrat,
        typeDeContrat: miseEnRelation.typeDeContrat,
      }));
      // conseillers qui ont été recrutés et dont le contrat est en cours de rupture
      const nouvellesRuptures = misesEnrelation
      .filter(({ statut }) => statut === 'nouvelle_rupture')
      .map(miseEnRelation => ({
        ...miseEnRelation.conseillerObj,
        statut: miseEnRelation.statut,
        dateDebutDeContrat: miseEnRelation.dateDebutDeContrat,
        dateFinDeContrat: miseEnRelation.dateFinDeContrat,
        typeDeContrat: miseEnRelation.typeDeContrat,
      }));
      
      setConseillersActifs([...recrutees, ...nouvellesRuptures]);
    }
  }, [misesEnrelation]);
  
  const handleCancel = () => {
    dispatch(reconventionnementActions.update(structure?._id, 'annuler', [], null, motif));
    dispatch(structureActions.getDetails(userAuth?.entity?.$id));
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
      {openModal && <PopinAnnulationReConvention setOpenModal={setOpenModal} handleCancel={handleCancel} motif={motif} setMotif={setMotif} />}
      <div className="fr-container">
        <Spinner loading={loadingStructure || loadingMisesEnRelation} />
        {structure?.conventionnement?.statut !== 'NON_INTERESSÉ' ? (
          <h2 className="fr-mb-6w" style={{ marginTop: '187px' }}>
            G&eacute;rer mes postes
          </h2>
        ) : (
          <h2 className="fr-mb-6w" style={{ color: '#000091' }}>
            {' '}
            G&eacute;rer mes postes
          </h2>
        )}
        <ManagePositionsCard structure={structure}/>
        {
          misesEnrelation?.length > 0 &&
        <>
          <HireAdvisorCard nbreConseillersActifs={conseillersActifs.length} />
          <div className="container fr-mt-4w">
            <p className="fr-text--bold">Vos conseillers actifs ({conseillersActifs.length})</p>
            {misesEnrelation &&
            conseillersActifs?.map((conseiller, idx) => <AdvisorCard conseiller={conseiller} roleActivated={roleActivated} key={idx} />)}
          </div>
          <section className="fr-accordion fr-mt-4w">
            <h3 className="fr-accordion__title">
              <button className="fr-accordion__btn fr-text--bold" aria-expanded="false" aria-controls="accordion-106">
              Vos anciens conseillers -
              </button>
            </h3>
            <div className="fr-collapse" id="accordion-106">
              Aucun conseiller inactif associ&eacute; &agrave; la structure
            </div>
          </section>
        </>
        }
      </div>
    </>
  );
}

export default MesPostes;
