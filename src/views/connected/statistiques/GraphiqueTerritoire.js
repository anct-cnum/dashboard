import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { paginationActions, statistiquesActions } from '../../../actions';

import BlockSpinner from '../../anonymous/BlockSpinner';
import BlockAlerte from '../../anonymous/BlockAlerte';
import BlockDatePickers from './Components/commun/BlockDatePickers';
import LeftPage from './Components/graphiques/LeftPage';
import RightPage from './Components/graphiques/RightPage';
import BottomPage from './Components/graphiques/BottomPage';
//import StatistiquesBanniere from './Components/graphiques/StatistiquesBanniere';

export default function GraphiqueTerritoire() {

  const dispatch = useDispatch();
  const location = useLocation();

  const codeTerritoire = location.pathname.split('/')[2];

  const dateDebut = useSelector(state => state.statistiques?.dateDebut);
  const dateFin = useSelector(state => state.statistiques?.dateFin);
  const donneesStatistiquesLoading = useSelector(state => state.statistiques?.statsDataLoading);
  const donneesStatistiquesError = useSelector(state => state.statistiques?.statsDataError);
  const donneesStatistiques = useSelector(state => state.statistiques?.statsData);
  const typeTerritoire = useSelector(state => state.filtresEtTris?.territoire);
  const territoire = useSelector(state => state.statistiques?.territoire);

  useEffect(() => {
    if (!territoire && codeTerritoire) {
      dispatch(statistiquesActions.getTerritoire(typeTerritoire, codeTerritoire, dateFin));
    }
    if (territoire) {
      dispatch(statistiquesActions.getStatistiquesTerritoire(dateDebut, dateFin, typeTerritoire, territoire.conseillerIds));
    }
    dispatch(paginationActions.resetPage(false));
  }, [dateDebut, dateFin, codeTerritoire, territoire]);

  return (
    <div className="statistiques">
      <BlockSpinner loading={donneesStatistiquesLoading} />
      {donneesStatistiquesError &&
        <BlockAlerte type="error" titre="Les statistiques n'ont pas pu être chargées !"/>
      }
      <div className="nationales fr-container fr-my-10w">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <h1 className="titre">Statistiques - {typeTerritoire === 'codeDepartement' ? territoire?.nomDepartement : territoire?.nomRegion}</h1>
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4 fr-mb-6w">
            <BlockDatePickers dateDebut={dateDebut} dateFin={dateFin}/>
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
            {/* TODO
              <StatistiquesBanniere />
             */
            }
          </div>
        }
        {!donneesStatistiques &&
          <h2 className="centrerTexte">Il n&rsquo;y a aucune statistique pour le moment</h2>
        }
      </div>
    </div>
  );

}
