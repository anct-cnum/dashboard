import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeftPage from './Components/LeftPage';
import RightPage from './Components/RightPage';
import BottomPage from './Components/BottomPage';
import StatisticsPeriod from './Components/StatisticsPeriod';
import { statistiquesActions } from '../../../actions';

export default function GraphiqueNationale() {
  const dispatch = useDispatch();

  let dateDebut = useSelector(state => state.statistiques?.dateDebut);
  let dateFin = useSelector(state => state.statistiques?.dateFin);
  
  const donneesStatistiques = useSelector(state => state.statistiques?.statsData);

  useEffect(() => {
    dispatch(statistiquesActions.getStatsNationale(dateDebut, dateFin));
  }, [dateDebut, dateFin]);
  
  return (
    <div className="statistiques">
      <div className="nationales fr-container fr-my-10w">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <h1 className="titre">Statistiques Nationales</h1>
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4 fr-mb-6w">
            <StatisticsPeriod dateDebut={dateDebut} dateFin={dateFin}/>
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-7">
            <hr className="fr-hr fr-mt-3v"/>
          </div>
        </div>
        { donneesStatistiques !== undefined &&
          <div className="fr-grid-row">
            <LeftPage donneesStats={donneesStatistiques} print={false} />
            <RightPage donneesStats={donneesStatistiques} print={false} />
            <BottomPage donneesStats={donneesStatistiques} print={false} />
          </div>
        }
        {!donneesStatistiques &&
          <h2 className="centrerTexte">Il n&rsquo;y a aucune statistique pour le moment</h2>
        }
      </div>
    </div>
  );
}
