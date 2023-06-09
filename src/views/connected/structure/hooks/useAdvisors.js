import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { miseEnRelationAction } from '../../../../actions';
import { validTypeDeContratWithoutEndDate } from '../../../../utils/formatagesUtils';

export function useAdvisors() {
  const misesEnRelation = useSelector(state => state?.misesEnRelation?.misesEnRelation);
  const structure = useSelector(state => state.structure?.structure);
  const [conseillersActifs, setConseillersActifs] = useState([]);
  const [conseillersARenouveler, setConseillersARenouveler] = useState([]);
  const [conseillersActifsNonRenouveles, setConseillersActifsNonRenouveles] = useState([]);
  const [conseillersEnCoursDeRecrutement, setConseillersEnCoursDeRecrutement] = useState([]);
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
          const { conseillerObj, typeDeContrat, dateDebutDeContrat, dateFinDeContrat } = miseEnRelation;
          return { ...conseillerObj, typeDeContrat, dateDebutDeContrat, dateFinDeContrat, statut: 'finalisee' };
        }
      });

      const nouvellesRuptures = misesEnRelation
      .filter(({ statut }) => statut === 'nouvelle_rupture')
      .map(({ conseillerObj }) => ({ ...conseillerObj, statut: 'nouvelle_rupture' }));

      const conseillersEnCoursDeRecrutement = misesEnRelation.filter(({ statut }) => statut === 'recrutee');

      const conseillersARenouveler = misesEnRelation
      .filter(miseEnRelation => {
        if (!miseEnRelation) {
          return false;
        }
        const hasReconventionnement = miseEnRelation.reconventionnement;
        const isNotCDI = !validTypeDeContratWithoutEndDate(miseEnRelation.typeDeContrat);
        const isRenouvellementInitie = miseEnRelation.statut === 'renouvellement_initiee';
        const isFinaliseeWithoutConventionnement =
            miseEnRelation.statut === 'finalisee' && !miseEnRelation.miseEnRelationConventionnement;
        return hasReconventionnement && (isRenouvellementInitie || isFinaliseeWithoutConventionnement && isNotCDI);
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
      setConseillersEnCoursDeRecrutement(conseillersEnCoursDeRecrutement);
      setBannieresRenouvellementValide(bannieresRenouvellementValide);
    }
  }, [misesEnRelation]);

  return {
    conseillersActifs,
    conseillersARenouveler,
    conseillersActifsNonRenouveles,
    conseillersEnCoursDeRecrutement,
    bannieresRenouvellementValide,
    setBannieresRenouvellementValide,
  };
}
