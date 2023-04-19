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
import { structureActions, reconventionnementActions, miseEnRelationAction } from '../../../actions';


function MesPostes() {
  const [openModal, setOpenModal] = useState(false);
  const misesEnrelation = useSelector(state => state?.misesEnRelation?.misesEnRelation);
  const userAuth = useSelector(state => state.authentication?.user);
  const dispatch = useDispatch();
  const structure = useSelector(state => state.structure?.structure);
  const roleActivated = useSelector(state => state.authentication?.roleActivated);
  const [conseillersActifs, setConseillersActifs] = useState([]);
  const [motif, setMotif] = useState('');
  const [statut, setStatut] = useState('');

  const displayBanner = () => {
    switch (statut) {
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
    dispatch(structureActions.get(userAuth?.entity?.$id));
  }, [statut]);

  useEffect(() => {
    if (structure?._id) {
      dispatch(miseEnRelationAction.getMisesEnRelationByStructure(structure?._id));
      setStatut(structure?.conventionnement?.statut);
    }
  }, [structure]);

  useEffect(() => {
    if (misesEnrelation) {
      // conseillers qui ont été recrutés et dont le contrat est en cours
      const recrutees = misesEnrelation.filter(({ statut }) => statut === 'finalisee')
      .map(({ conseillerObj }) => ({ ...conseillerObj, statut: 'finalisee' }));
      // conseillers qui ont été recrutés et dont le contrat est en cours de rupture
      const nouvellesRuptures = misesEnrelation
      .filter(({ statut }) => statut === 'nouvelle_rupture')
      .map(({ conseillerObj }) => ({ ...conseillerObj, statut: 'nouvelle_rupture' }));

      setConseillersActifs([...recrutees, ...nouvellesRuptures]);
    }
  }, [misesEnrelation]);

  const handleCancel = () => {
    dispatch(reconventionnementActions.update(structure?._id, 'annuler', [], null, motif));
    dispatch(structureActions.get(userAuth?.entity?.$id));
    setStatut('NON_INTERESSÉ');
  };

  return (
    <>
      {structure ? displayBanner() : null}
      {openModal && <PopinAnnulationReConvention setOpenModal={setOpenModal} handleCancel={handleCancel} motif={motif} setMotif={setMotif} />}
      <div className="fr-container">
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
