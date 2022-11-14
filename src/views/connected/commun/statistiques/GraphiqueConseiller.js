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

export default function GraphiqueConseiller() {

  const dispatch = useDispatch();
  const location = useLocation();
  const { idConseiller } = useParams();

  const conseiller = location?.state.conseiller;
  const statistiquesLoading = useSelector(state => state.statistiques?.loading);
  const statistiquesError = useSelector(state => state.statistiques?.error);
  const donneesStatistiques = useSelector(state => state.statistiques?.statsData);
  const loadingExport = useSelector(state => state.exports?.loading);

  const dateDebut = useSelector(state => state.statistiques?.dateDebut);
  const dateFin = useSelector(state => state.statistiques?.dateFin);

  useEffect(() => {
    if (!conseiller) {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'La conseiller n\'a pas pu être chargé !',
        status: null, description: null
      }));
    }
  }, []);

  useEffect(() => {
    if (!statistiquesError && idConseiller && !!conseiller) {
      dispatch(statistiquesActions.getStatistiquesConseiller(dateDebut, dateFin, idConseiller));
    } else if (statistiquesError) {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les statistiques n\'ont pas pu être chargées !',
        status: null, description: null
      }));
    }
  }, [dateDebut, dateFin, statistiquesError]);

  const formatNomStatistiques = () => {
    const formatNom = location?.state.conseiller?.nom.charAt(0).toUpperCase() + location?.state.conseiller?.nom.slice(1);
    const formatPrenom = location?.state.conseiller?.prenom.charAt(0).toUpperCase() + location?.state.conseiller?.prenom.slice(1);
    if (formatNom && formatPrenom) {
      return `${formatNom} ${formatPrenom}`;
    }
    return '';
  };

  return (
    <div className="statistiques">
      <Spinner loading={statistiquesLoading || loadingExport} />
      <div className="structure fr-container fr-my-10w">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <h1 className={`titre ${location?.state.conseiller?.nom.length > 50 ? 'titre-long' : ''}`} >Statistiques - {formatNomStatistiques()}</h1>
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4 fr-mb-6w print-graphique">
            <BlockDatePickers dateDebut={dateDebut} dateFin={dateFin}/>
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
              typeStats="conseiller"
              id={idConseiller}
            />
          </div>
        }
      </div>
    </div>
  );
}
