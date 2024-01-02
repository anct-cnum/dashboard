import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { alerteEtSpinnerActions, conseillerActions, statistiquesActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import StatsConseiller from '../../../../components/conseillers/StatsConseiller';

export default function GraphiqueConseiller() {

  const dispatch = useDispatch();
  const location = useLocation();
  const { idConseiller } = useParams();

  const [conseiller, setConseiller] = useState(location?.state?.conseiller);

  const loadingConseiller = useSelector(state => state.conseiller?.loading);
  const errorConseiller = useSelector(state => state.conseiller?.error);
  const requestConseiller = useSelector(state => state.conseiller?.conseiller);

  const statistiquesLoading = useSelector(state => state.statistiques?.loading);
  const statistiquesError = useSelector(state => state.statistiques?.error);
  const codeCommuneStats = useSelector(state => state.statistiques?.codeCommuneStats);
  const codePostal = useSelector(state => state.statistiques?.codePostalStats);

  const loadingExport = useSelector(state => state.exports?.loading);
  const loadingFiltresConseiller = useSelector(state => state.statistiques?.loadingFiltresConseiller);

  const dateDebut = useSelector(state => state.datePicker?.dateDebut);
  const dateFin = useSelector(state => state.datePicker?.dateFin);

  useEffect(() => {
    if (!errorConseiller) {
      if (!conseiller) {
        dispatch(conseillerActions.getCandidat(idConseiller));
        dispatch(statistiquesActions.getFiltresCrasConseiller(idConseiller));
      } else {
        dispatch(statistiquesActions.getFiltresCrasConseiller(idConseiller));
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Le conseiller n\'a pas pu être chargé !',
        status: null, description: null
      }));
    }
  }, [errorConseiller]);

  useEffect(() => {
    if (!conseiller) {
      setConseiller(requestConseiller);
    }
  }, [requestConseiller]);

  useEffect(() => {
    if (!statistiquesError) {
      if (idConseiller && !!conseiller) {
        dispatch(statistiquesActions.getStatistiquesConseillerParcoursRecrutement(dateDebut, dateFin, idConseiller, codePostal, codeCommuneStats));
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les statistiques n\'ont pas pu être chargées !',
        status: null, description: null
      }));
    }
  }, [dateDebut, dateFin, statistiquesError, conseiller, codePostal, codeCommuneStats]);

  return (
    <div className="statistiques">
      <Spinner loading={statistiquesLoading || loadingExport || loadingConseiller || loadingFiltresConseiller} />
      <StatsConseiller conseiller={conseiller} idConseiller={idConseiller} statistiquesLoading={statistiquesLoading} />
    </div>
  );
}
