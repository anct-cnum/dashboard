import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { alerteEtSpinnerActions, statistiquesActions } from '../../../../actions';
import { datePickerActions } from '../../../../actions/datePickerActions';

import Spinner from '../../../../components/Spinner';
import BlockDatePickers from '../../../../components/datePicker/BlockDatePickers';
import LeftPage from './Components/graphiques/LeftPage';
import RightPage from './Components/graphiques/RightPage';
import BottomPage from './Components/graphiques/BottomPage';
import StatistiquesBanniere from './Components/graphiques/StatistiquesBanniere';
import FiltresEtTrisGrandReseau from '../../grandReseau/FiltresEtTrisGrandReseau';

export default function GraphiquePilotage() {
  const dispatch = useDispatch();

  const dateDebut = useSelector(state => state.datePicker?.dateDebut);
  const dateFin = useSelector(state => state.datePicker?.dateFin);
  const dateFinMax = useSelector(state => state.datePicker?.dateFinMax);
  const codePostal = useSelector(state => state.statistiques?.codePostalStats);
  const ville = useSelector(state => state.statistiques?.villeStats);
  const codeCommune = useSelector(state => state.statistiques?.codeCommuneStats);
  const structureId = useSelector(state => state.statistiques?.structureStats);
  const conseillerId = useSelector(state => state.statistiques?.conseillerStats);
  const region = useSelector(state => state.statistiques?.codeRegionStats);
  const departement = useSelector(state => state.statistiques?.numeroDepartementStats);

  const loading = useSelector(state => state.statistiques?.loading);
  const error = useSelector(state => state.statistiques?.error);
  const donneesStatistiques = useSelector(state => state.statistiques?.statsData);
  const loadingExport = useSelector(state => state.exports?.loading);
  const [initStats, setInitStats] = useState(false);

  useEffect(() => {
    dispatch(datePickerActions.changeDateFin(dateFinMax));
  }, []);

  useEffect(() => {
    if (!error) {
      if (!initStats) {
        setInitStats(true);
        dispatch(statistiquesActions.resetFiltre());
      } else {
        dispatch(statistiquesActions.getStatistiquesNationaleGrandReseau(
          dateDebut, dateFin, codeCommune, codePostal, region, departement, structureId, conseillerId
        ));
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les statistiques n\'ont pas pu être chargées !',
        status: null, description: null
      }));
    }
  }, [initStats, dateDebut, dateFin, codePostal, region, departement, structureId, conseillerId, codeCommune, error]);

  return (
    <div className="statistiques">
      <Spinner loading={loading || loadingExport} />
      <div className="nationales fr-container fr-my-10w">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <h1 className="titre">Mes statistiques de pilotage</h1>
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4 fr-mb-6w">
            <BlockDatePickers dateDebut={dateDebut} dateFin={dateFin} dateFinMax={dateFinMax} />
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-7">
            <hr className="fr-hr fr-mt-3v"/>
          </div>
          <div className="fr-grid-row">
            <FiltresEtTrisGrandReseau />
          </div>
        </div>
        {!donneesStatistiques &&
          <h2 className="centrerTexte">Il n&rsquo;y a aucune statistique pour le moment</h2>
        }
        {donneesStatistiques &&
          <div className="fr-grid-row">
            <LeftPage donneesStats={donneesStatistiques}/>
            <RightPage donneesStats={donneesStatistiques}/>
            <BottomPage donneesStats={donneesStatistiques}/>
            <StatistiquesBanniere
              dateDebut={dateDebut}
              dateFin={dateFin}
              structureId={structureId}
              conseillerId={conseillerId}
              region={region}
              departement={departement}
              codePostal={codePostal}
              ville={ville}
              codeCommune={codeCommune}
              pilotage={true}
              typeStats="grandReseau"
            />
          </div>
        }
      </div>
    </div>
  );
}
