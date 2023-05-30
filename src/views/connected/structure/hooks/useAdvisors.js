import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { miseEnRelationAction } from '../../../../actions';

export function useAdvisors() {
  const misesEnRelation = useSelector(state => state?.misesEnRelation?.misesEnRelation);
  const structure = useSelector(state => state.structure?.structure);
  const [conseillersActifs, setConseillersActifs] = useState([]);
  const [conseillersARenouveler, setConseillersARenouveler] = useState([]);
  const [conseillersActifsNonRenouveles, setConseillersActifsNonRenouveles] = useState([]);
  const [bannieresRenouvellementValide, setBannieresRenouvellementValide] = useState([]);
  const dispatch = useDispatch();

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
      banniereValidationRenouvellement
    } = miseEnRelation;
    return {
      ...conseillerObj,
      originalMiseEnRelation,
      miseEnRelationConventionnement,
      banniereValidationRenouvellement,
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
    if (structure?._id) {
      dispatch(miseEnRelationAction.getMisesEnRelationByStructure(structure?._id));
    }
  }, [structure?._id]);

  useEffect(() => {
    if (misesEnRelation) {
      const recrutees = misesEnRelation
      .filter(({ statut }) => statut === 'finalisee')
      .map(miseEnRelation => {
        if (miseEnRelation?.reconventionnement) {
          return createConseiller(miseEnRelation);
        } else {
          const { conseillerObj, typeDeContrat, dateDebut, dateFin } = miseEnRelation;
          return { ...conseillerObj, typeDeContrat, dateDebut, dateFin, statut: 'finalisee' };
        }
      });

      const nouvellesRuptures = misesEnRelation
      .filter(({ statut }) => statut === 'nouvelle_rupture')
      .map(({ conseillerObj }) => ({ ...conseillerObj, statut: 'nouvelle_rupture' }));

      const conseillersARenouveler = misesEnRelation
      .filter(miseEnRelation => {
        if (!miseEnRelation) {
          return false;
        }
        const hasReconventionnement = miseEnRelation.reconventionnement;
        const isNotCDI = miseEnRelation.typeDeContrat !== 'CDI';
        const isRenouvellementInitie = miseEnRelation.statut === 'renouvellement_initié';
        const isFinaliseeWithoutConventionnement =
            miseEnRelation.statut === 'finalisee' && !miseEnRelation.miseEnRelationConventionnement;
        return hasReconventionnement && isNotCDI && (isRenouvellementInitie || isFinaliseeWithoutConventionnement);
      })
      .map(createConseiller);

      const bannieresRenouvellementValide = misesEnRelation
      .filter(miseEnRelation => miseEnRelation.banniereValidationRenouvellement)
      .map(createConseiller);

      const conseillersActifsNonRenouveles = misesEnRelation
      .filter(miseEnRelation => !miseEnRelation.reconventionnement)
      .map(createConseiller);

      setConseillersActifsNonRenouveles(conseillersActifsNonRenouveles);
      setConseillersARenouveler(conseillersARenouveler);
      setConseillersActifs([...recrutees, ...nouvellesRuptures]);
      setBannieresRenouvellementValide(bannieresRenouvellementValide);
    }
  }, [misesEnRelation]);

  return {
    conseillersActifs,
    conseillersARenouveler,
    conseillersActifsNonRenouveles,
    bannieresRenouvellementValide,
    setBannieresRenouvellementValide,
  };
}
