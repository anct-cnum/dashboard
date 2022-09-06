import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { statistiquesActions } from '../../../../actions';

import Spinner from '../../../../components/Spinner';
import Alerte from '../../../../components/Alerte';
import BlockDatePickers from './Components/commun/BlockDatePickers';
import LeftPage from './Components/graphiques/LeftPage';
import RightPage from './Components/graphiques/RightPage';
import BottomPage from './Components/graphiques/BottomPage';
import StatistiquesBanniere from './Components/graphiques/StatistiquesBanniere';

export default function GraphiqueNationale() {
  const dispatch = useDispatch();

  const dateDebut = useSelector(state => state.statistiques?.dateDebut);
  const dateFin = useSelector(state => state.statistiques?.dateFin);

  const donneesStatistiquesLoading = useSelector(state => state.statistiques?.statsDataLoading);
  const donneesStatistiquesError = useSelector(state => state.statistiques?.statsDataError);
  const donneesStatistiques = useSelector(state => state.statistiques?.statsData);

  useEffect(() => {
    dispatch(statistiquesActions.getStatistiquesNationale(dateDebut, dateFin));
  }, [dateDebut, dateFin]);
  
  return (
    <div className="statistiques">
      <Spinner loading={donneesStatistiquesLoading} />
      <Alerte display={donneesStatistiquesError} type="error" titre="Les statistiques n'ont pas pu être chargées !" />
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
        {!donneesStatistiques &&
          <h2 className="centrerTexte">Il n&rsquo;y a aucune statistique pour le moment</h2>
        }
        { donneesStatistiques !== undefined &&
          <div className="fr-grid-row">
            <LeftPage donneesStats={donneesStatistiques}/>
            <RightPage donneesStats={donneesStatistiques}/>
            <BottomPage donneesStats={donneesStatistiques}/>
            <StatistiquesBanniere dateDebut={dateDebut} dateFin={dateFin} typeStats="nationales"/>
          </div>
        }
      </div>
    </div>
  );
}
