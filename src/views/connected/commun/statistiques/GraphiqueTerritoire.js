import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { alerteEtSpinnerActions, statistiquesActions } from '../../../../actions';

import Spinner from '../../../../components/Spinner';
import BlockDatePickers from './Components/commun/BlockDatePickers';
import LeftPage from './Components/graphiques/LeftPage';
import RightPage from './Components/graphiques/RightPage';
import BottomPage from './Components/graphiques/BottomPage';
import StatistiquesBanniere from './Components/graphiques/StatistiquesBanniere';

export default function GraphiqueTerritoire() {

  const dispatch = useDispatch();
  const location = useLocation();
  const { codeTerritoire } = useParams();

  const territoire = location?.state.territoire;

  const dateDebut = useSelector(state => state.statistiques?.dateDebut);
  const dateFin = useSelector(state => state.statistiques?.dateFin);
  const loading = useSelector(state => state.statistiques?.loading);
  const error = useSelector(state => state.statistiques?.error);
  const donneesStatistiques = useSelector(state => state.statistiques?.statsData);
  const typeTerritoire = useSelector(state => state.filtresEtTris?.territoire);
  const loadingExport = useSelector(state => state.exports?.loading);

  useEffect(() => {
    if (!territoire) {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Le territoire n\'a pas pu être chargée !',
        status: null, description: null
      }));
    }
  }, []);

  useEffect(() => {
    if (!error && codeTerritoire && !!territoire) {
      dispatch(statistiquesActions.getStatistiquesTerritoire(dateDebut, dateFin, typeTerritoire, territoire?.conseillerIds));
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les statistiques n\'ont pas pu être chargés !',
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
            <h1 className="titre">Statistiques - {typeTerritoire === 'codeDepartement' ? territoire?.nomDepartement : territoire?.nomRegion}</h1>
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
        {donneesStatistiques &&
          <div className="fr-grid-row">
            <LeftPage donneesStats={donneesStatistiques}/>
            <RightPage donneesStats={donneesStatistiques}/>
            <BottomPage donneesStats={donneesStatistiques}/>
            <StatistiquesBanniere
              dateDebut={new Date('2020-09-01')}
              dateFin={dateFin}
              id={codeTerritoire}
              typeStats="territoire"
            />
          </div>
        }
      </div>
    </div>
  );
}
