import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { alerteEtSpinnerActions, statistiquesActions, structureActions } from '../../../../actions';

import Spinner from '../../../../components/Spinner';
import BlockDatePickers from './Components/commun/BlockDatePickers';
import ElementCodePostal from './Components/graphiques/ElementCodePostal';
import LeftPage from './Components/graphiques/LeftPage';
import RightPage from './Components/graphiques/RightPage';
import BottomPage from './Components/graphiques/BottomPage';
import StatistiquesBanniere from './Components/graphiques/StatistiquesBanniere';

export default function GraphiqueStructure() {

  const dispatch = useDispatch();
  const location = useLocation();
  const { idStructure } = useParams();

  const structureLoading = useSelector(state => state.structure?.loading);
  const structureError = useSelector(state => state.structure?.error);
  const structureRequest = useSelector(state => state.structure?.structure);

  const statistiquesLoading = useSelector(state => state.statistiques?.loading);
  const codesPostauxLoading = useSelector(state => state.statistiques?.loadingCodesPostaux);
  const statistiquesError = useSelector(state => state.statistiques?.error);
  const donneesStatistiques = useSelector(state => state.statistiques?.statsData);
  const villeStats = useSelector(state => state.statistiques?.villeStats);

  const loadingExport = useSelector(state => state.exports?.loading);
  const [structure, setStructure] = useState(location?.state?.structure);
  const codePostal = useSelector(state => state.statistiques?.codePostalStats);
  const dateDebut = useSelector(state => state.statistiques?.dateDebut);
  const dateFin = useSelector(state => state.statistiques?.dateFin);

  useEffect(() => {
    if (!structureError) {
      if (!structure) {
        dispatch(structureActions.get(idStructure));
        dispatch(statistiquesActions.getCodesPostauxCrasConseillerStructure(idStructure));
      } else {
        dispatch(statistiquesActions.getCodesPostauxCrasConseillerStructure(idStructure));
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'La structure n\'a pas pu être chargée !',
        status: null, description: null
      }));
    }
  }, [structureError]);

  useEffect(() => {
    if (!structure) {
      setStructure(structureRequest);
    }
  }, [structureRequest]);

  useEffect(() => {
    if (!statistiquesError) {
      if (structure) {
        dispatch(statistiquesActions.getStatistiquesStructure(dateDebut, dateFin, idStructure, codePostal, villeStats));
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les statistiques n\'ont pas pu être chargées !',
        status: null, description: null
      }));
    }
  }, [dateDebut, dateFin, statistiquesError, codePostal, structure, villeStats]);

  return (
    <div className="statistiques">
      <Spinner loading={statistiquesLoading || loadingExport || structureLoading || codesPostauxLoading} />
      <div className="structure fr-container fr-my-10w">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <h1 className={`titre ${structure?.nom.length > 50 ? 'titre-long' : ''}`} >Statistiques - {structure?.nom}</h1>
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4 fr-mb-6w print-graphique">
            <BlockDatePickers dateDebut={dateDebut} dateFin={dateFin}/>
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-3 fr-mb-6w print-graphique">
            {structure !== undefined &&
              <ElementCodePostal />
            }
          </div>
          <div className="fr-col-12 fr-col-offset-lg-1 fr-col-lg-4">
            <hr className="fr-hr fr-mt-3v"/>
          </div>
        </div>
        {!donneesStatistiques &&
          <h2 className="loadingStatsTexte">La page est en cours de chargement, veuillez patienter</h2>
        }
        { donneesStatistiques &&
          <div className="fr-grid-row">
            <LeftPage donneesStats={donneesStatistiques}/>
            <RightPage donneesStats={donneesStatistiques}/>
            <BottomPage donneesStats={donneesStatistiques}/>
            <StatistiquesBanniere
              dateDebut={dateDebut}
              dateFin={dateFin}
              typeStats="structure"
              id={idStructure}
              codePostal={codePostal}
              ville={villeStats}
            />
          </div>
        }
      </div>
    </div>
  );
}
