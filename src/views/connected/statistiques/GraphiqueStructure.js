import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import BlockDatePickers from './Components/commun/BlockDatePickers';
import ElementCodePostal from './Components/graphiques/ElementCodePostal';
import LeftPage from './Components/graphiques/LeftPage';
import RightPage from './Components/graphiques/RightPage';
import BottomPage from './Components/graphiques/BottomPage';
//import StatistiquesBanniere from './Components/graphiques/StatistiquesBanniere';
import { paginationActions, statistiquesActions, structureActions } from '../../../actions';


export default function GraphiqueTerritoire() {

  const dispatch = useDispatch();
  const location = useLocation();

  const idStructure = location.pathname.split('/')[2];

  const donneesStatistiques = useSelector(state => state.statistiques?.statsData);
  const codePostal = useSelector(state => state.statistique?.codePostalStats);
  const dateDebut = useSelector(state => state.statistiques?.dateDebut);
  const dateFin = useSelector(state => state.statistiques?.dateFin);

  useEffect(() => {
    if (idStructure) {
      dispatch(statistiquesActions.getStatistiquesStructure(dateDebut, dateFin, idStructure, codePostal));
    } else {
      dispatch(structureActions.getStructure(idStructure));
    }
    dispatch(paginationActions.resetPage(false));
  }, [dateDebut, dateFin, codePostal]);

  return (
    <div className="statistiques">
      <div className="nationales fr-container fr-my-10w">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <h1 className="titre">Statistiques </h1>
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4 fr-mb-6w">
            <BlockDatePickers dateDebut={dateDebut} dateFin={dateFin}/>
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-3 fr-mb-6w">
            {idStructure !== undefined &&
              <ElementCodePostal idStructure={idStructure} />
            }
          </div>
          <div className="fr-col-12 fr-col-offset-lg-1 fr-col-lg-4">
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
