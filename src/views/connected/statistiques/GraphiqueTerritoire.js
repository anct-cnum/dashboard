import React from 'react';
import { useSelector } from 'react-redux';
import LeftPage from './Components/LeftPage';
import StatisticsPeriod from './Components/StatisticsPeriod';

export default function GraphiqueTerritoire() {

  let dateDebut = useSelector(state => state.statistiques?.dateDebut);
  let dateFin = useSelector(state => state.statistiques?.dateFin);
  
  return (
    <div className="statistiques">
      <div className="fr-container fr-my-10w">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <h1 className="titre">Statistiques Nationales</h1>
          </div>
          <div className="fr-col-4">
            <StatisticsPeriod dateDebut={dateDebut} dateFin={dateFin}/>
          </div>
          <div className="fr-col-8">
            <hr className="fr-hr fr-mt-3v"/>
          </div>
        </div>

        <div className="fr-grid-row">
          <LeftPage donneesStats={null} print={false} />
        </div>
      </div>
    </div>
  );
}
