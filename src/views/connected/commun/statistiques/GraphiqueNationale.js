import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, statistiquesActions } from '../../../../actions';

import Spinner from '../../../../components/Spinner';
import BlockDatePickers from '../../../../components/datePicker/BlockDatePickers';
import LeftPage from './Components/graphiques/LeftPage';
import RightPage from './Components/graphiques/RightPage';
import BottomPage from './Components/graphiques/BottomPage';
import StatistiquesBanniere from './Components/graphiques/StatistiquesBanniere';

export default function GraphiqueNationale() {
  const dispatch = useDispatch();

  const dateDebut = useSelector(state => state.datePicker?.dateDebut);
  const dateFin = useSelector(state => state.datePicker?.dateFin);
  const loadingExport = useSelector(state => state.exports?.loading);
  const loading = useSelector(state => state.statistiques?.loading);
  const error = useSelector(state => state.statistiques?.error);
  const donneesStatistiques = useSelector(state => state.statistiques?.statsData);

  useEffect(() => {
    if (!error) {
      dispatch(statistiquesActions.getStatistiquesNationale(dateDebut, dateFin));
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les statistiques n\'ont pas pu être chargées !',
        status: null, description: null
      }));
    }
  }, [dateDebut, dateFin, error]);
  
  return (
    <div className="statistiques">
      <Spinner loading={loading || loadingExport} />
      <div className="nationales fr-container fr-my-10w">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <h1 className="titre">Statistiques Nationales</h1>
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4 fr-mb-6w">
            <BlockDatePickers dateDebut={dateDebut} dateFin={dateFin}/>
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-7">
            <hr className="fr-hr fr-mt-3v"/>
          </div>
        </div>
        {loading &&
          <h2 className="loadingStatsTexte">La page est en cours de chargement, veuillez patienter</h2>
        }
        {(!donneesStatistiques && !loading) &&
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
              typeStats="nationales"
            />
          </div>
        }
      </div>
    </div>
  );
}
