import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { alerteEtSpinnerActions } from '../../../../actions';

import Spinner from '../../../../components/Spinner';
import BlockDatePickers from './Components/commun/BlockDatePickers';
import LeftPage from './Components/graphiques/LeftPage';
import RightPage from './Components/graphiques/RightPage';
import BottomPage from './Components/graphiques/BottomPage';
import StatistiquesBanniere from './Components/graphiques/StatistiquesBanniere';
import { statistiquesService } from '../../../../services/statistiquesService';

export default function GraphiqueNationale() {
  const dispatch = useDispatch();

  const dateDebut = useSelector(state => state.statistiques?.dateDebut);
  const dateFin = useSelector(state => state.statistiques?.dateFin);
  const loadingExport = useSelector(state => state.exports?.loading);

  const { data, isLoading, isError } = useQuery(['statsNationales', dateDebut, dateFin], async () => {
    try {
      const response = await statistiquesService.getStatistiquesNationale(dateDebut, dateFin);
      return response;
    } catch (error) {
      throw error.response.data.message;
    }
  }, { refetchOnWindowFocus: false, staleTime: 5000 });

  if (isError) {
    dispatch(alerteEtSpinnerActions.getMessageAlerte({
      type: 'error',
      message: 'Les statistiques n\'ont pas pu être chargées !',
      status: null, description: null
    }));
  }
  
  return (
    <div className="statistiques">
      <Spinner loading={isLoading || loadingExport} />
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
        {isLoading &&
          <h2 className="loadingStatsTexte">La page est en cours de chargement, veuillez patienter</h2>
        }
        {(!data && !isLoading) &&
          <h2 className="centrerTexte">Il n&rsquo;y a aucune statistique pour le moment</h2>
        }
        {data &&
          <div className="fr-grid-row">
            <LeftPage donneesStats={data}/>
            <RightPage donneesStats={data}/>
            <BottomPage donneesStats={data}/>
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
