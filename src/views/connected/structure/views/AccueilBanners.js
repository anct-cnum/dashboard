import React, { useEffect } from 'react';
import {
  DeniedNewPosteCoordinateurBanner,
  RefusRecrutementBanner,
  ValidatedNewPosteCoordinateurBanner
} from '../banners';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../../components/Spinner';
import { alerteEtSpinnerActions } from '../../../../actions';

const AccueilBanners = () => {
  const dispatch = useDispatch();

  const idStructure = useSelector(state => state.authentication?.user?.entity?.$id);
  const miseEnRelationRefusRecrutement = useSelector(state => state.authentication?.user?.miseEnRelationRefusRecrutement);
  const demandesCoordinateurBannerInformation = useSelector(state => state.authentication?.user?.demandesCoordinateurBannerInformation);
  const displayBannerValidationPosteCoordinateur = useSelector(state => state.authentication?.user?.displayBannerPosteCoordinateurStructure);
  const loadingBannerCoordinateur = useSelector(state => state.coordinateur?.loading);
  const loadingBannerRefusRecrutement = useSelector(state => state.contrat?.loading);
  const idDemandeCoordinateur = useSelector(state => state.coordinateur?.idDemandeCoordinateur);
  const idMiseEnRelation = useSelector(state => state.contrat?.idMiseEnRelation);
  const errorCoordinateur = useSelector(state => state.coordinateur?.error);
  const errorContrat = useSelector(state => state.contrat?.error);
  const demandesCoordinateurRefusPoste = demandesCoordinateurBannerInformation?.filter(demande => demande.statut === 'refusee');

  useEffect(() => {
    if (idDemandeCoordinateur) {
      const user = localStorage.getItem('user');
      const formatUser = JSON.parse(user);
      // eslint-disable-next-line max-len
      formatUser.user.demandesCoordinateurBannerInformation = formatUser.user.demandesCoordinateurBannerInformation.filter(demande => demande.id !== idDemandeCoordinateur);
      localStorage.setItem('user', JSON.stringify(formatUser));
    }
    if (errorCoordinateur) {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: errorCoordinateur ?? 'La demande n\'a pas pu être fermée !',
        status: null, description: null
      }));
    }
  }, [idDemandeCoordinateur, errorCoordinateur]);

  useEffect(() => {
    if (idMiseEnRelation) {
      const user = localStorage.getItem('user');
      const formatUser = JSON.parse(user);
      // eslint-disable-next-line max-len
      formatUser.user.miseEnRelationRefusRecrutement = formatUser.user.miseEnRelationRefusRecrutement.filter(miseEnRelation => miseEnRelation._id !== idMiseEnRelation);
      localStorage.setItem('user', JSON.stringify(formatUser));
    }
    if (errorContrat) {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: errorContrat ?? 'La demande n\'a pas pu être fermée !',
        status: null, description: null
      }));
    }
  }, [idMiseEnRelation, errorContrat]);

  return (
    <>
      <Spinner loading={loadingBannerCoordinateur || loadingBannerRefusRecrutement} />
      <div className="banner">
        <>
          {demandesCoordinateurRefusPoste?.length > 0 && demandesCoordinateurRefusPoste?.map((coordinateur, idx) => {
            return (<DeniedNewPosteCoordinateurBanner key={idx} idDemandeCoordinateur={coordinateur.id} idStructure={idStructure} />);
          })
          }
        </>
        <>
          {miseEnRelationRefusRecrutement?.length > 0 && miseEnRelationRefusRecrutement?.map((miseEnRelation, idx) => {
            return (<RefusRecrutementBanner key={idx} conseiller={miseEnRelation.conseillerObj} idMiseEnRelation={miseEnRelation._id} />);
          })
          }
        </>
        {displayBannerValidationPosteCoordinateur &&
          <ValidatedNewPosteCoordinateurBanner />
        }
      </div>
    </>

  );
};

export default AccueilBanners;
