import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { alerteEtSpinnerActions, statistiquesActions } from '../../../../actions';

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

  const structure = location?.state.structure;

  const statistiquesLoading = useSelector(state => state.statistiques?.loading);
  const statistiquesError = useSelector(state => state.statistiques?.error);
  const donneesStatistiques = useSelector(state => state.statistiques?.statsData);
  const loadingExport = useSelector(state => state.exports?.loading);

  const codePostal = useSelector(state => state.statistiques?.codePostalStats);
  const dateDebut = useSelector(state => state.statistiques?.dateDebut);
  const dateFin = useSelector(state => state.statistiques?.dateFin);

  useEffect(() => {
    if (!structure) {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'La structure n\'a pas pu être chargée !',
        status: null, description: null
      }));
    }
  }, []);

  useEffect(() => {
    if (!statistiquesError && idStructure && !!structure) {
      dispatch(statistiquesActions.getStatistiquesStructure(dateDebut, dateFin, idStructure, codePostal));
    } else if (statistiquesError) {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les statistiques n\'ont pas pu être chargés !',
        status: null, description: null
      }));
    }
  }, [dateDebut, dateFin, codePostal, statistiquesError]);

  return (
    <div className="statistiques">
      <Spinner loading={statistiquesLoading || loadingExport} />
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
              <ElementCodePostal idStructure={idStructure} />
            }
          </div>
          <div className="fr-col-12 fr-col-offset-lg-1 fr-col-lg-4">
            <hr className="fr-hr fr-mt-3v"/>
          </div>
        </div>
        {!donneesStatistiques &&
          <h2 className="centrerTexte">Il n&rsquo;y a aucune statistique pour le moment</h2>
        }
        { donneesStatistiques &&
          <div className="fr-grid-row">
            <LeftPage donneesStats={donneesStatistiques}/>
            <RightPage donneesStats={donneesStatistiques}/>
            <BottomPage donneesStats={donneesStatistiques}/>
            <StatistiquesBanniere
              dateDebut={new Date('2020-09-01')}
              dateFin={dateFin}
              typeStats="structure"
              id={idStructure}
              codePostal={codePostal}
            />
          </div>
        }
      </div>
    </div>
  );
}
