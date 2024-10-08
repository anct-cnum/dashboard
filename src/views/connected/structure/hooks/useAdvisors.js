import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { miseEnRelationAction } from '../../../../actions';
import { validTypeDeContratWithoutEndDate } from '../../../../utils/formatagesUtils';
import { isContractExpiring } from '../../../../utils/calculateUtils';

export function useAdvisors() {
  const misesEnRelation = useSelector(state => state?.misesEnRelation?.misesEnRelation);
  const structure = useSelector(state => state.structure?.structure);
  const [conseillersActifs, setConseillersActifs] = useState([]);
  const [conseillersActifsEtRenouveller, setConseillersActifsEtRenouveller] = useState([]);
  const [conseillersARenouveler, setConseillersARenouveler] = useState([]);
  const [conseillersAProlonger, setConseillersAProlonger] = useState([]);
  const [conseillersActifsNonRenouveles, setConseillersActifsNonRenouveles] = useState([]);
  const [conseillersEnCoursDeRecrutement, setConseillersEnCoursDeRecrutement] = useState([]);
  const [anciensConseillers, setAnciensConseillers] = useState([]);
  const [conseillersRecrutes, setConseillersRecrutes] = useState([]);
  const [bannieresRenouvellementValide, setBannieresRenouvellementValide] = useState([]);
  const [bannieresAjoutRoleCoordinateur, setBanniereAjoutRoleCoordinateur] = useState([]);
  const dispatch = useDispatch();

  const createConseiller = miseEnRelation => {
    const {
      conseillerObj,
      reconventionnement,
      _id,
      renouvellement,
      dateDebutDeContrat,
      dateFinDeContrat,
      demandesDeProlongation,
      typeDeContrat,
      phaseConventionnement,
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
      phaseConventionnement,
      miseEnrelationId: _id,
      renouvellement,
      dateDebutDeContrat,
      dateFinDeContrat,
      demandesDeProlongation,
      typeDeContrat,
      salaire,
      statut,
      statutConseiller: conseillerObj?.statut,
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
        if (miseEnRelation?.phaseConventionnement) {
          return createConseiller(miseEnRelation);
        } else {
          const { conseillerObj, typeDeContrat, dateDebutDeContrat, dateFinDeContrat } = miseEnRelation;
          return { ...conseillerObj, typeDeContrat, dateDebutDeContrat, dateFinDeContrat, statut: 'finalisee' };
        }
      });

      const nouvellesRuptures = misesEnRelation
      .filter(({ statut }) => statut === 'nouvelle_rupture')
      .map(createConseiller);

      const conseillersEnCoursDeRecrutement = misesEnRelation.filter(({ statut }) => statut === 'recrutee')
      .map(createConseiller);

      const conseillersARenouveler = misesEnRelation
      .filter(miseEnRelation => {
        if (!miseEnRelation) {
          return false;
        }
        // si le mise en relation n'est pas un CDI
        const isNotCDI = !validTypeDeContratWithoutEndDate(miseEnRelation.typeDeContrat);
        // si la mise en relation est en statut renouvellement_initiee
        const isRenouvellementInitie = miseEnRelation.statut === 'renouvellement_initiee';
        // si la mise en relation est en statut finalisee et qu'elle a été cochée pour un reconventionnement
        const isFinaliseeWithoutConventionnement =
            miseEnRelation.statut === 'finalisee' && miseEnRelation.reconventionnement;
        //si la mise en relation & été cochée et donc soit le renouvellement a été initié soit la mise en relation est finalisée
        // et n'a pas encore été dédoublonnée et n'est pas un CDI
        return isRenouvellementInitie || (isFinaliseeWithoutConventionnement && isNotCDI);
      })
      .map(createConseiller);

      const conseillersAProlonger = misesEnRelation
      .filter(miseEnRelation => {
        if (!miseEnRelation || ['CONVENTIONNEMENT_VALIDÉ', 'RECONVENTIONNEMENT_INITIÉ'].includes(structure?.conventionnement?.statut)) {
          return false;
        }
        const isFinalisee =
            miseEnRelation.statut === 'finalisee';
        const ProlongationHorsEditionContratRenouvellement = structure?.conventionnement?.statut === 'RECONVENTIONNEMENT_VALIDÉ' ?
          miseEnRelation.phaseConventionnement : !miseEnRelation.reconventionnement;
        return (
          isFinalisee && ProlongationHorsEditionContratRenouvellement &&
          isContractExpiring(miseEnRelation?.dateFinDeContrat) &&
          !validTypeDeContratWithoutEndDate(miseEnRelation.typeDeContrat)
        );
      })
      .map(createConseiller);

      const bannieresRenouvellementValide = misesEnRelation
      .filter(miseEnRelation => miseEnRelation.banniereValidationRenouvellement)
      .map(createConseiller);

      const bannieresAjoutRoleCoordinateur = misesEnRelation
      .filter(miseEnRelation => miseEnRelation.banniereAjoutRoleCoordinateur)
      .map(createConseiller);

      const conseillersActifsNonRenouveles = misesEnRelation
      .filter(miseEnRelation => !miseEnRelation?.phaseConventionnement && miseEnRelation.statut === 'finalisee' &&
      miseEnRelation.typeDeContrat !== 'CDI' && !miseEnRelation?.reconventionnement)
      .map(createConseiller);

      const anciensConseillers = misesEnRelation
      .filter(miseEnRelation => miseEnRelation.statut === 'finalisee_rupture')
      .map(createConseiller);

      const countConseillerActifsEtRenouveller =
      [...new Set([...recrutees, ...nouvellesRuptures, ...conseillersARenouveler].map(miseEnRelation => miseEnRelation.idPG))];

      setConseillersActifsNonRenouveles([...conseillersActifsNonRenouveles, ...nouvellesRuptures]);
      setConseillersARenouveler(conseillersARenouveler);
      setConseillersAProlonger(conseillersAProlonger);
      setConseillersActifs([...recrutees, ...nouvellesRuptures]);
      setConseillersActifsEtRenouveller(countConseillerActifsEtRenouveller);
      setConseillersEnCoursDeRecrutement(conseillersEnCoursDeRecrutement);
      setBannieresRenouvellementValide(bannieresRenouvellementValide);
      setBanniereAjoutRoleCoordinateur(bannieresAjoutRoleCoordinateur);
      setAnciensConseillers(anciensConseillers);
      setConseillersRecrutes(recrutees);
    }
  }, [misesEnRelation]);

  return {
    conseillersActifsEtRenouveller,
    conseillersActifs,
    conseillersARenouveler,
    conseillersAProlonger,
    conseillersActifsNonRenouveles,
    conseillersEnCoursDeRecrutement,
    anciensConseillers,
    bannieresRenouvellementValide,
    bannieresAjoutRoleCoordinateur,
    setBanniereAjoutRoleCoordinateur,
    setBannieresRenouvellementValide,
    conseillersRecrutes,
  };
}
